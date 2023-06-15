import {
  generateMouseIndexes,
  placeMouse,
  removeMouse,
} from './modules/mouse.js';
import {
  moveSnake,
  setInitialDirection,
  setDirection,
  paintSnake,
  setInitialLength,
} from './modules/snake.js';

const easyChoice = document.getElementById('easy-choice');
const mediumChoice = document.getElementById('medium-choice');
const hardChoice = document.getElementById('hard-choice');

const currentScore = document.querySelector('.game-section__score-points');
const newGameBtn = document.querySelector('.game-section__new-game-btn');
const gameArea = document.querySelector('.game-area');
const modalWindow = document.querySelector('.modal-window');

newGameBtn.addEventListener('click', restartGame);
document.addEventListener('keydown', setDirection);

let interval;

let playerScore = 0;
let speed = 100;

let boardAr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const mappedBoardAr = [[], [], [], [], [], [], [], [], [], []];

function createMappedArray() {
  let counter = 0;

  for (let i = 0; i < boardAr.length; i++) {
    for (let j = 0; j < boardAr[i].length; j++) {
      mappedBoardAr[i][j] = gameArea.children[counter];
      counter++;
    }
  }
}

function initGame() {
  createMappedArray();
  paintSnake();
  interval = setInterval(moveSnake, speed);
  newGameBtn.click();
}

function restartGame() {
  removeMouse();
  setPlayerScore(0);

  window.clearInterval(interval);
  speed = checkSelectedDifficulty();
  setInitialDirection();
  setInitialLength();

  boardAr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  placeMouse(...generateMouseIndexes());
  paintSnake();
  interval = setInterval(moveSnake, speed);
  modalWindow.classList.add('hidden');
}

function setPlayerScore(aPlayerScore) {
  playerScore = aPlayerScore;
  currentScore.textContent = playerScore;
}

function endGame() {
  window.clearInterval(interval);
  modalWindow.classList.remove('hidden');
  currentScore.textContent = playerScore;
}

function checkSelectedDifficulty() {
  return easyChoice.checked ? 800 : mediumChoice.checked ? 300 : 100;
}

initGame();

export { boardAr, mappedBoardAr, endGame, setPlayerScore, playerScore };
