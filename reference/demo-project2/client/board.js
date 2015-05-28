
var gameHost = "http://localhost:3000/api/";
var xmlRequest = new XMLHttpRequest();


function init() {
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
	canvas.addEventListener("mousedown", doMove, false);
	drawBoard();
}

function doMove(event){
	var myX = event.pageX;
	var myY = event.pageY;
	console.log("Click at (x,y)=("+myX+","+myY+")");
	if (myX < 80 && myX > 50 ) {
		if (myY < 130 && myY > 100) {
			drawMark("X","upperleft");
		} else if (myY < 250 && myY > 220 ) {
			drawMark("X","centerleft");
		} else if (myY < 370 && myY > 340 ) {
			drawMark("X", "bottomleft");
		} else {
			console.log("No valid move at (x,y)=("+myX+","+myY+")");
		}
	} else if (myX < 210 && myX > 170) {
		if (myY < 120 && myY > 100) {
			drawMark("X","topcenter");
		} else if (myY < 250 && myY > 220 ) {
			drawMark("X","center");
		} else if (myY < 370 && myY > 340 ) {
			drawMark("X", "bottomcenter");
		} else {
			console.log("No valid move at (x,y)=("+myX+","+myY+")");
		}
	} else if (myX < 320 && myX > 290){
		if (myY < 130 && myY > 100) {
			drawMark("X","upperright");
		} else if (myY < 250 && myY > 220 ) {
			drawMark("X","centerright");
		} else if (myY < 370 && myY > 340 ) {
			drawMark("X", "bottomright");
		} else {
			console.log("No valid move at (x,y)=("+myX+","+myY+")");
		}		
	} else if (myX < 130 && myX > 90) {
		if (myY < 130 && myY > 100) {
			drawMark("O","upperleft");
		} else if (myY < 250 && myY > 220 ) {
			drawMark("O","centerleft");
		} else if (myY < 370 && myY > 340 ) {
			drawMark("O", "bottomleft");
		} else {
			console.log("No valid move at (x,y)=("+myX+","+myY+")");
		}		
	} else if (myX < 250 && myX > 210) {
		if (myY < 130 && myY > 100) {
			drawMark("O","topcenter");
		} else if (myY < 250 && myY > 220 ) {
			drawMark("O","center");
		} else if (myY < 370 && myY > 340 ) {
			drawMark("O", "bottomcenter");
		} else {
			console.log("No valid move at (x,y)=("+myX+","+myY+")");
		}	
	} else if (myX < 380 && myX > 340) {
		if (myY < 130 && myY > 100) {
			drawMark("O","upperright");
		} else if (myY < 250 && myY > 220 ) {
			drawMark("O","centerright");
		} else if (myY < 370 && myY > 340 ) {
			drawMark("O", "bottomright");
		} else {
			console.log("No valid move at (x,y)=("+myX+","+myY+")");
		}
	} else {
		console.log("No valid move at (x,y)=("+myX+","+myY+")");
	}
}


function updateTranscript(author, message){
  document.getElementById("log").value += "\n" + author + ":\n" + message
}

function clearBoard() {
	clearMark("center")
	clearMark("upperleft");
	clearMark("topcenter");
	clearMark("upperright");
	clearMark("centerleft");
	clearMark("centerright");
	clearMark("bottomleft");
	clearMark("bottomcenter");
	clearMark("bottomright");
}

