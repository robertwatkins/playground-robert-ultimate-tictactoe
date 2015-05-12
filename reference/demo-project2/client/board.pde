void setup() {
	size(250,250);
	background(0);
	fill(255);
	noLoop;
	PFont fontA = loadFont("courier");
    textFont(fontA, 14);  
}

void draw() {
	// draw a line from (100, 50) to (300, 175);
	stroke(86, 87, 87);
	strokeWeight(15);
	line(55, 55, 105, 105);
	line(105,55,55,105);

	ellipse(200,80,50,50);

	// draw a thicker, green line from (350, 200) to (100, 310);
	stroke(0, 0, 0);
	line(140, 35, 140, 360);
	line(260, 35, 260, 360);
	line(35,140,360,140);
	line(35,245,360,245);
}