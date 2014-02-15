
// var snakeGame = (function () {
	
	// var hasStarted = false;
	
	// var posX = 50;
	// var posY = 50;
	// var posXtail = 0;
	// var posYtail = 50;
	
	// var directionHead = "right";
	// var directionTail = "right";

	// var tailDirections = []; 
	// var curvePoints = [];
	
	// var scanAhead;
	// var score = 0;
	
	// function buildGameSetting() {
		// var canvas = document.getElementById("myCanvas");
		// var ctx = canvas.getContext("2d");
		
		// document.addEventListener('keydown', handleEvt, false);
		
		// function handleEvt(evt){
		
			// switch (evt.keyCode) {
				// case 37: directionHead = "left"; 
					// tailDirections.unshift("left");
					// curvePoints.push(posX);
					// curvePoints.push(posY);
					// break;
				// case 38: directionHead = "up"; 
					// tailDirections.unshift("up");
					// curvePoints.push(posX);
					// curvePoints.push(posY);
					// break;
				// case 39: directionHead = "right"; 
					// tailDirections.unshift("right");
					// curvePoints.push(posX);
					// curvePoints.push(posY);
					// break;
				// case 40: directionHead = "down"; 
					// tailDirections.unshift("down");
					// curvePoints.push(posX);
					// curvePoints.push(posY);
					// break;
			// }
		// }
		
		
		
	// }
	
	
	
	
	
	
	
// }());

// ----------------------------------------------------------------------


var hasStarted = false;

function startGame() {
	posX = 50;
	posY = 50;
	posXtail = 0;
	posYtail = 50;
	
	directionHead = "right";
	directionTail = "right";
	
	tailDirections = []; 
	curvePoints = [];
	
	hasStarted = false;
}
	
var posX = 50;
var posY = 50;
var posXtail = 0;
var posYtail = 50;

var directionHead = "right";
var directionTail = "right";

var tailDirections = []; 
var curvePoints = [];

