var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var userPatternStack = 0;
var color;

//  EVENT LISTENERS
$(document).keypress(function() {
  startGame();
});

$("#level-title").click(function(){   //Resets the game on clicking on the header
  startOver();
  startGame();
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  setTimeout(checkAnswer(userClickedPattern.length-1),1000);
});


//   GAME FUNCTIONS
function startGame(){
    if (!started) {
        $("#level-title").text("Level " + level);
    
        setTimeout(function () {
            nextSequence();
          }, 1000);
    
        started = true;
      }
}

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = parseInt(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);


  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);           //displays the latest generated pattern
  playSound(randomChosenColour);
  
  // for (let index = 0; index < gamePattern.length; index++) {   //displays the whole pattern
  //   setTimeout(function(){
  //   $("#" + gamePattern[index]).fadeOut(100).fadeIn(100);
  //   playSound(gamePattern[index]);
  //   }, 500*(index+1));
  // }
}

function checkAnswer(currentLevel){
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
            nextSequence();
        } ,1000);
        }

    }else {
        console.log("wrong");
        
        var gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver(){   //Resets variable values
    started = false;
    level = 0;
    gamePattern = [];
    $("#level-title").text("Game Over, press any key to restart");
}


//  SPECIAL EFFECTS
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}