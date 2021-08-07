var logoEL = document.querySelector("img");
var newGame = document.getElementById("new-game");
var image = 0;
var list = document.getElementById("answer-list");

var question = document.createElement("p");
question.textContent = "Which college or university does the following image represent?"
var item1 = document.createElement("li");
var item2 = document.createElement("li");
var item3 = document.createElement("li");
var item4 = document.createElement("li");
var answer1 = document.createElement("button");
var answer2 = document.createElement("button");
var answer3 = document.createElement("button");
var answer4 = document.createElement("button");

var logos = [
    "belmont_logo.png",
    "clemson_logo.png",
    "drexel_logo.png",
    "lsu_logo.png",
    "rice_logo.gif",
    "richmond_logo.jpg"
];

var answers = [
    ["Baylor", "California","Belmont","Chicago"],
    ["Auburn", "Clemson","LSU","Detroit"],
    ["Drexel", "Texas State","SCLSU","Montana"],
    ["LSU", "Virginia","Miss State","Texas"],
    ["Temple", "Houston","Louisville","Rice"],
    ["TCU", "Richmond","Oregon State","UC-Irvine"]
];

// When a new game is started we're going to want to setup the first question and input the timer.
newGame.addEventListener("click", function(event){

    logoEL.insertBefore(question);

    list.appendChild(item1).appendChild(answer1);
    list.appendChild(item2).appendChild(answer2);
    list.appendChild(item3).appendChild(answer3);
    list.appendChild(item4).appendChild(answer4);


    if (image < logos.length){
    logoEL.src="./assets/" + logos[image];
    image++;
    }

})




// TO BE USED LATER
// if (image < logos.length){
//     logoEL.src="./assets/" + logos[image];
//     image++;
//     }