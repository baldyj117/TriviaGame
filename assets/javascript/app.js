$(document).ready(function(){

    $("#start-button").on("click", gameStart.startTimer);
  
  });
  
  var gameStart = {
  
    timeRemaining : 60,
  
    startTimer: function() {
      $("#timer").text("Time remaining: " + gameStart.timeRemaining);
      setInterval(gameStart.countdown, 1000);
      $("#start-page").hide();
      trivia.displayQuestions();
    },
  
    countdown: function() {
      gameStart.timeRemaining--;
      $("#timer").text("Time remaining: " + gameStart.timeRemaining);
      if (gameStart.timeRemaining === 0) {
        gameStart.stopTimer();
        $("#timer").empty();
      }
    },
  
    stopTimer: function() {
      clearInterval();
      trivia.checkAnswers();
    },
  
    showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
      $("#end-page").show();
      $("#questions-box").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correct-answers").text("Correct answers (SKOL!): " + numCorrect);
      $("#incorrect-answers").text("Incorrect answers (BOOOO!): " + numIncorrect);
      $("#unanswered").text("Skipped questions (....): " + numUnanswered);
    }
  }
  
  var trivia = {
  
    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
      divContainer.append('<h2>Answer the following questions:</h2>');
              
      for (var i = 0; i < questionBank.length; i++) {
  
        divContainer.append('<div id="question">' + questionBank[i].question + '</div>');
  
        var answer1 = questionBank[i].answers[0];
        var answer2 = questionBank[i].answers[1];
        var answer3 = questionBank[i].answers[2];
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
      }
  
      var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
      divContainer.append(doneButton);
      $("#done-button").on("click", gameStart.stopTimer);
    },
  
    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numCorrect = 0;
      var numIncorrect = 0;
      var numUnanswered = 0;
  
      for (var i = 0; i < questionBank.length; i++) {
        correctAnswer = questionBank[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          numCorrect++;
        } else if (userAnswer === "") {
          numUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            numIncorrect++;
          }
        }
      }
  
      gameStart.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
  }
  
  var questionBank =
  [
    {
      question: "Who is the vikings all time leading rusher?",
      answers: ["Robert Smith", "Adrian Peterson", "Moe Williams"],
      correct: "Adrian Peterson"
    },
  
    {
      question: "What was the name of the Vikings last stadium?",
      answers: ["The Metrodome", "Ford Field", "Heinz Field"],
      correct: "The Metrodome"
    },
    {
      question: "How many superbowls have the Vikings won?",
      answers: ["Three", "Two", "Zero"],
      correct: "Zero"
    },
    {
      question: "What team did the Minnesota Miracle happen against?",
      answers: ["The Saints", "The Packers", "The Eagles"],
      correct: "The Saints"
    },
    {
      question: "Who is the Vikings current starting quarterback?",
      answers: ["Case Keenum", "Sam Bradford", "Kirk Cousins"],
      correct: "Kirk Cousins"
    },
    {
      question: "Who was the Vikings first round draft pick in 2018?",
      answers: ["Xavier Rhodes", "Trae Waynes", "Mike Hughes"],
      correct: "Mike Hughes"
    },
  ]
