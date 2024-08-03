"use strict";
// get El's
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// variable's
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;
const paddleSpeed = 5;
const ballSpeed = 4;

// ___________________________________

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = ballSpeed;
let ballDY = ballSpeed;

const upArrowPressed = { player1: false, player2: false };
const downArrowPressed = { player1: false, player2: false };


// document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);

// function keyDownHandler(e) {
//     if (e.key == 'w') upArrowPressed.player1 = true;
//     if (e.key == 's') downArrowPressed.player1 = true;
//     if (e.key == 'ArrowUp') upArrowPressed.player2 = true;
//     if (e.key == 'ArrowDown') downArrowPressed.player2 = true;
// }

