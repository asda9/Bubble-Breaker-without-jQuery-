//score.js (Score for Bubble Breaker)

var score = 0;

function changescore(n) {
	score += n*n;
	document.getElementById("score").innerHTML = score;
	document.getElementById("scoreinterm").style.opacity = 0;
}

function clearscore() {
	score = 0;
	document.getElementById("score").innerHTML = score;
	document.getElementById("scoreinterm").style.opacity = 0;
}

function intermscore(n) {
	intscore = n * n;
	document.getElementById("scoreincrease").innerHTML = intscore;
	document.getElementById("scoreinterm").style.opacity = 1;
}

function intresetscore() {
	document.getElementById("scoreincrease").innerHTML = 0;
	document.getElementById("scoreinterm").style.opacity = 0;
}