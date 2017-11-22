//bubbles.js 

var rows = 8; 

var columns = 15; 

var sizeofgrid = rows*columns;


/*
	Array of bubbles selected by the user. Bubble images in the selectedbubbles array will appear in a box on the screen. If the user clicks on any of them again, 
	all of the bubbles in selectedbubbles will "burst"
	The selectedbubbles array contains the ids of the currently selected bubbles (ie. bordered in black box). 
*/
var selectedbubbles = new Array(); 


//the number of remaining bubbles still on the screen. This is all of the bubbles that have not yet been "burst". 
var bubblenumber = 0;



loadgame();



function loadgame() { //loads the 'bubble' images of the game (randomized colours)
	var bubblenumb1to5; //a random number from 1 to 5
	for (i = 0; i < sizeofgrid; i++) {
		bubblenumb1to5 = Math.floor(Math.random()*5) + 1; //generates a random number between 1 and 5 (corresponds with the "bubble" images 1.png through 5.png)
		bubblenumber++; //the number of bubbles in the game as increased
		document.write("<img id = " + i + " name = " + bubblenumb1to5 + " src=\"" + bubblenumb1to5 + ".png\" onclick = \"bubbleclick(" + i + ")\" />");
		document.getElementById(i).style.opacity = 0.8;
	}
}



function newgame() { //generates a new bubble grid
	bubblenumber = 0;
	for (i = 0; i < sizeofgrid; i++) {
		bubblenumb1to5 = Math.floor(Math.random()*5) + 1;
		bubblenumber++;
		//updates the image and its attributes
		document.getElementById(i).src = bubblenumb1to5 + ".png";
		document.getElementById(i).name = bubblenumb1to5;
		document.getElementById(i).style.opacity = 0.8;
	}
}



/*
	Recursive funtion that takes the id of the current bubble and the bubble colour and finds all adjacent bubbles of the same colour
*/
function findadjbubbles(bubbleid, bubblecolour) { 	

	if (selectedbubbles.indexOf(bubbleid) < 0) { //if the bubble isn't already in the selectedbubbles array

		if (document.getElementById(bubbleid).name == bubblecolour) { //add the bubble if it's the same colour
			selectedbubbles.push(bubbleid);
		}
		else {
			return;
		}
	}
	
	//the following recursively checks the bubble's neighbours in all directions (top, bottom, right, left)
	topneighbour = bubbleid-columns;
	if ((topneighbour) >= 0 && (document.getElementById(topneighbour).style.opacity !== 0) && (selectedbubbles.indexOf(topneighbour) < 0)) { //has a top neighbour
		findadjbubbles((topneighbour), bubblecolour);
	}
	bottom = bubbleid+columns;
	if ((bottom) < sizeofgrid && (document.getElementById(bottom).style.opacity !== 0) && (selectedbubbles.indexOf(bottom) < 0)) { //has bottom neighbour
		findadjbubbles((bottom), bubblecolour);		
	}
	totheright = bubbleid+1;
	if ((totheright < (bubbleid+15 - (bubbleid%15))) && (document.getElementById(totheright).style.opacity !== 0) && (selectedbubbles.indexOf(totheright) < 0)) {
		findadjbubbles((totheright), bubblecolour);
	}
	totheleft = bubbleid-1;
	if ((totheleft >= (bubbleid - (bubbleid)%15)) && (document.getElementById(totheleft).style.opacity !== 0) && (selectedbubbles.indexOf(totheleft) < 0)) {
		findadjbubbles((totheleft), bubblecolour);
	}		
	return;	
}



function boxthebubbles(id) { 
	
	//find all of the adjacent bubbles that are of the same colour
	findadjbubbles(id, document.getElementById(id).name); 	

	//add a border around all of the selected bubbles
	for (var bubbles = 0; bubbles < selectedbubbles.length; bubbles++) {
		document.getElementById(selectedbubbles[bubbles]).className = "bordered";
	}
	
	
	//tell the user how many points they could get if they "burst" the selected bubbles
	intermscore(selectedbubbles.length); 
}




