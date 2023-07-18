var buttonColour = ["red" , "yellow" , "blue" , "green"];
var gamePattern = [];
var level = 0;
var started = false;
var userClickedPattern = [];

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animate(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(){
    if(!started){
        $("#heading").text("Level " + level);
        nextSequence();
        started = true;
    }
})


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#heading").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function checkAnswer(selectedColour){
    if(gamePattern[selectedColour] === userClickedPattern[selectedColour]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            } , 1000);
        }
    }else{
        playSound("wrong");

        $("body").addClass("game-over");

        $("#heading").text("Game Over, Press Any Key To Restart.");

        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 200);
        startOver();
    }

}


function playSound(sound_name){
    var sound = new Audio(sound_name + ".mp3");
    sound.play();
}

function animate(selected){
    $("#" + selected).addClass("pressed");

    setTimeout(function(){
        $("#" + selected).removeClass("pressed");
    } , 200);
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}






