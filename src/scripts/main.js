'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

const cells = document.querySelectorAll('.field-cell');
const startButton = document.querySelector('.button');
const startMessage = document.querySelector('.message-start');
const loseMessage = document.querySelector('.message-lose');
const winMessage = document.querySelector('.message-win');
const gameScore = document.querySelector('.game-score');
const allMessages = document.querySelectorAll('.message');

const renderMessage = () => {
  const currentStatus = game.getStatus();

  allMessages.forEach((msg) => msg.classList.add('hidden'));

  if (currentStatus === 'idle') {
    startMessage.classList.remove('hidden');
  } else if (currentStatus === 'win') {
    winMessage.classList.remove('hidden');
  } else if (currentStatus === 'lose') {
    loseMessage.classList.remove('hidden');
  }
};

const render = () => {
  const state = game.getState().flat();

  cells.forEach((cell, index) => {
    const value = state[index];

    cell.textContent = value === 0 ? '' : value;
    cell.className = 'field-cell';

    if (value !== 0) {
      cell.classList.add(`field-cell--${value}`);
    }
  });

  gameScore.textContent = String(game.getScore());
};

startButton.addEventListener('click', () => {
  if (startButton.classList.contains('start')) {
    game.start();
    startButton.classList.remove('start');
    startButton.classList.add('restart');
    startButton.textContent = 'Restart';
  } else {
    game.restart();
    startButton.classList.remove('restart');
    startButton.classList.add('start');
    startButton.textContent = 'Start';
  }

  render();
  renderMessage();
});

document.addEventListener('keydown', (e) => {
  const moves = {
    ArrowLeft: () => game.moveLeft(),
    ArrowRight: () => game.moveRight(),
    ArrowUp: () => game.moveUp(),
    ArrowDown: () => game.moveDown(),
  };

  const move = moves[e.key];

  if (!move) {
    return;
  }

  e.preventDefault();
  move();

  render();
  renderMessage();
});
