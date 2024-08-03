"use strict";

// Get elements
const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

// Variables
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;
const paddleSpeed = 5;
const ballSpeed = 4;

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = ballSpeed;
let ballDY = ballSpeed;

const upArrowPressed = { player1: false, player2: false };
const downArrowPressed = { player1: false, player2: false };

// Event's for key's
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

keyDownHandler = (e) => {
  switch (e.key) {
    case "w":
      upArrowPressed.player1 = true;
      break;
    case "s":
      downArrowPressed.player1 = true;
      break;
    case "ArrowUp":
      upArrowPressed.player2 = true;
      break;
    case "ArrowDown":
      downArrowPressed.player2 = true;
      break;
  }
};

keyUpHandler = (e) => {
  switch (e.key) {
    case "w":
      upArrowPressed.player1 = false;
      break;
    case "s":
      downArrowPressed.player1 = false;
      break;
    case "ArrowUp":
      upArrowPressed.player2 = false;
      break;
    case "ArrowDown":
      downArrowPressed.player2 = false;
      break;
  }
};

movePaddles = () => {
  if (upArrowPressed.player1 && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  }
  if (downArrowPressed.player1 && paddle1Y < canvas.height - paddleHeight) {
    paddle1Y += paddleSpeed;
  }
  if (upArrowPressed.player2 && paddle2Y > 0) {
    paddle2Y -= paddleSpeed;
  }
  if (downArrowPressed.player2 && paddle2Y < canvas.height - paddleHeight) {
    paddle2Y += paddleSpeed;
  }
};

moveBall = () => {
  ballX += ballDX;
  ballY += ballDY;

  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballDY = -ballDY;
  }

  if (
    ballX - ballRadius < paddleWidth &&
    ballY > paddle1Y &&
    ballY < paddle1Y + paddleHeight
  ) {
    ballDX = -ballDX;
  } else if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > paddle2Y &&
    ballY < paddle2Y + paddleHeight
  ) {
    ballDX = -ballDX;
  }

  if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
    resetBall();
  }
};

resetBall = () => {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballDX = -ballDX;
};

drawPaddles = () => {
  context.fillStyle = "#fff";
  context.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
  context.fillRect(
    canvas.width - paddleWidth,
    paddle2Y,
    paddleWidth,
    paddleHeight
  );
};

drawBall = () => {
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "#fff";
  context.fill();
  context.closePath();
};

draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddles();
  drawBall();
  movePaddles();
  moveBall();
};

setInterval(draw, 10);
