var cloud = new Path();
cloud.add(new Point(38, 9)); 
cloud.add(new Point(47, 10)); 
cloud.add(new Point(54, 14)); 
cloud.add(new Point(56, 20)); 
cloud.add(new Point(62, 17)); 
cloud.add(new Point(66, 16));
cloud.add(new Point(68, 16)); 
cloud.add(new Point(77, 18)); 
cloud.add(new Point(81, 20)); 
cloud.add(new Point(84, 23)); 
cloud.add(new Point(87, 30)); 
cloud.add(new Point(95, 34)); 
cloud.add(new Point(100, 40)); 
cloud.add(new Point(102, 49));
cloud.add(new Point(101, 59));
cloud.add(new Point(94, 65));
cloud.add(new Point(84, 68));
cloud.add(new Point(77, 67));
cloud.add(new Point(72, 65));
cloud.add(new Point(69, 69));
cloud.add(new Point(65, 72));
cloud.add(new Point(61, 74));
cloud.add(new Point(54, 76));
cloud.add(new Point(46, 74));
cloud.add(new Point(40, 70));
cloud.add(new Point(36, 64));
cloud.add(new Point(32, 67));
cloud.add(new Point(27, 69));
cloud.add(new Point(20, 69));
cloud.add(new Point(14, 66));
cloud.add(new Point(8, 60));
cloud.add(new Point(5, 50));
cloud.add(new Point(7, 41));
cloud.add(new Point(13, 34));
cloud.add(new Point(20, 31));
cloud.add(new Point(20, 21));
cloud.add(new Point(22, 18));
cloud.add(new Point(24, 15));
cloud.add(new Point(30, 11));
cloud.closed = true;
cloud.fillColor = 'white';
cloud.scale(0.7,0.7);

var count = 100;

for (var i = 0; i < count; i++) {
	var obj = cloud.clone();
	var center = Point.random() * view.size;
	obj.position = center;
	obj.scale(i / count);
}

//------ CREATION OF THE MAIN OBJECT: HELICOPTER --------
//CABIN

var cabin1P = new Path.RegularPolygon(view.center, 3, 20);
cabin1P.fillColor = 'green';
cabin1P.position.y += 5;
cabin1P.position.x -= 31;
cabin1P.rotate(-90);

var cabin2P = new Path.RegularPolygon(view.center, 4, 24);
cabin2P.fillColor = 'green';
cabin2P.position.x += 12;
cabin2P.scale(1.71,1);

var cabin4P = new Path.RegularPolygon(view.center, 50, 16.8);
cabin4P.fillColor = 'green';
cabin4P.position.x += 41;

var cabin = new Group([cabin1P, cabin2P, cabin4P]);

// TOP PROPELLER

var baseRotor = new Path.RegularPolygon(view.center, 3, 10);
baseRotor.fillColor = 'black';
baseRotor.position.y -= 22;
baseRotor.position.x += 14;
baseRotor.scale(1.2,1);


var propeller = new Path.RegularPolygon(view.center, 100, 3);
propeller.fillColor = 'black';
propeller.position.y -= 33;
propeller.position.x += 14;
propeller.scale(13,1);

var topPropeller = new Group([propeller, baseRotor]);

//TAIL PROPELLER

var triangleTail = new Path.RegularPolygon(view.center, 3, 15);
triangleTail.fillColor = 'green';
triangleTail.position.y += 4;
triangleTail.position.x -= 40;
triangleTail.rotate(-90);
triangleTail.scale(4,1);

var tailPropeller1 = new Path.RegularPolygon(view.center, 100, 2);
tailPropeller1.fillColor = 'black';
tailPropeller1.position.x -= 86;

var tailPropeller2 = new Path.RegularPolygon(view.center, 4, 3);
tailPropeller2.fillColor = 'black';
tailPropeller2.position.x -= 86;
tailPropeller2.position.y -= 12;
tailPropeller2.scale(4,1);
tailPropeller2.rotate(90);

var tailPropeller3 = new Path.RegularPolygon(view.center, 4, 3);
tailPropeller3.fillColor = 'black';
tailPropeller3.position.x -= 86;
tailPropeller3.position.y += 12;
tailPropeller3.scale(4,1);
tailPropeller3.rotate(90);

var tailPropeller = new Group([tailPropeller1, tailPropeller2, tailPropeller3]);

var helicopter = new Group([cabin, triangleTail, tailPropeller, topPropeller]);
helicopter.applyMatrix = false
var step = 10;

viewWith = view.size.width;
viewHeight = view.size.height;

function rotateHelicopter(event){
	// Rotate the Helicopter towards that direction
	ax = event.point.x-helicopter.position.x; // x component of vector A
	ay = event.point.y-helicopter.position.y; // y component of vector A
	aH = Math.pow((Math.pow(ax,2)+Math.pow(ay,2)),0.5);
	// Vector B is always the unitary positive vector of x (1,0)
	// Dot product between A * B = (ax*bx+ay*by)
	dot = (ax*1+ay*0);
	angle = Math.acos(dot/aH)*(180/Math.PI)*Math.sign(ay);
	helicopter.rotation = angle;
}
function helicopterDistance(point){
	// compute chopper distance to the point
	dx = point.x-helicopter.position.x;
	dy = point.y-helicopter.position.y;
	distance = Math.pow((Math.pow(dx,2)+Math.pow(dy,2)),0.5);
	return [dx, dy, distance]; // 0, 1 ,2
}

function onResize(event) {
	// Whenever the window is resized, recenter the path:
	helicopter.position = view.center;
	
	for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
		item.position.y = item.position.y*view.size.height/viewHeight;
		item.position.x = item.position.x*view.size.width/viewWith;
	}
	viewWith = view.size.width;
	viewHeight = view.size.height;		
}
function onFrame(event) {
	tailPropeller.rotate(50);
	cloud.remove();
	for (var i = 0; i < count; i++) 
	{
			var item = project.activeLayer.children[i];
			item.position.x -= item.bounds.width / 20;
			if (item.bounds.right < 0) 
			{
					item.position.x = view.size.width+item.bounds.width;
			}
	}
}
function onKeyDown(event) {
	if(event.key == 'up'){
		helicopter.position.y -= step;
	}
	if(event.key == 'down'){
		helicopter.position.y += step;
	}
	if(event.key == 'left'){
		helicopter.position.x -= step;
	}
	if(event.key == 'right'){
		helicopter.position.x += step;
	}
}
function onMouseDown(event) {
    rotateHelicopter(event);
	//console.log(helicopter);

}
function onMouseDrag(event){
	rotateHelicopter(event);
	currentDistance = helicopterDistance(event.point);
	//console.log(currentDistance[0], currentDistance[1]);
	factor = currentDistance[2]
	iterations = 0
	while (currentDistance[2] > 10){
		console.log(helicopter.position);
		console.log(currentDistance[2]);
		factor = 0.3;
		helicopter.position = {x: helicopter.position.x + currentDistance[0]/Math.pow(factor,1/4),
							   y: helicopter.position.y + currentDistance[1]/Math.pow(factor,1/4)
							   }
		currentDistance = helicopterDistance(event.point);
		sleep(100);
		iterations += 1;
		if (iterations>15){break}
	}
}
///function onMouseUp(event) {
//	helicopter.position = ({x: 100, y: 100})
//}
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
		break;
    }
  }
}
