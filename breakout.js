let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let brickRows = 10,
 brickColumns = 6,
 brickWidth = 125,
 brickHeight = 25,
 brickPadding = 20,
 brickOffsetTop = 50,
 brickOffsetLeft = 75,
 x = canvas.width / 2,
 y = canvas.height - 62,
 dx = -2,
 dy = -3,
 ballRadius = 10,
 Score = 0;

paddleHeightAndWidth = {
	width: 250,
	height: 10,
},
	paddlePosition = {
		x: canvas.width / 2 - 125,
		y: 785 ,
	},
	keys = [];

let paddle = function () {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.fillStyle = "#e2e2e2";
	ctx.fillRect(paddlePosition.x, paddlePosition.y, paddleHeightAndWidth.width, paddleHeightAndWidth.height);
	// ctx.fillRect(paddlePosition.x, paddlePosition.y, paddleHeightAndWidth.width, paddleHeightAndWidth.height);
	ctx.fill();
	ctx.closePath();
};

let drawScore = function () {
	ctx.font = "26px 'Press Start 2P'";
	ctx.fillStyle = "#FA4A52";
	ctx.fillText("Score: "+Score, 375 , 40);
};

let ball = function() {
	ctx.beginPath();
	ctx.fillStyle = "#ccc";
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.closePath();
};

let drawGameOver = function () {
	ctx.font = "32px 'Press Start 2P'";
	ctx.fillStyle = "#FA4A52";
	ctx.fillText("Game Over, Your Score is:"+Score, 35, 525);
};

let drawRestart = function () {
	ctx.font = "32px 'Press Start 2P'";
	ctx.fillStyle = "#FA4A52";
	ctx.fillText("Game Over, Your Score is:"+Score, 35, 525);

};


let move = function () {
	if( keys[39] ) {
		paddlePosition.x += 11;

	}
	if( keys[37] ) {
		paddlePosition.x -= 11;
	}
};

let bricks = [];
for( let c = 0; c < brickColumns; c++ ) {
	bricks[c] = [];
	for( let r = 0; r < brickRows; r++ ) {
		bricks[c][r] = {x: 0, y: 0, status : 1 };
	}
}

function drawBricks() {
	for( let c = 0; c < brickColumns; c++ ) {
		for( let r = 0; r < brickRows; r++ ) {
			if (bricks[c][r].status === 1) {
				let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#818181";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function collisionDetection() {
	for( let c=0; c<brickColumns; c++ ) {
		for( let r=0; r<brickRows; r++ ) {
			let b = bricks[c][r];
			if( b.status === 1 ) {
				if( x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight ) {
					dy = -dy;
					b.status = 0;
					Score += 100;
				}
			}
		}
	}
}

document.body.addEventListener("keydown", function (paddleArrows) {
	keys[paddleArrows.keyCode] = true;
});
document.body.addEventListener("keyup", function (paddleArrows) {
	keys[paddleArrows.keyCode] = false;
});

function draw() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball();
	paddle();
	drawBricks();
	move();
	ball();
	collisionDetection();
	drawScore();


	if( x + dx > canvas.width-ballRadius || x + dx < ballRadius ) {
		dx = -dx;
	}
	if( y + dy < ballRadius) {
		dy = -dy;
	}

	else if( y + dy > canvas.height-ballRadius ) {
		if( x > paddlePosition.x && x < paddlePosition.x + paddleHeightAndWidth.width ) {
			dy = -dy;
		}
		else {
			drawGameOver();

			//
			pauze;
		}
	}

	x += dx;
	y += dy;

	window.requestAnimationFrame(draw);
}
draw();
