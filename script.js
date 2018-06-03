const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var Interval;
var Timerrunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
	if(time <=9 ){
		time = "0" + time;
	}
	return time;
}

// Run a standard minute/second/hundredths timer:
function runtimer(){
	let currenttimer = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" +leadingZero(timer[2]); 
    theTimer.innerHTML = currenttimer;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100)-(timer[0]*60));
    timer[2] = Math.floor(timer[3]-(timer[1]*100)-(timer[0]*6000));
}

// Match the text entered with the provided text on the page:

 function spellcheck(){
 	let textEntered = testArea.value;
 	let originTextMatch = originText.substring(0,textEntered.length);
 	 /*substring treats a string of a text as an array 
 	and allows us to specify a section within the text to pul out and use the substring.  
    it takes two arguments (where in the array we want to start,how many characters we want returned).
 	*/

 	if(textEntered == originText){
 		clearInterval(Interval);
 		testWrapper.style.borderColor = "#429890";
 	}else{
 		if(textEntered == originTextMatch){
 		  testWrapper.style.borderColor = "#65ccf3";	
 		}else{
 			testWrapper.style.borderColor = "#E95D0F";
 		}
 	}
 }

// Start the timer:

function start(){
	let textEnteredLength = testArea.value.length;
	if(textEnteredLength === 0 && !Timerrunning){
		Timerrunning = true;
	    Interval = setInterval(runtimer,10);
	}
	console.log(textEnteredLength); 
}

// Reset everything:
function reset(){
	clearInterval(Interval);
	Interval = null;
	timer = [0,0,0,0];
	Timerrunning = false;

	testArea.value = "";
	theTimer.innerHTML = "00:00:00";
	testWrapper.style.borderColor = "Gray";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellcheck,false);
resetButton.addEventListener("click",reset,false);