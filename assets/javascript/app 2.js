$(document).ready(function(){

//EXISTING PROBLEMS:
//1) The timer is just a threat, had trouble figuring out how to trigger next question via timer
//2) No reset button at the end
//3) The winning trigger is getting at least four out of 7 correct. This means the trigger is not automated if I add questions

//NOTES: 
//1) View the console log to see the question answers
//2) View console log to see how many questions remain

//Questions
    var questions = [
        {
            question:"How many superbowls have the Packers won?",
            options:["Five","One","Two","Four"],
            answerIndex: 3,
            gifRight: "assets/images/correct_One.gif",
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
    var answeredQuestions = [];
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
            showGif();
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
});

function showQuestion(){
    // Index assigns a random number limited to length of questions
        index = Math.floor(Math.random()*questions.length);
    // assign that index to the "pick" for this question
        pick = questions[index];
    // show answer in the log
        console.log(pick.options[pick.answerIndex]);

    // update the question div in html to current question
        $("#question").html(`<div> ${pick.question} </div>`)

    // For however many answer options for the chosen question are available ...
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
        //create a "correct" div, assign a class for CSS, update the existing #answers div
            var correct = $("<div>");
            correct.addClass("right_or_wrong");
            $("#answers").html(correct);
        // stop the timer
            stopTimer();
        //pass userGuess, pick.answerIndex, and pick... See why on line 170
            showGif(userGuess, pick.answerIndex, pick);
        //after displaying gif, we update the userGuess, purposely in this order, or the showGif function for userGuess would be empty
            userGuess="";
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

//function for choosing whether to display "right" or "wrong" gif
//**NOTE: we pass updateGif() (user guess, pick.answerIndex, and the pick object),
// in order for the function to be able to reference them only in the question instance due to Scope
function updateGif (one, two, three) { 
    //Remember: one = User Guess, and two = pick.answerIndex
        if (one === two){
    //Remember: three = pick (i.e. the question object itself)
        $(".right_or_wrong").html(`Correct! <br> <img src="${three.gifRight}">`)
        }
        else{
            $(".right_or_wrong").html(`Incorrect: The answer is ${three.options[two]} <br> <img src="${three.gifWrong}">`)
        }
};

//function for showing gif dependent upon state of game
    function showGif(one, two, three) {
        updateGif(one, two, three);
        //push the index of the pick to the answeredQuestions array so that we can compare 
        //sizes to initial array size to determine end of game
            answeredQuestions.push(pick);
        //remove the index of the answered question from the questions array so that it is not selected again
        //splice says... ("position of array to be removed", "number of items to be removed from this position")
            questions.splice(index,1);
            console.log("num remaining questions: " + questions.length);
            console.log("num correct: " + numCorrect);
            console.log("num incorrect: " + numWrong);
        //define a next question function to be executed after four seconds
            var nextQuestion = setTimeout(function() {
                //empty the div displaying correct/incorrect and gif
                    $(".right_or_wrong").empty();
                //update time left to 20 for next question
                    timeLeft=20;

                //check to see if the game has run through all the questions
                    if(answeredQuestions.length === 7){
                        //empty the entire game container
                            $("#game_container").empty();
                        //create a div for the final score results, apply trivia_header ID for CSS, and append to game container
                            var finalScore = $("<div>")
                            finalScore.attr("id", "trivia_header")
                            $("#game_container").append(finalScore);
                        //fill in the game container with results
                            if (numCorrect >= 4){
                                $("#trivia_header").html('You Must be a True Packer Fan! <br> <img src="assets/images/youWin.gif" style="width:50%">')
                            }
                            else
                            {
                                $("#trivia_header").html(`You must be a Bears Fan! <br> <img src="assets/images/youLose.gif">`)
                            }
                    }
                //otherwise, reset the timer, and show the next question
                    else{
                        startTimer();
                        showQuestion();
                    }
            },4000);
}

//need to think about how to do this...
// function playAgain(){

// }

});