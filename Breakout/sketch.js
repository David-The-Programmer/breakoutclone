// Width of the canvas
const CANVAS_WIDTH = 800;

// Height of the canvas
const CANVAS_HEIGHT = 400;

// Height of each block
const BLOCK_HEIGHT = 20;

// Width of each block
const BLOCK_WIDTH = 65;

// Diameter of the ball
const BALL_DIAMETER = 20;

// y coordinate of the first block
const Y_OF_BLOCK = 70;

// space between the block
const BLOCK_SPACE = 10;

// number of rows of blocks
const NUM_ROWS = 5;

// number of blocks in each row
const NUM_BLOCKS = 10;

// y of paddle
const Y_OF_PADDLE = CANVAS_HEIGHT * 0.9;

// width of the paddle
const PADDLE_WIDTH = BLOCK_WIDTH * 2;

// Height of the paddle
const PADDLE_HEIGHT = BLOCK_HEIGHT;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  // declares the blocks: where to draw them and what their dimension is
  for(let i = 0; i < NUM_ROWS; i++) {
    let xOfBlock = (CANVAS_WIDTH - (NUM_BLOCKS * (BLOCK_SPACE + BLOCK_WIDTH))) / 2;
    let yOfBlock = Y_OF_BLOCK + (i * (BLOCK_HEIGHT + BLOCK_SPACE));

    for(let j = 0; j < NUM_BLOCKS; j++) {
      block[index] = new Block(xOfBlock, yOfBlock, BLOCK_WIDTH, BLOCK_HEIGHT);
      xOfBlock += (BLOCK_WIDTH + BLOCK_SPACE);
      index++;
    }
  }

  paddle = new Paddle((CANVAS_WIDTH / 2) - (PADDLE_WIDTH / 2), Y_OF_PADDLE, PADDLE_WIDTH, PADDLE_HEIGHT);

  ball = new Ball((CANVAS_WIDTH / 2) - (BALL_DIAMETER / 2), Y_OF_PADDLE - BALL_DIAMETER
  , BALL_DIAMETER, BALL_DIAMETER);
}

function draw() {
  background(0);
  if(score == NUM_ROWS * NUM_BLOCKS) {
    textSize(20);
    fill(255);
    text("You Win", CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT * 0.7);
    noLoop();
  }
  drawingBlocks();
  paddle.draw();
  paddle.move();
  ball.draw();
  ball.move(xVelOfBall, yVelOfBall);
  collidedWithWall();
  checkCollideWithPaddle();
  checkCollidedWithBlock();
  displayScore();
  updateBallSpeed();

}

// function for drawing blocks onto the canvas
function drawingBlocks() {
  for(let i = block.length - 1; i >= 0; i--) {
    block[i].draw();
  }
}
// function for checking if ball collided with the wall
function collidedWithWall() {
  if(ball.x <= BALL_DIAMETER / 2 || ball.x >= CANVAS_WIDTH - (BALL_DIAMETER / 2)) {
    xVelOfBall = -xVelOfBall;
  } else if(ball.y <= BALL_DIAMETER / 2) {
    yVelOfBall = -yVelOfBall;
  } else if(ball.y >= CANVAS_HEIGHT - (BALL_DIAMETER / 2)) {
    textSize(20);
    fill(255);
    text("Game Over", CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT * 0.7);
    noLoop();
  }

}

// function for checking if ball collided with paddle
function checkCollideWithPaddle() {
  // if the ball hits the left side of the paddle, then reflect the ball to the left
    if(ball.x >= paddle.x && ball.x < paddle.x + paddle.width / 2) {
      if(ball.y + BALL_DIAMETER / 2 >= paddle.y) {
        if(xVelOfBall > 0) {
          xVelOfBall *= -1;
        }
        if(yVelOfBall > 0) {
          yVelOfBall *= -1;
        }

      }
      // if the ball hits the right side of the paddle, reflect the ball to the right
    } else if(ball.x > paddle.x + paddle.width / 2 && ball.x < paddle.x + paddle.width) {
      if(ball.y + BALL_DIAMETER / 2 >= paddle.y) {
        if(xVelOfBall < 0) {
          xVelOfBall *= -1;
        }
        if(yVelOfBall > 0) {
          yVelOfBall *= -1;
        }
      }
    }

}

// function for checking if ball collided with block
function checkCollidedWithBlock() {
  for(let i = block.length - 1; i >= 0; i--) {
    if(ball.x >= block[i].x && ball.x <= block[i].x + block[i].width) {
      if(ball.y >= block[i].y && ball.y <= block[i].y + block[i].height) {
        block.splice(i, 1);
        yVelOfBall *= -1;
        score++;
      }
    }
  }
}

// function for displaying the score
function displayScore() {
  textSize(20);
  fill(255);
  text(score, CANVAS_WIDTH / 2 - 10, CANVAS_HEIGHT * 0.1);
}

// function which updates the speed of the Ball
function updateBallSpeed() {
  if(frameCount % 300 == 0) {
    if(xVelOfBall < 0) {
      xVelOfBall --;
    } else if(xVelOfBall > 0) {
      xVelOfBall ++;
    }
    if(yVelOfBall < 0) {
      yVelOfBall--;
    } else if(yVelOfBall > 0) {
      yVelOfBall++;
    }
  }
}

// Ball object
let ball;

// block object
let block = [];

// paddle object
let paddle;

// index of each block
let index = 0;

// x velocity of the ball
let xVelOfBall = 2;

// y velocity of the ball
let yVelOfBall = -2;

// score of the player
let score = 0;

// Bugs to fix:
// Sound
// the direction which the ball should be reflected off the paddle dependent on which part of the paddle it hits(FIXED)
// score(FIXED)
// should end game when all blocks are gone(FIXED)
// speed of the ball should increase as the game progresses(FIXED)
