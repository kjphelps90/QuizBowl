var highScoreList = document.getElementById("high-score-list");
var clearButton = document.getElementById("clear");
var backButton = document.getElementById("back");

function init() {
    var storedScores = JSON.parse(localStorage.getItem("High Score"));
    if (storedScores) {
        var scoresList = JSON.parse(localStorage.getItem("High Score"));
        scoresList.sort(function (a, b) {
            return b.score - a.score;
        });

        if (scoresList.length < 10) {
            for (let i = 0; i < scoresList.length; i++) {
                var ranking = document.createElement("li");
                var currentName = scoresList[i].name;
                var currentScore = scoresList[i].score;
                ranking.textContent = currentName + " - " + currentScore;
                console.log(ranking);
                highScoreList.appendChild(ranking);
            }
        } else {
            for (let i = 0; i < 10; i++) {
                var ranking = document.createElement("li");
                var currentName = scoresList[i].name;
                var currentScore = scoresList[i].score;
                ranking.textContent = currentName + " - " + currentScore;
                console.log(ranking);
                highScoreList.appendChild(ranking);
            }
        }
    }
}

clearButton.addEventListener("click", function (event) {
    localStorage.removeItem("High Score");
    location.reload();
})

backButton.addEventListener("click", function (event) {
    window.location.replace("https://kjphelps90.github.io/QuizBowl/");
})


init();