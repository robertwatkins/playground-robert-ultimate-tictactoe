function init() {
	

	drawBoard();
	//drawMark("X","center");
	//drawMark("X","upperleft");
	//drawMark("X","topcenter");
	//drawMark("X","upperright");
	//drawMark("X","centerleft");
	//drawMark("X","centerright");
	//drawMark("X","bottomleft");
	//drawMark("X","bottomcenter");
	//drawMark("X","bottomright");
	
	drawMark("X","center");
	drawMark("X","upperleft");
	drawMark("X","topcenter");
	drawMark("X","upperright");
	drawMark("X","centerleft");
	drawMark("X","centerright");
	drawMark("X","bottomleft");
	drawMark("X","bottomcenter");
	drawMark("X","bottomright");

	}
	
function drawMark( mark,  location) {
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var myX = 0;
    var myY = 0;
    
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
    
	//drawing 'X'
	//context.beginPath();
	//context.strokeStyle='#777777';
	//context.lineWidth=15;
	//context.moveTo(55, 55);
	//context.lineTo( 105, 105);
	//context.stroke();
	//context.moveTo(105,55);
	//context.lineTo(55,105);
	//context.stroke();
	
	if (mark="X") {
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
	}
	//drawing 'O'
	//context.beginPath();
	//context.strokeStyle='#777777';
	//context.lineWidth=15;
	//context.arc(200,80,27,0,2*Math.PI);
	//context.stroke();
}

function drawBoard() {
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
	//drawing board
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
	context.moveTo(35,265);
	context.lineTo(370,265);
	context.stroke();
}