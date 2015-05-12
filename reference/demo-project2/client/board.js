function init() {
	
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

	//drawing 'X'
	context.beginPath();
	context.strokeStyle='#777777';
	context.lineWidth=15;
	context.moveTo(55, 55);
	context.lineTo( 105, 105);
	context.stroke();
	context.moveTo(105,55);
	context.lineTo(55,105);
	context.stroke();

	//drawing 'O'
	context.beginPath();
	context.strokeStyle='#777777';
	context.lineWidth=15;
	context.arc(200,80,27,0,2*Math.PI);
	context.stroke();

	//drawing board
	context.beginPath();
	context.strokeStyle='#000000';
	context.moveTo(140, 35);
	context.lineTo( 140, 360);
	context.stroke();
	context.moveTo(260, 35);
	context.lineTo( 260, 360);
	context.stroke();
	context.moveTo(35,140);
	context.lineTo(360,140);
	context.stroke();
	context.moveTo(35,245);
	context.lineTo(360,245);
	context.stroke();
	}