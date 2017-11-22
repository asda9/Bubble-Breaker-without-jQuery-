//timer.js (Time for BubbleBreaker)

var time = 0;

var timeid;


function changetime() {
	document.getElementById("timer").innerHTML = time;
	time += 1;
	timeid = setTimeout("changetime()", 1000);
}

function restarttime() {
	clearTimeout(timeid);
	time=0;
	changetime();
}