function clearMark(location) {
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
	var position = lookupPosition(location);	
    var myX = position[0];
    var myY = position[1];
	context.clearRect(myX-50,myY-50,100,100);
}
function drawMoveMark (mark, location) {
	console.log("Mark:"+mark+" Location:"+location);
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var position = lookupPosition(location);	
    var myX = position[0];
    var myY = position[1];
	
	if (mark=="X") {
		//drawing 'X'
		context.beginPath();
		context.strokeStyle='#777777';
		context.lineWidth=5;
		context.moveTo(myX-25, myY+25);
		context.lineTo( myX-15, myY+35);
		context.stroke();
		context.moveTo(myX-15,myY+25);
		context.lineTo(myX-25,myY+35);
		context.stroke();
	} else {
		//drawing 'O'
		context.beginPath();
		context.strokeStyle='#777777';
		context.lineWidth=5;
		context.arc(myX+20,myY+30,5,0,2*Math.PI);
		context.stroke();
	}
}
function drawMark( mark,  location) {
	console.log("Mark:"+mark+" Location:"+location);
	updateTranscript("System", "Mark:"+mark+" Location:"+location);
	
	myMove='{"SequenceNumber": "0","PlayersMark": "'+mark+'","GameId": "1","Location": "'+location+'","Player": "1"}';
	xmlRequest.open("PUT",gameHost+"Games/0/Move/1",false);
	xmlRequest.send(myMove);
	updateTranscript("System",xmlRequest.status+ "\n" + xmlRequest.statusText);
	
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var position = lookupPosition(location);	
    var myX = position[0];
    var myY = position[1];

	//clear the square
	clearMark(location);
	
	if (mark=="X") {
		//drawing 'X'
		context.beginPath();
		context.strokeStyle='#777777';
		context.lineWidth=15;
		context.moveTo(myX-25, myY-25);
		context.lineTo( myX+25, myY+25);
		context.stroke();
		context.moveTo(myX+25,myY-25);
		context.lineTo(myX-25,myY+25);
		context.stroke();
	} else {
		//drawing 'O'
		context.beginPath();
		context.strokeStyle='#777777';
		context.lineWidth=15;
		context.arc(myX,myY,27,0,2*Math.PI);
		context.stroke();
	}
}

function lookupPosition(location) {
	switch (location) {
       case "upperleft":
       		myX=80;
       		myY=80;
       		break;
       	case "topcenter":
       		myX=200;
       		myY=80;
       		break;
       	case "upperright":
       		myX=320;
       		myY=80;
       		break;
       	case "centerleft":
       		myX=80;
       		myY=200;
       		break;
       	case "center":
       		myX=200;
       		myY=200;
       		break;
       	case "centerright":
       		myX=320;
       		myY=200;
       		break;
       	case "bottomleft":
       		myX=80;
       		myY=320;
       		break;
       	case "bottomcenter":
       		myX=200;
       		myY=320;
       		break;
       	case "bottomright":
       		myX=320;
       		myY=320;
       		break;
       	default:
       		break;
    }
	return [myX,myY];
}

function drawBoard() {
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
	//drawing board
	context.clearRect(0,0,400,400);
	context.beginPath();
	context.strokeStyle='#777777';
	context.lineWidth=15;
	context.strokeStyle='#000000';
	context.moveTo(140, 35);
	context.lineTo( 140, 370);
	context.stroke();
	context.moveTo(260, 35);
	context.lineTo( 260, 370);
	context.stroke();
	context.moveTo(35,140);
	context.lineTo(370,140);
	context.stroke();
	context.moveTo(35,260);
	context.lineTo(370,260);
	context.stroke();
	context.save();
	context.restore();
	
	//draw Move marks
	drawMoveMark("X","center");
	drawMoveMark("X","upperleft");
	drawMoveMark("X","topcenter");
	drawMoveMark("X","upperright");
	drawMoveMark("X","centerleft");
	drawMoveMark("X","centerright");
	drawMoveMark("X","bottomleft");
	drawMoveMark("X","bottomcenter");
	drawMoveMark("X","bottomright");
	drawMoveMark("O","center");
	drawMoveMark("O","upperleft");
	drawMoveMark("O","topcenter");
	drawMoveMark("O","upperright");
	drawMoveMark("O","centerleft");
	drawMoveMark("O","centerright");
	drawMoveMark("O","bottomleft");
	drawMoveMark("O","bottomcenter");
	drawMoveMark("O","bottomright");
}

function waitASec(){
    var now = new Date().getTime();
    while(new Date().getTime() < now + 1000){ /* do nothing */ } 
}