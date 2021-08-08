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
var correctAnswers = 0;
var score = 60;
var logoEL = document.querySelector("img");
var newGame = document.getElementById("new-game");
var image = 0;
var list = document.getElementById("answer-list");
var main = document.querySelector("main");
var reply = document.getElementById("reply");
var question = document.createElement("p");
var initialsInput = document.createElement("input");
var item1 = document.createElement("li");
var item2 = document.createElement("li");
var item3 = document.createElement("li");
var item4 = document.createElement("li");
var answer1 = document.createElement("button");
var answer2 = document.createElement("button");
var answer3 = document.createElement("button");
var answer4 = document.createElement("button");
var selection = -90;
var submit = document.createElement("button");
submit.textContent = "Submit";
var highScores = [];
var highScoreParsed = "";

// function submit() {

// }

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
        main.appendChild(initialsInput);
        main.appendChild(submit);
        localStorage.setItem("score", score);
    }
}

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

// Even Listeners for each of the buttons.
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