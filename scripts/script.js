var snakeController = (function () {
	
	var ctx;
	var arrGrid = new Array(100);
	
	// setting grid borders-------
	for (var i = 0; i < 100; i++) {
		arrGrid[i] = new Array(100);
		
		arrGrid[i][0] = 1;
		arrGrid[i][99] = 1;
		
		if ((i == 0) || (i == 99)) {
			for (var j = 0; j < 100; j++) {
				arrGrid[i][j] = 1;
			}
		}
	};
	
	var directionHead = 'right';
	var hasChangedDir = false;
	
	var tailDirections = ['right'];
	
	var score = 0;
	var highScore = 0;
	var hasEaten = false;
	
	var foodObject;
	
	var movementSnake;
	// ---------------------------------------------------------------BUILD--------------
	
	
	
	function buildGame(container) {
		
		var cont = document.querySelector('#' + container);
		
		cont.innerHTML = '<canvas width = "500px" height = "500px">///The browser does not support Canvas///</canvas>' +
		'<div id="userInfo" >'
		+ '<span style="font-size: 20px; color: green">Score</span>'
		+ '<div style="margin-left: 5px; font-size: 20px; color: red; display: inline" id = "snakeScore">0</div>'
		+ '<span style="margin-left: 5px; font-size: 20px; color: green; display: inline">High Score</span>'
		+ '<div style="margin-left: 5px; margin-right: 5px; font-size: 20px; color: red; display: inline" id = "snakeHighScore">0</div>'
	    + '<textarea style="display:inline; font-size: 20px; text-align: center; padding-top: 5px" name="snakeInformation" id="snakeInfo" cols="12" rows="1"></textarea>'
	    + '<button style = "margin-left: 5px" id = "snakeStart">Start</button></div>';
		
		var canvas = document.querySelector('#' + container + ' canvas');
		ctx = canvas.getContext("2d");
		
		ctx.fillStyle = "rgb(224, 224, 224)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "black";
		ctx.lineWidth = "3";
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
		
		
		document.addEventListener('keydown', handleEvt, false);
		
		function handleEvt(evt){
		
			switch (evt.keyCode) {
				case 65: 
					directionHead = 'left';
					tailDirections.unshift(directionHead);
					hasChangedDir = true;
					break;
				case 87: 
					directionHead = 'up';
					tailDirections.unshift(directionHead);
					hasChangedDir = true;
					break;
				case 68: 
					directionHead = 'right';
					tailDirections.unshift(directionHead);
					hasChangedDir = true;
					break;
				case 83: 
					directionHead = 'down';
					tailDirections.unshift(directionHead);
					hasChangedDir = true;
					break;
			}
			
		}
		
		
		getTree();
		getPerson();
		getTree();
		getPerson();
		getTree();
		getPerson();
		getTree();
		getTree();
		getRock();
		getRock();
		getSonarFence();
		
		getFood();
		
		if (localStorage.storageSnake) {
			highScore = parseInt(localStorage.storageSnake);
			document.getElementById("snakeHighScore").innerHTML = highScore;
			console.log(highScore);
		}

	}
	
	
	// SNAKEHEAD-----------------------------------------------------------------
	
	
	function SnakeHead(Xcoor, Ycoor) {
		this.Xcoor = Xcoor;
		this.Ycoor = Ycoor;
		this.ctx = ctx;
		this.direction = directionHead;
	}
	
	SnakeHead.prototype = {
		
		build: function () {
			this.direction = directionHead;
			this.ctx.fillStyle = "rgb(0, 0, 0)";
			this.ctx.beginPath();
			this.ctx.arc(this.Xcoor,this.Ycoor,3,0,2*Math.PI);
			this.ctx.fill();
			
			
			
		},
		
		moveLeft: function () {
			this.Xcoor -= 5;
			this.build();
		},
		
		moveRight: function () {
			this.Xcoor += 5;
			this.build();
		},
		
		moveUp: function () {
			this.Ycoor -= 5;
			this.build();
		},
		
		moveDown: function () {
			this.Ycoor += 5;
			this.build();
		}
	}
	
	
	// ------------------// SNAKE_TAIL, INHERITS FROM SNAKE_HEAD-----------------------------
	
	
	
	function SnakeTail(Xcoor, Ycoor) {
		SnakeHead.call(this, Xcoor, Ycoor);
		
	}
	
	SnakeTail.prototype = Object.create(SnakeHead.prototype);
	
	SnakeTail.prototype.constructor = SnakeTail;
	
	SnakeTail.prototype.build = function () {
		this.direction = tailDirections[tailDirections.length - 1];
		this.ctx.fillStyle = "rgb(224, 224, 224)";
		this.ctx.beginPath();
		this.ctx.arc(this.Xcoor,this.Ycoor,4,0,2*Math.PI);
		this.ctx.fill();
		
		
		
	}
	
	
	
	
	
	// OBJECTS------------------------------------------------------------------------
	
	// defining tree object with properties and methods-----------------------
	
	function Tree(ctx, Xcoor, Ycoor) {
		this.ctx = ctx;
		this.Xcoor = Xcoor;
		this.Ycoor = Ycoor;
	}
	
	Tree.prototype = {
		
		build: function () {
			
			ctx.strokeStyle = "rgb(150, 76, 0)";
			ctx.lineWidth = "3";
			ctx.beginPath();
			ctx.moveTo(this.Xcoor, this.Ycoor);
			ctx.lineTo(this.Xcoor, this.Ycoor - 10);
			ctx.lineTo(this.Xcoor - 5, this.Ycoor - 15);
			ctx.moveTo(this.Xcoor, this.Ycoor - 10);
			ctx.lineTo(this.Xcoor - 3, this.Ycoor - 15);
			ctx.lineTo(this.Xcoor - 7, this.Ycoor - 18);
			ctx.moveTo(this.Xcoor, this.Ycoor - 10);
			ctx.lineTo(this.Xcoor + 2, this.Ycoor - 15);
			ctx.lineTo(this.Xcoor, this.Ycoor - 20);
			ctx.moveTo(this.Xcoor + 2, this.Ycoor - 15);
			ctx.lineTo(this.Xcoor + 5, this.Ycoor - 20);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.Xcoor + 2, this.Ycoor - 20);
			ctx.strokeStyle = "rgb(0, 102, 0)";
			ctx.arc(this.Xcoor + 2, this.Ycoor - 20, 2, 0, Math.PI * 2, false);
			ctx.arc(this.Xcoor + 4, this.Ycoor - 19, 2, 0, Math.PI * 2, false);
			ctx.arc(this.Xcoor - 3, this.Ycoor - 18, 2, 0, Math.PI * 2, false);
			ctx.stroke();
			
			// grid position
			
			arrGrid[(this.Ycoor - 5)/5][this.Xcoor/5] = 1;
			arrGrid[(this.Ycoor - 10)/5][this.Xcoor/5] = 1;
			arrGrid[(this.Ycoor - 15)/5][this.Xcoor/5] = 1;
			arrGrid[(this.Ycoor - 20)/5][this.Xcoor/5] = 1;
			arrGrid[(this.Ycoor - 15)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 15)/5][(this.Xcoor - 5)/5] = 1;
			arrGrid[(this.Ycoor - 20)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 20)/5][(this.Xcoor - 5)/5] = 1;
		}
	}
	
	// defining rock object with properties and methods
	
	function Rock(ctx, Xcoor, Ycoor) {
		this.ctx = ctx;
		this.Xcoor = Xcoor;
		this.Ycoor = Ycoor;
	}
	
	Rock.prototype = {
	
		build: function () {
			
			ctx.fillStyle = "rgb(50, 50, 50)";
			ctx.strokeStyle = "rgb(50, 50, 50)";
			ctx.lineWidth = "2";
			ctx.beginPath();
			ctx.moveTo(this.Xcoor, this.Ycoor);
			ctx.lineTo(this.Xcoor, this.Ycoor - 5);
			ctx.lineTo(this.Xcoor + 5, this.Ycoor - 10);
			ctx.lineTo(this.Xcoor + 10, this.Ycoor - 10);
			ctx.lineTo(this.Xcoor + 20, this.Ycoor - 7);
			ctx.lineTo(this.Xcoor + 25, this.Ycoor);
			ctx.closePath();
			ctx.fill();
			
			// grid position
			
			arrGrid[(this.Ycoor - 5)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 5)/5][(this.Xcoor + 10)/5] = 1;
			arrGrid[(this.Ycoor - 5)/5][(this.Xcoor + 15)/5] = 1;
			arrGrid[(this.Ycoor - 5)/5][(this.Xcoor + 20)/5] = 1;
			arrGrid[(this.Ycoor - 5)/5][(this.Xcoor + 25)/5] = 1;
			arrGrid[(this.Ycoor - 10)/5][(this.Xcoor + 10)/5] = 1;
			arrGrid[(this.Ycoor - 10)/5][(this.Xcoor + 15)/5] = 1;
			arrGrid[(this.Ycoor - 10)/5][(this.Xcoor + 20)/5] = 1;
		}
		
	}
	
	// defining sonar fence object with properties and methods
	
	function SonarFence(ctx, Xcoor, Ycoor) {
		this.ctx = ctx;
		this.Xcoor = Xcoor;
		this.Ycoor = Ycoor;
	}
	
	SonarFence.prototype = {
		
		build: function () {
			ctx.strokeStyle = "rgb(0, 0, 0)";
			ctx.lineWidth = "2";
			ctx.beginPath();
			ctx.moveTo(this.Xcoor, this.Ycoor);
			ctx.lineTo(this.Xcoor, this.Ycoor - 15);
			ctx.arc(this.Xcoor, this.Ycoor - 15, 2, 0, Math.PI * 2, false);
			ctx.stroke();
			ctx.moveTo(this.Xcoor + 50, this.Ycoor - 50);
			ctx.lineTo(this.Xcoor + 50, this.Ycoor - 65);
			ctx.arc(this.Xcoor + 50, this.Ycoor - 65, 2, 0, Math.PI * 2, false);
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "rgb(150, 150, 150)";
			ctx.moveTo(this.Xcoor + 50, this.Ycoor - 64);
			ctx.lineTo(this.Xcoor + 3, this.Ycoor - 18);
			ctx.stroke();
			
			// grid position--
			
			arrGrid[(this.Ycoor - 5)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 10)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 15)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 20)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 25)/5][(this.Xcoor + 10)/5] = 1;
			arrGrid[(this.Ycoor - 30)/5][(this.Xcoor + 15)/5] = 1;
			arrGrid[(this.Ycoor - 35)/5][(this.Xcoor + 20)/5] = 1;
			arrGrid[(this.Ycoor - 40)/5][(this.Xcoor + 25)/5] = 1;
			arrGrid[(this.Ycoor - 45)/5][(this.Xcoor + 30)/5] = 1;
			arrGrid[(this.Ycoor - 50)/5][(this.Xcoor + 35)/5] = 1;
			arrGrid[(this.Ycoor - 55)/5][(this.Xcoor + 40)/5] = 1;
			arrGrid[(this.Ycoor - 60)/5][(this.Xcoor + 45)/5] = 1;
			arrGrid[(this.Ycoor - 65)/5][(this.Xcoor + 50)/5] = 1;
			arrGrid[(this.Ycoor - 70)/5][(this.Xcoor + 55)/5] = 1;
			arrGrid[(this.Ycoor - 65)/5][(this.Xcoor + 55)/5] = 1;
			arrGrid[(this.Ycoor - 60)/5][(this.Xcoor + 55)/5] = 1;
			arrGrid[(this.Ycoor - 55)/5][(this.Xcoor + 55)/5] = 1;
			arrGrid[(this.Ycoor - 50)/5][(this.Xcoor + 55)/5] = 1;
		}
			
	}
	
	// defining person object with properties and methods
	
	function Person(ctx, Xcoor, Ycoor) {
		this.ctx = ctx;
		this.Xcoor = Xcoor;
		this.Ycoor = Ycoor;
	}
	
	Person.prototype = {
		
		build: function () {
			ctx.strokeStyle = "rgb(100, 100, 100)";
			ctx.lineWidth = "2";
			ctx.beginPath();
			ctx.moveTo(this.Xcoor, this.Ycoor);
			ctx.lineTo(this.Xcoor + 5, this.Ycoor - 10);
			ctx.lineTo(this.Xcoor + 10, this.Ycoor);
			ctx.moveTo(this.Xcoor + 5, this.Ycoor - 10);
			ctx.lineTo(this.Xcoor + 5, this.Ycoor - 20);
			ctx.moveTo(this.Xcoor + 5, this.Ycoor - 18);
			ctx.lineTo(this.Xcoor + 1, this.Ycoor - 12);
			ctx.moveTo(this.Xcoor + 5, this.Ycoor - 18);
			ctx.lineTo(this.Xcoor + 10, this.Ycoor - 12);
			ctx.moveTo(this.Xcoor + 5, this.Ycoor - 20);
			ctx.arc(this.Xcoor + 5, this.Ycoor - 20, 2, 0, Math.PI * 2, false);
			ctx.stroke();
			
			// grid position---
			
			arrGrid[(this.Ycoor - 5)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 5)/5][(this.Xcoor + 10)/5] = 1;
			arrGrid[(this.Ycoor - 10)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 10)/5][(this.Xcoor + 10)/5] = 1;
			arrGrid[(this.Ycoor - 15)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 15)/5][(this.Xcoor + 10)/5] = 1;
			arrGrid[(this.Ycoor - 20)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 20)/5][(this.Xcoor + 10)/5] = 1;
			arrGrid[(this.Ycoor - 25)/5][(this.Xcoor + 5)/5] = 1;
			arrGrid[(this.Ycoor - 25)/5][(this.Xcoor + 10)/5] = 1;
			
		}
		
	}
	
	// defining food object with properties and methods
	
	function Food(ctx, Xcoor, Ycoor) {
		this.ctx = ctx;
		this.Xcoor = Xcoor;
		this.Ycoor = Ycoor;
	}
	
	Food.prototype = {
		
		build: function () {
			ctx.fillStyle = "rgb(255, 0, 0)"
			ctx.fillRect(this.Xcoor, this.Ycoor, 10, 10);
			
			// grid position
			arrGrid[(this.Ycoor)/5][(this.Xcoor)/5] = 5;
			arrGrid[(this.Ycoor)/5][(this.Xcoor + 5)/5] = 5;
			arrGrid[(this.Ycoor)/5][(this.Xcoor + 10)/5] = 5;
			arrGrid[(this.Ycoor)/5][(this.Xcoor + 15)/5] = 5;
			arrGrid[(this.Ycoor + 5)/5][(this.Xcoor)/5] = 5;
			arrGrid[(this.Ycoor + 5)/5][(this.Xcoor + 5)/5] = 5;
			arrGrid[(this.Ycoor + 5)/5][(this.Xcoor + 10)/5] = 5;
			arrGrid[(this.Ycoor + 5)/5][(this.Xcoor + 15)/5] = 5;
			arrGrid[(this.Ycoor + 10)/5][(this.Xcoor)/5] = 5;
			arrGrid[(this.Ycoor + 10)/5][(this.Xcoor + 5)/5] = 5;
			arrGrid[(this.Ycoor + 10)/5][(this.Xcoor + 10)/5] = 5;
			arrGrid[(this.Ycoor + 10)/5][(this.Xcoor + 15)/5] = 5;
			arrGrid[(this.Ycoor + 15)/5][(this.Xcoor)/5] = 5;
			arrGrid[(this.Ycoor + 15)/5][(this.Xcoor + 5)/5] = 5;
			arrGrid[(this.Ycoor + 15)/5][(this.Xcoor + 10)/5] = 5;
			arrGrid[(this.Ycoor + 15)/5][(this.Xcoor + 15)/5] = 5;
		}, 
		
		changePosition: function() {
			arrGrid[(this.Ycoor)/5][(this.Xcoor)/5] = 0;
			arrGrid[(this.Ycoor)/5][(this.Xcoor + 5)/5] = 0;
			arrGrid[(this.Ycoor)/5][(this.Xcoor + 10)/5] = 0;
			arrGrid[(this.Ycoor)/5][(this.Xcoor + 15)/5] = 0;
			arrGrid[(this.Ycoor + 5)/5][(this.Xcoor)/5] = 0;
			arrGrid[(this.Ycoor + 5)/5][(this.Xcoor + 5)/5] = 0;
			arrGrid[(this.Ycoor + 5)/5][(this.Xcoor + 10)/5] = 0;
			arrGrid[(this.Ycoor + 5)/5][(this.Xcoor + 15)/5] = 0;
			arrGrid[(this.Ycoor + 10)/5][(this.Xcoor)/5] = 0;
			arrGrid[(this.Ycoor + 10)/5][(this.Xcoor + 5)/5] = 0;
			arrGrid[(this.Ycoor + 10)/5][(this.Xcoor + 10)/5] = 0;
			arrGrid[(this.Ycoor + 10)/5][(this.Xcoor + 15)/5] = 0;
			arrGrid[(this.Ycoor + 15)/5][(this.Xcoor)/5] = 0;
			arrGrid[(this.Ycoor + 15)/5][(this.Xcoor + 5)/5] = 0;
			arrGrid[(this.Ycoor + 15)/5][(this.Xcoor + 10)/5] = 0;
			arrGrid[(this.Ycoor + 15)/5][(this.Xcoor + 15)/5] = 0;
			
			ctx.fillStyle = "rgb(224, 224, 224)"
			ctx.fillRect(this.Xcoor, this.Ycoor, 10, 10);
			this.Xcoor = getRandomCoor();
			this.Ycoor = getRandomCoor();
			this.build();
		}
		
	}
	
	
	
	// SNAKE MOVEMENT-------------------------------------------------
	
	
	
	function startSnake(snakeTail, snakeHead) {
		
		movementSnake = setInterval(function () {
	
			if (hasChangedDir == true) {
				arrGrid[snakeHead.Ycoor/5][snakeHead.Xcoor/5] = 2;
				hasChangedDir = false;
			} else {
				arrGrid[snakeHead.Ycoor/5][snakeHead.Xcoor/5] = 1;
			};
			
			if (arrGrid[snakeTail.Ycoor/5][snakeTail.Xcoor/5] == 2) {
				tailDirections.pop();
			}
			
			arrGrid[snakeTail.Ycoor/5][snakeTail.Xcoor/5] = 0;
		
			switch (snakeTail.direction) {
				case 'left': 
					if (!hasEaten) {
						snakeTail.moveLeft();
					}
					hasEaten = false;
					break;
				case 'up': 
					if (!hasEaten) {
						snakeTail.moveUp();
					}
					hasEaten = false;
					break;
				case 'right': 
					if (!hasEaten) {
						snakeTail.moveRight();
					}
					hasEaten = false;
					break;
				case 'down': 
					if (!hasEaten) {
						snakeTail.moveDown();
					}
					hasEaten = false;
					break;
			};
			
			switch (snakeHead.direction) {
				case 'left': 
					if (arrGrid[snakeHead.Ycoor/5][(snakeHead.Xcoor - 5)/5] == 1) {
						clearInterval(movementSnake);
						document.getElementById("snakeInfo").value = "Game Over";
						if (score > highScore) {
							highScore = score;
							serializeHS(highScore);
							document.getElementById("snakeHighScore").innerHTML = highScore;
						}
						
					};
					if (arrGrid[snakeHead.Ycoor/5][(snakeHead.Xcoor - 5)/5] == 5) {
						foodObject.changePosition();
						hasEaten = true;
						score += 5;
						document.getElementById("snakeScore").innerHTML = score;
					};
					snakeHead.moveLeft();
					break;
				case 'up': 
					if (arrGrid[(snakeHead.Ycoor - 5)/5][snakeHead.Xcoor/5] == 1) {
						clearInterval(movementSnake);
						document.getElementById("snakeInfo").value = "Game Over";
						if (score > highScore) {
							highScore = score;
							serializeHS(highScore);
							document.getElementById("snakeHighScore").innerHTML = highScore;
						}
					};
					if (arrGrid[(snakeHead.Ycoor - 5)/5][snakeHead.Xcoor/5] == 5) {
						foodObject.changePosition();
						hasEaten = true;
						score += 5;
						document.getElementById("snakeScore").innerHTML = score;
					};
					snakeHead.moveUp();
					break;
				case 'right': 
					if (arrGrid[snakeHead.Ycoor/5][(snakeHead.Xcoor + 5)/5] == 1) {
						clearInterval(movementSnake);
						document.getElementById("snakeInfo").value = "Game Over";
						if (score > highScore) {
							highScore = score;
							serializeHS(highScore);
							document.getElementById("snakeHighScore").innerHTML = highScore;
						}
					};
					if (arrGrid[snakeHead.Ycoor/5][(snakeHead.Xcoor + 5)/5] == 5) {
						foodObject.changePosition();
						hasEaten = true;
						score += 5;
						document.getElementById("snakeScore").innerHTML = score;
					};
					snakeHead.moveRight() ;
					break;
				case 'down':
					if (arrGrid[(snakeHead.Ycoor + 5)/5][snakeHead.Xcoor/5] == 1) {
						clearInterval(movementSnake);
						document.getElementById("snakeInfo").value = "Game Over";
						if (score > highScore) {
							highScore = score;
							serializeHS(highScore);
							document.getElementById("snakeHighScore").innerHTML = highScore;
						}
						
					};
					if (arrGrid[(snakeHead.Ycoor + 5)/5][snakeHead.Xcoor/5] == 5) {
						foodObject.changePosition();
						hasEaten = true;
						score += 5;
						document.getElementById("snakeScore").innerHTML = score;
					};
					snakeHead.moveDown();
					break;
			}
					
					
					
		}, 30);
	}
	
	
	
	
	function getRandomCoor() {
		
		var coord = (parseInt(Math.random()  * 80))*5 + 60;
		return coord;
	}
	
	function serializeHS(score) {
		localStorage.setItem('storageSnake', score.toString());
	};
	
	
	
	
	
	// OBJECT CREATION METHODS-------------------------------------------------------
	
	
	
	function getTree() {
		var tree = new Tree(ctx, getRandomCoor(), getRandomCoor());
		return tree.build();
	}
	
	function getRock() {
		var rock = new Rock(ctx, getRandomCoor(), getRandomCoor());
		return rock.build();
	}
	
	function getSonarFence() {
		var sonar = new SonarFence(ctx, getRandomCoor(), getRandomCoor());
		return sonar.build();
	}
	
	function getPerson() {
		var person = new Person(ctx, getRandomCoor(), getRandomCoor());
		return person.build();
	}
	
	function getFood() {
		var food = new Food(ctx, getRandomCoor(), getRandomCoor());
		foodObject = food;
		return food.build();
	}
	
	function getSnakeHead(Xcoor, Ycoor) {
		var snakeHead = new SnakeHead(Xcoor, Ycoor);
		return snakeHead
	}
	
	function getSnakeTail(Xcoor, Ycoor) {
		var snakeTail = new SnakeTail(Xcoor, Ycoor);
		return snakeTail
	}
	
	return {
		buildGame: buildGame,
		getTree: getTree,
		getRock: getRock,
		getSonarFence: getSonarFence,
		getPerson: getPerson,
		getFood: getFood,
		getSnakeHead: getSnakeHead,
		getSnakeTail: getSnakeTail,
		startSnake: startSnake
	}
	
}());
