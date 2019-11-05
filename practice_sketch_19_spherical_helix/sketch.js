// 3d practice 

var spiralHeight;
var sphereArr = [];
var sphereArr2 = [];
var fillMode;
var fboMode;
function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight, WEBGL);
  spiralHeight = 200;

  var height = -spiralHeight;
  for (var i = 0; i < Math.PI * 2; i += Math.PI / 48){
  	var sph = new Sphere(10, spiralHeight * Math.sin(i / 2) * Math.cos(i * 2), 
  		spiralHeight * Math.sin(i / 2) * Math.sin(i * 2), height += 5);
  	sphereArr.push(sph);
  }

  height = -spiralHeight;
  for (var i = 0; i < Math.PI * 2; i += Math.PI / 24){
  	var sph = new Sphere(10, spiralHeight * Math.sin(i) * Math.cos(i * 2), 
  		spiralHeight * Math.sin(i) * Math.sin(i * 2), height += 10);
  	sphereArr2.push(sph);
  }

  fillMode = false;
  fboMode = false;

 //S background(0);
}

function draw() {
  // put drawing code here

  if (fboMode){  
  	push();
  	translate(- width / 2, - height / 2, 0);
  	fill(0);
  	rect(0, 0, width, height);
  	pop();
  	smooth();
  }
  else background(0);
  for (var i = 0; i < sphereArr.length; i++){
  	sphereArr[i].display(255, 100, 0);
  	sphereArr[i].changeRadius(20 * Math.sin((frameCount + i) * 0.1));
  }

  for (var i = 0; i < sphereArr2.length; i++){
  	sphereArr2[i].display(0, 255, 100);
  	sphereArr2[i].changeRadius(20 * Math.sin((frameCount + i * 2) * 0.05));
  }
  fill(255);
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
	switch (key){
		case 'r':
			for (var i = 0; i < sphereArr.length; i++){
  				sphereArr[i].resolution += 1;
 			 }
 			 for (var i = 0; i < sphereArr2.length; i++){
  				sphereArr2[i].resolution += 1;
 			 }
 			 console.log("TEST");
 			 break;

		case 't':
			for (var i = 0; i < sphereArr.length; i++){
  				sphereArr[i].resolution -= 1;
 			 }
 			 for (var i = 0; i < sphereArr2.length; i++){
  				sphereArr2[i].resolution -= 1;
 			 }
 			 break;
 		case 'f':
 			fillMode = !fillMode;
 			break;
 		case 'o':
 			fboMode = !fboMode;

	}
}




class Sphere{
	constructor(radius, posX, posY, posZ, color){
		this.radius = radius;
		this.posX = posX;
		this.posY = posY;
		this.posZ = posZ;
		this.color = color;
		this.resolution = 10;
	}

	display(r, g, b){
		push();
		
		//noFill();
		//strokeWeight(1);
		//stroke(r, g, b, 200);
		if (fillMode){
			noStroke();
			fill(r, g, b, 255);
		}
		else{
			noFill();
			stroke(r, g, b, 255);
		}
		rotateX(frameCount * 0.01);
		translate(this.posX, this.posY, this.posZ);
		rotateY(frameCount * 0.05);
		ellipsoid(this.radius, this.radius, this.radius, this.resolution, this.resolution);
		pop();
	}

	changeRadius(inc){
		this.radius = inc;
	}
}
