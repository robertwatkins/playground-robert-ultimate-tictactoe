function init() {
	// draw a line from (100, 50) to (300, 175);
	var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    context.beginPath();
    //context.moveTo(100, 150);
    //context.lineTo(450, 50);
    //context.stroke();
	context.beginPath();
	context.strokeStyle('#555555');
	context.lineWidth(15);
	context.moveTo(55, 55);
	context.lineTo( 105, 105);
	context.stroke();
	context.moveTo(105,55);
	context.line(55,105);
	context.stroke();

	//context.ellipse(200,80,50,50);

	// draw a thicker, green line from (350, 200) to (100, 310);
	context.strokeStyle('#000000');
	context.moveTo(140, 35);
	context.line( 140, 360);
	context.moveTo(260, 35);
	context.lineTo( 260, 360);
	context.moveTo(35,140);
	context.lineTo(360,140);
	context.moveTo(35,245);
	context.lineTo(360,245);
	}