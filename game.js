
var buttonColours= ["red","blue","green","yellow"];
var randomNumber;
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;



//adding a handler to keyboard strokes, and flagging true if
//its the first key stroke, and initating the start of the game

$(document).keydown(function(){
    if(!started){
        nextSequence();
        started = true;
    }
    
})


//adding a handler to button clicks, the following code 
//logs the user clicks into array and play sound on clicks
$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


//if the user got the answer wrong, the game will start over
function startOver(){
    started = false;
    level = 0;
    gamePattern = [];

}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("sucess");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
                ;}, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200)

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
//this adds a random pattern to the array gamePattern
//by rolling a random number, and crossing it with the colors array
function nextSequence(){ 
    
    userClickedPattern = [];

    level++;
    $("#level-title").html("Level " + level);   
    randomNumber =  Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

//function gets a colour and play the sound of that color
function playSound(colour){
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

//this function is animating user clicks,
function animatePress(currentColour){
   $("#"+currentColour).addClass("pressed");
   setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
   },100);
}





