const canvas = document.getElementById("game");
const gameContext = canvas.getContext("2d");

const gameGround = new Image();
gameGround.src = "img/game_ground.png";

const virusImg = new Image();
virusImg.src = "img/virus.png";

var box = 32;
var score = 0;

var virus = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box
};

var covidExterminator = [];
covidExterminator[0] = {
	x: 9 * box,
	y: 10 * box
};

document.addEventListener("keydown", direction);

var dir;

function direction(event){
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}
 
function eatTail(head, arr){
	for (var i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y){
			clearInterval(gameLoop)
		}
	}
}

function gameDraw(){
	gameContext.drawImage(gameGround, 0, 0);
    
    gameContext.drawImage(virusImg, virus.x, virus.y);

    for (var i = 0; i < covidExterminator.length; i++) {
    	gameContext.fillStyle = i == 0 ? "yellow" : "#CD5C5C";
        gameContext.fillRect(covidExterminator[i].x,covidExterminator[i].y, box, box);
    };

gameContext.fillStyle = "black";
gameContext.font = "50px Arial";
gameContext.fillText(score, box * 8.8, box * 2.7);

var covidExterminatorX = covidExterminator[0].x;
var covidExterminatorY = covidExterminator[0].y;

if(covidExterminatorX == virus.x && covidExterminatorY == virus.y){
	score++;
	virus = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box
    };
}
 else{
 	covidExterminator.pop();
}

if(covidExterminatorX < box || covidExterminatorX > box * 17 ||
covidExterminatorY < box * 3 || covidExterminatorY > box * 17  ){
	clearInterval(gameLoop);
}

if(dir == "left") covidExterminatorX -= box;
if(dir == "right") covidExterminatorX += box;
if(dir == "up") covidExterminatorY -= box;
if(dir == "down") covidExterminatorY += box;

var exterminatedVirus = {
	x: covidExterminatorX,
	y: covidExterminatorY
};

eatTail(exterminatedVirus, covidExterminator)

covidExterminator.unshift(exterminatedVirus)
};



var gameLoop = setInterval(gameDraw, 100);