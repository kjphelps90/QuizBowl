var logos = [
    "belmont_logo.png",
    "clemson_logo.png",
    "drexel_logo.png",
    "lsu_logo.png",
    "rice_logo.gif",
    "richmond_logo.jpg"
];
var answers = [
    ["Baylor", "California","Belmont","Chicago",2],
    ["Auburn", "Clemson","LSU","Detroit",1],
    ["Drexel", "Texas State","SCLSU","Montana",0],
    ["LSU", "Virginia","Miss State","Texas",0],
    ["Temple", "Houston","Louisville","Rice",3],
    ["TCU", "Richmond","Oregon State","UC-Irvine",1]
];




// Creating elements to add to the page once the New Game has begun.
var item1 = document.createElement("li");
var item2 = document.createElement("li");
var item3 = document.createElement("li");
var item4 = document.createElement("li");
var answer1 = document.createElement("button");
var answer2 = document.createElement("button");
var answer3 = document.createElement("button");
var answer4 = document.createElement("button");
var question = document.createElement("p");
var timeSlot = document.createElement("h2");

// Setting placeholder variable that should be reset whenever the page is reset/re-visited.
var score;
var selection = -90;
var image = 0;
var complete;

// creating start of timer
var runningTimer = moment("59", "X").format("ss");
console.log(runningTimer);

// Grabbing items from the HTML page.
var logoEL = document.querySelector("img");
var newGame = document.getElementById("new-game");
var btnHighScore = document.getElementById("high-score");
var list = document.getElementById("answer-list");
var main = document.querySelector("main");
var reply = document.getElementById("reply");
var heading = document.getElementById("heading");



// Trying to create items to setup the form input.
var form = document.createElement("form");
form.id = "frm1";
var initialsInput = document.createElement("input");
initialsInput.type = "text";
initialsInput.name = "name";
var submit = document.createElement("button");
submit.textContent = "Submit";


// starting the timer after new game is clicked. Once it reaches 0 the timer goes away.

function startTimer() {
    var clock = setInterval(function(){
        runningTimer--;
        timeSlot.textContent = "Time remaining: " + runningTimer;
        heading.appendChild(timeSlot);

        if (runningTimer == 0) {
            score = 0;
            clearInterval(clock);
            heading.removeChild(timeSlot);
            newLabels();
        }
        else if (complete == 1) {
            score = runningTimer;
            clearInterval(clock);
        }
    }, 1000);
}


// function to sort the high scores array and then post them on the highscores page.
function toHighScorePage() {
var scoresList = JSON.parse(localStorage.getItem("High Score"));
scoresList.sort(function(a,b){
    return b.score - a.score;
});

for (let i=0; i < scoresList.length; i++) {
    var ranking = document.createElement("li");
    var currentName = scoresList[i].name;
    var currentScore = scoresList[i].score;
    ranking.textContent= currentName + " - " + currentScore;
    console.log(ranking);
}}

// function that post scores to the local storage.
function postScores() {
    var name = initialsInput.value;
    var submitScores = {"name": name,"score": score};
    var storedScores = JSON.parse(localStorage.getItem("High Score"));

    if (!storedScores){
        var highScores = [];
        highScores.push(submitScores);
    }
    else {
    highScores = storedScores;
    highScores.push(submitScores);    
    }
    localStorage.setItem("High Score", JSON.stringify(highScores));
}

//image starts at 0, when the page loads. This function sets the first question when the 'New Game' button is hit. The else statement is for when we've run out of images, the prompt to enter intials for high score comes up.
function newLabels() {
    if (image < logos.length && runningTimer > 0){
        logoEL.src="./assets/images/" + logos[image];
        answer1.textContent=answers[image][0];
        answer2.textContent=answers[image][1];
        answer3.textContent=answers[image][2];
        answer4.textContent=answers[image][3];
        image++;
    }
    else {
        complete = 1;
        main.removeChild(logoEL);
        list.remove();
        reply.remove();
        question.textContent = "Please enter your initials to see if you made the high score!";
        main.appendChild(form).appendChild(initialsInput)
        main.appendChild(submit);
        score = runningTimer;
        localStorage.setItem("score", score);
    }
}
// Function to check if answers are correct. The answers are stored at the end of the 'answers' array. The selection is set in the EventListeners on the bottom to compare.
function answerCheck() {
    if (selection === answers[image-1][4]) {
    reply.textContent = "You are correct, well done!";
    }
    else {
    reply.textContent = "That is WRONG";
    runningTimer -= 10;
    }
}

// EvenListener for the New Game button. It changes the image to the first one in the array. It also sets up a list with buttons to be used for the game.
newGame.addEventListener("click", function(event){
    startTimer();
    question.textContent = "Which college or university does the following logo represent?"
    image=0;
    logoEL.src="./assets/images/" + logos[image];
    main.appendChild(question);
    answer1.textContent=answers[0][0];
    answer2.textContent=answers[0][1];
    answer3.textContent=answers[0][2];
    answer4.textContent=answers[0][3];
    reply.textContent = "Please make a selection.";
    list.appendChild(item1).appendChild(answer1);
    list.appendChild(item2).appendChild(answer2);
    list.appendChild(item3).appendChild(answer3);
    list.appendChild(item4).appendChild(answer4);
    image++;
})

// The following 4 EventListeners are assigned to each of the buttons that are created when the New Game is setup.
answer1.addEventListener("click", function(event) {
    selection=0;
    answerCheck();
    newLabels();
})

answer2.addEventListener("click", function(event) {
    selection=1;
    answerCheck();
    newLabels();
})

answer3.addEventListener("click", function(event) {
    selection=2;
    answerCheck();
    newLabels();
})

answer4.addEventListener("click", function(event) {
    selection=3;
    answerCheck();
    newLabels();
})

// This EventListener is setup to try and setup a HighScores page.
submit.addEventListener("click", function(event){
    postScores();
    window.location.replace("https://kjphelps90.github.io/QuizBowl/highscore.html");

})

btnHighScore.addEventListener("click", function() {
    window.location.replace("https://kjphelps90.github.io/QuizBowl/highscore.html");
})

