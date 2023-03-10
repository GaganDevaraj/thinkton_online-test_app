

var useranswers = new Array();
var answered = 0;

function renderQuiz() 
{
  for(i=0;i<questions.length;i++) 
  {
    document.writeln('<pre class="question" style="font-weight:900; /* padding-top:20px; */ font-size: 16px; font-family: sans-serif;">' + questions[i] + ' <span id="result_' + i + '"><img src="blank.gif" style="border:0" alt="" /></span></pre>');
    for(j=0;j<choices[i].length;j++) 
	{
      document.writeln('&nbsp &nbsp &nbsp &nbsp <input type="radio" name="answer_' + i + '" value="' + choices[i][j] + '" id="answer_' + i + '_' + j + '" class="question_' + i + '" onclick="submitAnswer(' + i + ', this, \'question_' + i + '\', \'label_' + i + '_' + j + '\')" /><label style="font-weight:100; font-size: 17px;" id="label_' + i + '_' + j + '" for="answer_' + i + '_' + j + '">&nbsp ' + choices[i][j] + '</label><br />');
	}
  }
  document.writeln('<p class="navbar-text navbar-right"><input type="submit" value="Show Score" onclick="showScore()" class="btn btn-primary" /> <input type="submit" value="Reset Quiz" onclick="resetQuiz(true)"  class="btn btn-default" /></p><p style="display:none"><img src="correct.gif" style="border:0" alt="Correct!" /><img src="incorrect.gif" style="border:0" alt="Incorrect!" /></p>');
}
function resetQuiz(showConfirm) 
{
  if(showConfirm)
    if(!confirm("Are you sure you want to reset your answers and start from the beginning?"))
      return false;
  document.location = document.location;
}
function submitAnswer(questionId, obj, classId, labelId) 
{
  useranswers[questionId] = obj.value;
  document.getElementById(labelId).style.fontWeight = "normal";
  disableQuestion(classId);
  showResult(questionId);
  answered++;
}
function showResult(questionId) 
{
  if(answers[questionId] == useranswers[questionId]) {
    document.getElementById('result_' + questionId).innerHTML = '<img src="correct.gif" style="border:0" alt="Correct!" />';
  } else {
    document.getElementById('result_' + questionId).innerHTML = '<img src="incorrect.gif" style="border:0" alt="Incorrect!" />';
  }
}
function showScore() {
  if(answered != answers.length) {
    alert("You have not answered all of the questions yet!");
    return false;
  }
  questionCount = answers.length;
  correct = 0;
  incorrect = 0;
  for(i=0;i<questionCount;i++) {
    if(useranswers[i] == answers[i])
      correct++;
    else
      incorrect++;
  }
  pc = Math.round((correct / questionCount) * 100);
  alertMsg = "You scored " + correct + " out of " + questionCount + "\n\n";
  alertMsg += "You correctly answered " + pc + "% of the questions! \n\n";
  if(pc == 100)
    alertMsg += response[0];
  else if(pc >= 90)
    alertMsg += response[1];
  else if(pc >= 70)
    alertMsg += response[2];
  else if(pc > 50)
    alertMsg += response[3];
  else if(pc >= 40)
    alertMsg += response[4];
  else if(pc >= 20)
    alertMsg += response[5];
  else if(pc >= 10)
    alertMsg += response[6];
  else
    alertMsg += response[7];
  if(pc < 100) {
    if(confirm(alertMsg))
      resetQuiz(false);
    else
      return false;
  } else {
    alert(alertMsg);
  }
}
function disableQuestion(classId) 
{
  var alltags=document.all? document.all : document.getElementsByTagName("*")
  for (i=0; i<alltags.length; i++) {
    if (alltags[i].className == classId) {
      alltags[i].disabled = true;
    }
  }
}


