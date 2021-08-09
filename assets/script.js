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

// Setting placeholder variable that should be reset whenever the page is reset/re-visited.
var correctAnswers = 0;
var score = 60;
var selection = -90;
var image = 0;

// Grabbing items from the HTML page.
var logoEL = document.querySelector("img");
var newGame = document.getElementById("new-game");
var list = document.getElementById("answer-list");
var main = document.querySelector("main");
var reply = document.getElementById("reply");
var question = document.createElement("p");
var highScoreList = document.getElementById("high-score-list"); // this is on the highscore.html page

// Trying to create items to setup the form input.
var form = document.createElement("form");
form.id = "frm1";
var initialsInput = document.createElement("input");
initialsInput.type = "text";
initialsInput.name = "name";
var submit = document.createElement("button");
submit.textContent = "Submit";

// var highScores = []; //this doesn't work beacuse it resets the array each time.

function postScores() {
    var name = initialsInput.value;
    var submitScores = [{"name": name,"score": score}];

    if (typeof highScores !== "undefined"){
        highScores = JSON.parse(localStorage.getItem("High Score"));
        highScores.push(submitScores);
    }
    else {
        var highScores = [];
        highScores.push(submitScores);
    }
    
    localStorage.setItem("High Score", JSON.stringify(highScores));
}

//image starts a 0, when the page loads. This function sets the first question when the 'New Game' button is hit. The else statement is for when we've run out of images, the prompt to enter intials for high score comes up.
function newLabels() {
    if (image < logos.length){
        logoEL.src="./assets/" + logos[image];
        answer1.textContent=answers[image][0];
        answer2.textContent=answers[image][1];
        answer3.textContent=answers[image][2];
        answer4.textContent=answers[image][3];
        image++;
    }
    else {
        main.removeChild(logoEL);
        list.remove();
        reply.remove();
        question.textContent = "Please enter your initials to see if you made the high score!";
        main.appendChild(form).appendChild(initialsInput)
        main.appendChild(submit);
        submit.value = "Submit";
        localStorage.setItem("score", score);
    }
}
// Function to check if answers are correct. The answers are stored at the end of the 'answers' array. The selection is set in the EventListeners on the bottom to compare.
function answerCheck() {
    if (selection === answers[image-1][4]) {
    reply.textContent = "You are correct, well done!";
    correctAnswers++;
    localStorage.setItem("correctAnswers", correctAnswers);
    }
    else {
    reply.textContent = "That is WRONG";
    localStorage.setItem("correctAnswers", correctAnswers);
    score -= 10;
    }
}

// EvenListener for the New Game button. It changes the image to the first one in the array. It also sets up a list with buttons to be used for the game.
newGame.addEventListener("click", function(event){
    question.textContent = "Which college or university does the following logo represent?"
    image=0;
    correctAnswers=0;
    localStorage.setItem("correctAnswers", correctAnswers);
    logoEL.src="./assets/" + logos[image];
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


    // console.log(name);
    // console.log(submitScores);
    // console.log(highScores);
    
//     if (highScores !== null){
//         var highScores = JSON.parse(localStorage.getItem("High Score"));
//         highScores.push(submitScores);
//         localStorage.setItem("High Score", JSON.stringify(highScores));
// }
//     else {
//         highScores.push(submitScores);
//         localStorage.setItem("High Score", JSON.stringify(highScores));  
//     }
    
})

