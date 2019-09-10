$(document).ready(function(){

$("#timer, #question, .answer").hide();

var correct = 0;
var incorrect = 0;
var timeLeft = 30;
var intervalId;

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    // timeLeft-=10;
    timeLeft--;
    console.log(timeLeft);
    $("#timeRemaining").text(timeLeft);
    if (timeLeft === 0){
        clearInterval(intervalId);
    }
}

//Question one
    function question1(){
        $("#question").text("How many superbowls have the Packers won?");
        $("#answer1").text("five");
        $("#answer2").text("one");
        $("#answer3").text("two");
        $("#answer4").text("four");

        $("#answer1, #answer2, #answer3").on("click",function(event){
            $("#timer, #question, .answer").hide();
            incorrect++;
            incorrect1();
        })

        $("#answer4").on("click",function(event){
            $("#timer, #question, .answer").hide();
            correct++;
            correct1();
        })

            function timeout1(){
                incorrect++;
                question2();
            }
            setTimeout(timeout1,30000);
    }

    function correct1(){
        $("#right_or_wrong").text("Correct!");
        $("#gif").append("<img src='assets/images/correct_One.gif'/>")
        setTimeout(question2, 5000);
    }

    function incorrect1(){
        $("#right_or_wrong").text("Incorrect!");
        $("#gif").append("<img src='assets/images/incorrect_one.gif'/>")
        setTimeout(question2, 5000);
    }

//Question 2
    function question2(){
        console.log("incorrect: " + incorrect + " Correct: " + correct);
        $("#gif, #right_or_wrong").hide();
        timeLeft=30;
        $("#timer").show();
        $("#question").show();
        $(".answer").show();

        $("#question").text("How many superbowls have the Packers won?");
        $("#answer1").text("five");
        $("#answer2").text("one");
        $("#answer3").text("two");
        $("#answer4").text("four");

        $("#answer1, #answer2, #answer3").on("click",function(event){
            $("#timer, #question, .answer").hide();
            incorrect++;
            incorrect2();
        })

        $("#answer4").on("click",function(event){
            $("#timer, #question, .answer").hide();
            correct++;
            correct2();
        })

            function timeout2(){
                console.log("test");
            }
            setTimeout(timeout2,30000);
    }

    function correct2(){
        $("#right_or_wrong").text("Correct!");
        $("#gif").append("<img src='assets/images/correct_One.gif'/>")
        setTimeout(question3, 5000);
    }

    function incorrect2(){
        $("#right_or_wrong").text("Incorrect!");
        $("#gif").append("<img src='assets/images/incorrect_one.gif'/>")
        setTimeout(question3, 5000);
    }

$("#initial_start").on("click",function(event) {
    $("#initial_start").hide()
    run();
    question1();
    $("#timer").show();
    $("#question").show();
    $(".answer").show();
})

});