//decide on something to do when it ends
function gameended() {
}



/*
	A function that removes the selected bubbles, causing all bubbles above it to fall 
	It indexes through the bubbles in the selectedbubbles array and switches the name and image file of each bubble with all of its upper neighbours.
*/
function gravity() {
	selectedbubbles.sort(function(a, b) {return a-b}); //sorts bubble ids in the selectedbubbles array
	
	for (var index2 = 0; index2 < selectedbubbles.length; index2++) { 
	//indexing though the bubbles in the selectedbubbles array

		idofbubble = selectedbubbles[index2]; //the id of the bubble
		document.getElementById(idofbubble).className = "normal"; //remove border around bubble

		while ((idofbubble-columns) >= 0 && (document.getElementById(idofbubble-columns).style.opacity != 0)) { 
			//while the bubble has an upper neighbour
			
			topbubble = document.getElementById(idofbubble-columns).name; //the colour of the upper neighbour
			bottombubble = document.getElementById(idofbubble).name; //the colour of the bubble being burst		
			
			//replaces the name and image file of the bubble with its upper neighbour
			document.getElementById((idofbubble)).name = topbubble;
			document.getElementById(idofbubble).src = topbubble + ".png";
			
			//replaces the name and image file of the bubble's upper neighbour with that of the bubble
			document.getElementById(idofbubble-columns).name = bottombubble;
			document.getElementById(idofbubble-columns).src = bottombubble + ".png";
			
			idofbubble = idofbubble-columns;			
		}

		document.getElementById(idofbubble).style.opacity = 0; //sets the opacity of the bubble that burst to 0 (so it comes invisible)
		bubblenumber--; //reduces the number of bubbles in the game by 1
	}
		
	if (bubblenumber == 0) {
		gameended();
	}
}



function bubbleclick(id) { 
/* 
	Called when a bubble image is clicked on
	
	If the bubble or any adjacent bubbles of the same colour have not just been selected, they will now be bordered in black. 
	The selectedbubbles array will be cleared of any previous items and the id of the bubble and adjacent bubbles of the same colour will be added to the array
	The potential score increase will be displayed to the user.

	If the bubble is part of a set that has just been selected (would show the bubbles bordered in black on the screen), 
		all the selected bubbbles will now "burst".
	If the bubble is part of a set that has just been selected, its id (and those of adjacent bubbles of the same colour) would be in the selectedbubbles array.

	If there is a set of bubbles selected (ie. bordered in black), but this bubble is not part of that set, then the previous bubbles will be unselected,
	and this bubbles and all adjacent bubbles of the same colour will be selected (ie. bordered in black and added to the selectedbubbles array).		

*/
	if (document.getElementById(id).style.opacity !== 0) { //skips all bubbles that have already "burst" (ie. bubbles whose opacity has been made 0)
		
		if (selectedbubbles.length > 0) { //if some bubbles have just been selected
			
			if ((selectedbubbles.indexOf(id)) >= 0) { //if the bubble that just was just clicked on is in the set of currently selected bubbles
			//all the bubbles in the set "burst"

				changescore(selectedbubbles.length); //increase the score
				intresetscore(); //then set the text telling the user how many points they could earn to zero
				gravity(); //remove all bubbles in the set, causing all bubbles above it to fall
				selectedbubbles = []	//reset the array
			}
			else { //the bubble just selected is not part of the set of currently selected bubbles

				//remove the bordered from all the previously selected bubbles
				for (var index1 = 0; index1 < selectedbubbles.length; index1++) { 
					document.getElementById(selectedbubbles[index1]).className = "normal";
			
				}
				selectedbubbles = [] //reset the array
				boxthebubbles(id); //surrounds all adjacent bubbles (of the same colour) with a black border and adds them to selectedbubbles array

			}
		}
		else { //no bubbles were just selected (ie. no bubbles are surrounded by a black border)
			boxthebubbles(id); //surrounds all adjacent bubbles (of the same colour) with a black border and adds them to selectedbubbles array
		}
	}	
}