$(document).ready(function(){

//Questions
    var questions = [
        {
            question:"How many superbowls have the Packers won?",
            options:["Five","One","Two","Four"],
            answerIndex: 3,
            gifRight: "assets/images/correct_one.gif",
            gifWrong: "assets/images/incorrect_one.gif"
        },
        {
            question:"Which QB lead the Packers to their first Super Bowl Victory?",
            options:["Brett Favre","Bart Starr","Jay Cutler","Don Majkowski"],
            answerIndex:1,
            gifRight: "assets/images/correct_two.gif",
            gifWrong: "assets/images/incorrect_two.gif"
        },
        {
            question:"What is the name of the Packers Stadium?",
            options:["Lambeau Field","Northwestern Mutual Stadium","Cheese Valley","Lombardi Land"],
            answerIndex:0,
            gifRight: "assets/images/correct_three.gif",
            gifWrong: "assets/images/incorrect_three.gif"
        },
        {
            question:"What were the Packers originally called?",
            options:["Green Bay Goldens","Indian Packers","Bellevue Packers","Milwaukee Milkmen"],
            answerIndex:1,
            gifRight: "assets/images/correct_four.gif",
            gifWrong: "assets/images/incorrect_four.gif" 
        },
        {
            question:"Who was the first Packer to gain more than 8,000 career rushing yards?",
            options:["Ahman Green","Dorsey Levens","Jim Taylor","Eddie Lacy"],
            answerIndex:2,
            gifRight: "assets/images/correct_five.gif",
            gifWrong: "assets/images/incorrect_five.gif" 
        },
        {
            question:"As of 2019, what is the seating capacity of Lambeau Field?",
            options:["55,000 - 60,000","65,000-70,000","75,000-80,000","80,000-85,000"],
            answerIndex:3,
            gifRight: "assets/images/correct_six.gif",
            gifWrong: "assets/images/incorrect_six.gif" 
        },
        {
            question:"Which team is the Packers timeless rival?",
            options:["Chicago Bears","Carolina Panthers","Dallas Cowboys","Detroit Lions"],
            answerIndex:0,
            gifRight: "assets/images/correct_seven.gif",
            gifWrong: "assets/images/incorrect_seven.gif" 
        }
    ]
//Game Variables
    var numCorrect = 0;
    var numWrong = 0;
    var userGuess = '';
    var numQuestions = questions.length;
    var gameOn = false;
    var answeredQuestions = [];
    var questionHolder = [];
    var pick;
    var index;

//Timer variables
    var timeLeft = 20;
    var intervalId;
    running = false;

//function for decrementing time by one, and updating timer in HTML
    function countDown() {
        timeLeft--;
        $("#timeRemaining").text(timeLeft);

        //if timer reaches zero, add to incorrect, and stop the timer
        if (timeLeft === 0){
            numWrong++;
            stopTimer();
            // hidePicture();
        }
    }

//start timer
    function startTimer(){
        if (!running) {
            intervalId = setInterval(countDown,1000)
            running = true;
        }
    }

//stop timer
    function stopTimer(){
        running = false;
        clearInterval(intervalId);
    }


//hide these divs in the HTML 
$("#timer, #question, #answers").hide();

$("#initial_start").on("click",function(){
    $("#initial_start").hide();
    $("#timer, #question, #answers").show();
    showQuestion();
    startTimer();

    //for the length of the questions array object, push that number of objects into the questions into the question array
        for (var i = 0; i < questions.length; i++){
            questionHolder.push(questions[i]);
        }
});

function showQuestion(){
    //1) Index pulls assigns a random number limited to length of questions
        index = Math.floor(Math.random()*questions.length);
    //2) assign that index to the "pick" for this question
        pick = questions[index];
    //show answer in the log
        console.log(pick.options[pick.answerIndex]);

    //update the question div in html to current question
        $("#question").html(`<div> ${pick.question} </div>`)

    //For however many answer options are available ...
        for (var i = 0; i < pick.options.length; i++){
            //1) Create a div for that potential answer, and assign the class "answerOptions" for CSS formatting
                var questionAnswers = $(`<div type = "button"></div>`);
                questionAnswers.addClass("answerOptions");
                //2) update content of new div to a potential answer
                questionAnswers.html(pick.options[i]);
                //3) Assign an attribute of user-guess equal to that index's position in the pick.options array
                questionAnswers.attr("user-guess", i);
                //4 Append the answer button to the #answers div in the HTMl
                $("#answers").append(questionAnswers);
        }
    
    //when the answerOptions button created prior are clicked...
    $(".answerOptions").on("click",function (){
    //pull the index value of the selection that the user made
        userGuess = parseInt($(this).attr("user-guess"));

    //If the index value of the user's guess = the correct answer index...
        if (userGuess === pick.answerIndex){
        //+1 to numCorrect
            numCorrect++;
        //showGif(), and pass userGuess, pick.answerIndex, and pick... See why on line 172
            var correct = $("<div>");
            correct.addClass("right_or_wrong");
            $("#answers").html(correct);
            stopTimer();
            showGif(userGuess, pick.answerIndex, pick);
        //after displaying gif, we update the userGuess, purposely in this order, or the showGif function for userGuess would be empty
            userGuess="";
        //stop the timer
            
        }
        //inverse of if statement
        else{
            numWrong++;
            var incorrect = $("<div>")
            incorrect.addClass("right_or_wrong");
            $("#answers").html(incorrect)
            stopTimer();
            showGif(userGuess, pick.answerIndex, pick);
            userGuess='';
        }
    });
};

//function for choosing whether to display "right" or "wrong"
//**NOTE: we pass updateGif() (user guess, pick.answerIndex, and the pick object),
// in order for the function to be able to reference them due to Scope
function updateGif (one, two, three) { 
    console.log(three);
    if (one === two){
    $(".right_or_wrong").html(`Correct! <br> <img src="${three.gifRight}">`)
    }
    else{
        $(".right_or_wrong").html(`Incorrect: The answer is ${three.options[two]} <br> <img src="${three.gifWrong}">`)
    }
};

//function for showing gif dependent upon state of game
function showGif(one, two, three) {
    updateGif(one, two, three);
    //push the index of the pick to the answeredQuestions array

    // answeredQuestions.push(pick);

    //remove the index of the answered question from the questions array so that it is not selected again
    //splice says... ("position of array to be removed", "number of items to be removed from this potion")

    // questions.splice(index,1);

    // update the #gif div to hold the right or wring gif associated with the pick index
}



});