window.onload = function () {
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	
	
	
	
	
	
	// var tailDirections = []; 
	// var curvePoints = [];
	
	var scanAhead;
	
	var score = 0;
	
	// var hasStarted = "true";
	// // var counter = 1;
	// // var hasChangedDirect = "false";
	
	// function startGame() {
		// hasStarted = "false";
	// }
	
	
	
	
	
	// var inpt = document.getElementById("input1");
	document.addEventListener('keydown', handleEvt, false);
	
	// handleEvt(38);
	
	function handleEvt(evt){
		
		
		switch (evt.keyCode) {
			case 65: directionHead = "left"; 
				tailDirections.unshift("left");
				curvePoints.push(posX);
				curvePoints.push(posY);
				break;
			case 87: directionHead = "up"; 
				tailDirections.unshift("up");
				curvePoints.push(posX);
				curvePoints.push(posY);
				break;
			case 68: directionHead = "right"; 
				tailDirections.unshift("right");
				curvePoints.push(posX);
				curvePoints.push(posY);
				break;
			case 83: directionHead = "down"; 
				tailDirections.unshift("down");
				curvePoints.push(posX);
				curvePoints.push(posY);
				break;
		}
		
		hasChangedDirect = "true";
		
	}
	
	
	
	ctx.fillStyle = "rgb(224, 224, 224)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.lineWidth = "3";
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	
	
	var food = new RedTarget(randomCoor(), randomCoor());
	
	
			
			
	
	
		
	
		
	setInterval(function () {	
		
		
		
		if (hasStarted) {
			return;
		};
		
		
		
		if ((posXtail == curvePoints[0]) && (posYtail == curvePoints[1])) {
				directionTail = tailDirections.pop();
				curvePoints.shift();
				curvePoints.shift();
			}
			
		switch (directionTail) {
			case "right": posXtail += 1; break;
			case "up": posYtail -= 1; break;
			case "down": posYtail += 1; break;
			case "left": posXtail -= 1; break;
		}
			
		ctx.fillStyle = "rgb(224,224,224)";
		ctx.beginPath();
		ctx.arc(posXtail, posYtail, 5, 0, Math.PI * 2, false);
		ctx.fill();
		
		//-------------------------------------
		
		switch (directionHead) {
			case "right": posX += 1;
			
			scanAhead = ctx.getImageData(posX + 4, posY, 20, 5);
			if (scanAhead.data[0] == "0" || scanAhead.data[0] == "50" || scanAhead.data[0] == "100" || scanAhead.data[0] == "150") {
				hasStarted = "true";
				alert("...crashed:(");
				return;
			} else if (scanAhead.data[0] == "255") {
				onEatFood();
			}
			 ; break;
			case "up": posY -= 1;
			
			scanAhead = ctx.getImageData(posX, posY - 5, 5, 10);
			if (scanAhead.data[0] == "0" || scanAhead.data[0] == "50" || scanAhead.data[0] == "100" || scanAhead.data[0] == "150") {
				hasStarted = "true";
				alert("...crashed:(");
				return;
			} else if (scanAhead.data[0] == "255") {
				onEatFood();
			}
			 ; break;
			case "down": posY += 1;
			
			scanAhead = ctx.getImageData(posX, posY + 4, 5, 20);
			if (scanAhead.data[0] == "0" || scanAhead.data[0] == "50" || scanAhead.data[0] == "100" || scanAhead.data[0] == "150") {
				hasStarted = "true";
				alert("...crashed:(");
				return;
			} else if (scanAhead.data[0] == "255") {
				onEatFood();
			} 
			 ; break;
			case "left": posX -= 1;
			
			scanAhead = ctx.getImageData(posX - 5, posY, 10, 5);
			if (scanAhead.data[0] == "0" || scanAhead.data[0] == "50" || scanAhead.data[0] == "100" || scanAhead.data[0] == "150") {
				hasStarted = "true";
				alert("...crashed:(");
				return;
			} else if (scanAhead.data[0] == "255") {
				onEatFood();
			} ; 
			break;
		}
		
		// down
		// var scanAhead = ctx.getImageData(posX, posY + 4, 5, 20);
			
			// right
		// var scanAhead = ctx.getImageData(posX + 4, posY, 20, 5);
		
			// left
		//var scanAhead = ctx.getImageData(posX - 5, posY, 10, 5);
		
		// var scanAhead = ctx.getImageData(posX, posY - 5, 5, 10);
		// alert(scanAhead.data[0]);
		
		function onEatFood() {
				
				
				
				
				ctx.fillStyle = "rgb(224, 224, 224)";
				ctx.lineWidth = "3";
				ctx.fillRect(food.Xcoor, food.Ycoor, 15, 15);
				
				food = new RedTarget(randomCoor(), randomCoor());
				
				document.getElementById("input1").value = "growing...";
				score += 5;
				document.getElementById("result").innerHTML = score;
				
				if (directionTail == "right") {
					posXtail -= 5;
				}
				
				if (directionTail == "up") {
					posYtail += 5;
				}
				
				if (directionTail == "down") {
					posYtail -= 5;
				}
				if (directionTail == "left") {
					posXtail += 5;
				}
				
				function clearInpt() {
					document.getElementById("input1").value = "";
				}
				
				
				
				setTimeout(clearInpt, 2000 );
		}
		
		
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(posX, posY, 4, 0, Math.PI * 2, false);
		ctx.fill();
		
		
		
	}, 5)
	
	
	//has started
	// -------------------------------------------------------
	
	var dd = new TreeObject(123, 243);
	var dd = new TreeObject(243, 123);
	var dd = new TreeObject(444, 123);
	var dd = new TreeObject(243, 372);
	// tree object
	
	function TreeObject(Xcoor, Ycoor) {
		var self = this;
		self.Xcoor = Xcoor;
		self.Ycoor = Ycoor;
		
		ctx.strokeStyle = "rgb(150, 76, 0)";
		ctx.lineWidth = "3";
		ctx.beginPath();
		ctx.moveTo(self.Xcoor, self.Ycoor);
		ctx.lineTo(self.Xcoor, self.Ycoor - 10);
		ctx.lineTo(self.Xcoor - 5, self.Ycoor - 15);
		ctx.moveTo(self.Xcoor, self.Ycoor - 10);
		ctx.lineTo(self.Xcoor - 3, self.Ycoor - 15);
		ctx.lineTo(self.Xcoor - 7, self.Ycoor - 18);
		ctx.moveTo(self.Xcoor, self.Ycoor - 10);
		ctx.lineTo(self.Xcoor + 2, self.Ycoor - 15);
		ctx.lineTo(self.Xcoor, self.Ycoor - 20);
		ctx.moveTo(self.Xcoor + 2, self.Ycoor - 15);
		ctx.lineTo(self.Xcoor + 5, self.Ycoor - 20);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(self.Xcoor + 2, self.Ycoor - 20);
		ctx.strokeStyle = "rgb(0, 102, 0)";
		ctx.arc(self.Xcoor + 2, self.Ycoor - 20, 2, 0, Math.PI * 2, false);
		ctx.arc(self.Xcoor + 4, self.Ycoor - 19, 2, 0, Math.PI * 2, false);
		ctx.arc(self.Xcoor - 3, self.Ycoor - 18, 2, 0, Math.PI * 2, false);
		ctx.stroke();
	}
	
	
	// ctx.strokeStyle = "brown";
	// ctx.lineWidth = "3";
	// ctx.beginPath();
	// ctx.moveTo(100, 100);
	// ctx.lineTo(100, 90);
	// ctx.lineTo(95, 85);
	// ctx.moveTo(100, 90);
		// ctx.lineTo(97, 85);
		// ctx.lineTo(93, 82);
	// ctx.moveTo(100, 90);
	
	// ctx.lineTo(102, 85);
	// ctx.lineTo(100, 80);
	// ctx.moveTo(102, 85);
	
	// ctx.lineTo(105, 80);
	// ctx.stroke();
	// ctx.beginPath();
	// ctx.moveTo(102, 80);
	// ctx.strokeStyle = "green";
	// ctx.arc(102, 80, 2, 0, Math.PI * 2, false);
	// ctx.arc(104, 81, 2, 0, Math.PI * 2, false);
	// ctx.arc(97, 82, 2, 0, Math.PI * 2, false);
	// ctx.stroke();
	
	// -------------------------------------------------------
	
	var dd2 = new RockObject(222, 200);
	var dd2 = new RockObject(425, 432);
	
	function RockObject(Xcoor, Ycoor) {
		var self = this;
		self.Xcoor = Xcoor;
		self.Ycoor = Ycoor;
		
		ctx.fillStyle = "rgb(50, 50, 50)";
		ctx.strokeStyle = "rgb(50, 50, 50)";
		ctx.lineWidth = "2";
		ctx.beginPath();
		ctx.moveTo(self.Xcoor, self.Ycoor);
		ctx.lineTo(self.Xcoor, self.Ycoor - 5);
		ctx.lineTo(self.Xcoor + 5, self.Ycoor - 10);
		ctx.lineTo(self.Xcoor + 10, self.Ycoor - 10);
		ctx.lineTo(self.Xcoor + 20, self.Ycoor - 7);
		ctx.lineTo(self.Xcoor + 25, self.Ycoor);
		ctx.closePath();
		ctx.fill();
		
	}
	
	
	// // rock object
	// ctx.fillStyle = "rgb(25, 25, 25)";
	// ctx.strokeStyle = "rgb(25, 25, 25)";
	// ctx.lineWidth = "2";
	// ctx.beginPath();
	// ctx.moveTo(150, 150);
	// ctx.lineTo(150, 145);
	// ctx.lineTo(155, 140);
	// ctx.lineTo(160, 140);
	// ctx.lineTo(170, 143);
	// ctx.lineTo(175, 150);
	// ctx.closePath();
	// ctx.fill();
	
	// -------------------------------------------------------
	
	// SonarFence object
	var ff = new SonarFence(333, 300);
	
	function SonarFence(Xcoor, Ycoor) {
		var self = this;
		self.Xcoor = Xcoor;
		self.Ycoor = Ycoor;
		
		ctx.strokeStyle = "rgb(0, 0, 0)";
		ctx.lineWidth = "2";
		ctx.beginPath();
		ctx.moveTo(self.Xcoor, self.Ycoor);
		ctx.lineTo(self.Xcoor, self.Ycoor - 15);
		ctx.arc(self.Xcoor, self.Ycoor - 15, 2, 0, Math.PI * 2, false);
		ctx.stroke();
		ctx.moveTo(self.Xcoor + 50, self.Ycoor - 50);
		ctx.lineTo(self.Xcoor + 50, self.Ycoor - 65);
		ctx.arc(self.Xcoor + 50, self.Ycoor - 65, 2, 0, Math.PI * 2, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = "rgb(150, 150, 150)";
		ctx.moveTo(self.Xcoor + 50, self.Ycoor - 64);
		ctx.lineTo(self.Xcoor + 3, self.Ycoor - 18);
		ctx.stroke();
	}
	
	
	// ctx.strokeStyle = "black";
	// ctx.lineWidth = "2";
	// ctx.beginPath();
	// ctx.moveTo(200, 150);
	// ctx.lineTo(200, 135);
	// ctx.arc(200, 135, 2, 0, Math.PI * 2, false);
	// ctx.stroke();
	// ctx.moveTo(250, 100);
	// ctx.lineTo(250, 85);
	// ctx.arc(250, 85, 2, 0, Math.PI * 2, false);
	// ctx.stroke();
	// ctx.beginPath();
	// ctx.strokeStyle = "blue";
	// ctx.moveTo(250, 86);
	// ctx.lineTo(203, 132);
	
	// ctx.stroke();
	
	// ctx.lineTo(160, 140);
	


// -------------------------------------------------------
	
	var ghhgj = new PersonObject(44, 111)
	var ghhgj = new PersonObject(85, 222)
	var ghhgj = new PersonObject(212, 332)
	
	function PersonObject(Xcoor, Ycoor) {
		var self = this;
		self.Xcoor = Xcoor;
		self.Ycoor = Ycoor;
		
		ctx.strokeStyle = "rgb(100, 100, 100)";
		ctx.lineWidth = "2";
		ctx.beginPath();
		ctx.moveTo(self.Xcoor, self.Ycoor);
		ctx.lineTo(self.Xcoor + 5, self.Ycoor - 10);
		ctx.lineTo(self.Xcoor + 10, self.Ycoor);
		ctx.moveTo(self.Xcoor + 5, self.Ycoor - 10);
		ctx.lineTo(self.Xcoor + 5, self.Ycoor - 20);
		ctx.moveTo(self.Xcoor + 5, self.Ycoor - 18);
		ctx.lineTo(self.Xcoor + 1, self.Ycoor - 12);
		ctx.moveTo(self.Xcoor + 5, self.Ycoor - 18);
		ctx.lineTo(self.Xcoor + 10, self.Ycoor - 12);
		ctx.moveTo(self.Xcoor + 5, self.Ycoor - 20);
		ctx.arc(self.Xcoor + 5, self.Ycoor - 20, 2, 0, Math.PI * 2, false);
		ctx.stroke();
	}
	
	
	// Person object
	
	// ctx.strokeStyle = "#D2D8DE";
	// ctx.lineWidth = "2";
	// ctx.beginPath();
	// ctx.moveTo(300, 300);
	// ctx.lineTo(305, 290);
	// ctx.lineTo(310, 300);
	// ctx.moveTo(305, 290);
	// ctx.lineTo(305, 280);
	// ctx.moveTo(305, 282);
	// ctx.lineTo(301, 288);
	// ctx.moveTo(305, 282);
	// ctx.lineTo(310, 288);
	// ctx.moveTo(305, 280);
	// ctx.arc(305, 280, 2, 0, Math.PI * 2, false);
	
	// ctx.stroke();
	
	
	
	
	
	
	
	// Gold Object
	
	function RedTarget(Xcoor, Ycoor) {
		var self = this;
		self.Xcoor = Xcoor;
		self.Ycoor = Ycoor;
		
		ctx.fillStyle = "rgb(255, 0, 0)"
		ctx.fillRect(self.Xcoor, self.Ycoor, 15, 15);

	}
	
	
	function randomCoor() {
		
		var coord = parseInt((Math.random()  * 400) + 60);
		
		return coord;
		
	}
	
	
	
	
	
	
	
	
	
}
