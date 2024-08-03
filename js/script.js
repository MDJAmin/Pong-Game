"use strict";

// Get elements
const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const restartButton = document.getElementById("restartButton");
const playerOneScoreEl = document.getElementById("playerOneScore");
const playerTwoScoreEl = document.getElementById("playerTwoScore");

// Variables
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;
const paddleSpeed = 5;
const ballSpeed = 8;

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = ballSpeed;
let ballDY = ballSpeed;

let playerOneScore = 0;
let playerTwoScore = 0;
let isRunning = false;
let gameInterval;
let isReset = false;

const upArrowPressed = { player1: false, player2: false };
const downArrowPressed = { player1: false, player2: false };

// Event's for key's and btn
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);
restartButton.addEventListener("click", restartGame);

function keyDownHandler(e) {
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
}

function keyUpHandler(e) {
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
}

function movePaddles() {
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
}

function moveBall() {
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

  if (ballX - ballRadius < 0) {
    playerTwoScore++;
    updateScores("playerTwo");
    resetBall();
  } else if (ballX + ballRadius > canvas.width) {
    playerOneScore++;
    updateScores("playerOne");
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballDX = -ballDX;
}

function drawPaddles() {
  context.fillStyle = "#fff";
  context.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
  context.fillRect(
    canvas.width - paddleWidth,
    paddle2Y,
    paddleWidth,
    paddleHeight
  );
}

function drawBall() {
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "#fff";
  context.fill();
  context.closePath();
}

function draw() {
  if (isReset) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddles();
  drawBall();
  movePaddles();
  moveBall();
}

//Player's score

function updateScores(scoringPlayer) {
  playerOneScoreEl.textContent = `Player One: ${playerOneScore}`;
  playerTwoScoreEl.textContent = `Player Two: ${playerTwoScore}`;
  //set animation for scale to the player card score's
  if (scoringPlayer === "playerOne") {
    playerOneScoreEl.classList.add("scale-animate");
    setTimeout(() => {
      playerOneScoreEl.classList.remove("scale-animate");
    }, 500);
  } else if (scoringPlayer === "playerTwo") {
    playerTwoScoreEl.classList.add("scale-animate");
    setTimeout(() => {
      playerTwoScoreEl.classList.remove("scale-animate");
    }, 500);
  }
}

//button's functionality's
function startGame() {
  if (!isRunning) {
    gameInterval = setInterval(draw, 20);
    isRunning = true;
  }
}

function stopGame() {
  clearInterval(gameInterval);
  isRunning = false;
}

function restartGame() {
  stopGame();
  playerOneScore = 0;
  playerTwoScore = 0;
  updateScores();
  resetBall();
  paddle1Y = (canvas.height - paddleHeight) / 2;
  paddle2Y = (canvas.height - paddleHeight) / 2;
  context.clearRect(0, 0, canvas.width, canvas.height);
}
