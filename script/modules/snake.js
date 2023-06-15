import {
  boardAr,
  mappedBoardAr,
  endGame,
  setPlayerScore,
  playerScore,
} from '../main.js';
import { removeMouse, placeMouse, generateMouseIndexes } from './mouse.js';

const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

let hasEaten = false;
let direction = RIGHT;
let previousDirection = RIGHT;

let length = 4;

function setInitialLength() {
  length = 4;
}

function setInitialDirection() {
  direction = RIGHT;
  previousDirection = RIGHT;
}

function setDirection(e) {
  direction =
    e.key === 'ArrowRight'
      ? RIGHT
      : e.key === 'ArrowLeft'
      ? LEFT
      : e.key === 'ArrowUp'
      ? UP
      : e.key === 'ArrowDown'
      ? DOWN
      : direction;

  if (
    (previousDirection === DOWN && direction === UP) ||
    (previousDirection === UP && direction === DOWN) ||
    (previousDirection === LEFT && direction === RIGHT) ||
    (previousDirection === RIGHT && direction === LEFT)
  ) {
    direction = previousDirection;
  }
}

function paintSnake() {
  for (let i = 0; i < boardAr.length; i++) {
    for (let j = 0; j < boardAr[i].length; j++) {
      //if you want to have a different color for the snake's head, uncomment the following line, and comment the line coming after it
      // mappedBoardAr[i][j].classList.remove('game-area__area-tile--snake', 'game-area__area-tile--snake--begin');
      mappedBoardAr[i][j].classList.remove('game-area__area-tile--snake');
    }
  }

  for (let i = 0; i < boardAr.length; i++) {
    for (let j = 0; j < boardAr[i].length; j++) {
      if (boardAr[i][j] !== 0 && boardAr[i][j] !== 'x') {
        mappedBoardAr[i][j].classList.add('game-area__area-tile--snake');
        //if you want to have a different color for the snake's head, uncomment the following line
        // if(boardAr[i][j] === 1){ mappedBoardAr[i][j].classList.add('game-area__area-tile--snake--begin');}
      }
    }
  }
}

function moveSnake() {
  //checks if we can move in general
  if (hasCrashed()) {
    endGame();
    return;
  }

  //if we ate the rat         - moves differently than if we didn't
  if (checkHasEaten()) {
    moveEat();
    hasEaten = true;
  }
  //if we didn't eat the rat
  else {
    moveNoEat();
  }

  previousDirection =
    direction === UP
      ? UP
      : direction === DOWN
      ? DOWN
      : direction === RIGHT
      ? RIGHT
      : LEFT;

  //if we ate the rat - add points and redeploy the mouse
  if (hasEaten) {
    removeMouse();
    placeMouse(...generateMouseIndexes());
    setPlayerScore(playerScore + 1);
    hasEaten = false;
  }

  paintSnake();
}

function checkHasEaten() {
  for (let i = 0; i < boardAr.length; i++) {
    for (let j = 0; j < boardAr[i].length; j++) {
      if (
        direction === RIGHT &&
        boardAr[i][j] === 1 &&
        boardAr[i][j + 1] === 'x'
      )
        return true;
      else if (
        direction === LEFT &&
        boardAr[i][j] === 1 &&
        boardAr[i][j - 1] === 'x'
      )
        return true;
      else if (
        direction === DOWN &&
        boardAr[i][j] === 1 &&
        boardAr[i + 1][j] === 'x'
      )
        return true;
      else if (
        direction === UP &&
        boardAr[i][j] === 1 &&
        boardAr[i - 1][j] === 'x'
      )
        return true;
    }
  }
  return false;
}

function hasCrashed() {
  console.log(length);
  for (let i = 0; i < boardAr.length; i++) {
    for (let j = 0; j < boardAr[i].length; j++) {
      if (boardAr[i][j] === 1) {
        let ii = direction === UP ? i - 1 : direction === DOWN ? i + 1 : i;
        let jj = direction === LEFT ? j - 1 : direction === RIGHT ? j + 1 : j;
        let arrayEnd =
          direction === LEFT || direction === UP
            ? 0
            : direction === DOWN
            ? boardAr.length - 1
            : j === boardAr[i].length - 1;
        if (
          i === arrayEnd ||
          (boardAr[ii][jj] !== 0 &&
            boardAr[ii][jj] !== length &&
            boardAr[ii][jj] !== 'x')
        )
          return true;
      }
    }
  }
  return false;
}

function moveEat() {
  for (let i = 0; i < boardAr.length; i++) {
    for (let j = 0; j < boardAr[i].length; j++) {
      if (boardAr[i][j] !== 0) {
        if (boardAr[i][j] === 1) {
          let jj = direction === LEFT ? j - 1 : direction === RIGHT ? j + 1 : j;
          let ii = direction === UP ? i - 1 : direction === DOWN ? i + 1 : i;
          boardAr[ii][jj] = -1;
        } else if (boardAr[i][j] !== -1) {
          boardAr[i][j] = boardAr[i][j] + 1;
        }
      }
    }
  }

  for (let i = 0; i < boardAr.length; i++) {
    for (let j = 0; j < boardAr[i].length; j++) {
      if (boardAr[i][j] === -1) {
        boardAr[i][j] = 1;
      } else if (boardAr[i][j] === 1) {
        boardAr[i][j] = 2;
      }
    }
  }
  length++;
}

function moveNoEat() {
  for (let i = 0; i < boardAr.length; i++) {
    for (let j = 0; j < boardAr[i].length; j++) {
      if (boardAr[i][j] !== 0) {
        let jj = direction === LEFT ? j - 1 : direction === RIGHT ? j + 1 : j;
        let ii = direction === UP ? i - 1 : direction === DOWN ? i + 1 : i;

        if (boardAr[i][j] === length) {
          boardAr[i][j] = 0;
        } else if (boardAr[i][j] === 1) {
          if (boardAr[ii][jj] === 'x') {
            hasEaten = true;
          }
          boardAr[ii][jj] = -1;
          boardAr[i][j]++;
        } else {
          if (boardAr[i][j] !== -1 && boardAr[i][j] !== 'x') boardAr[i][j]++;
        }
      }
    }
  }

  for (let i = 0; i < boardAr.length; i++) {
    for (let j = 0; j < boardAr[i].length; j++) {
      if (boardAr[i][j] === -1) {
        boardAr[i][j] = 1;
      }
    }
  }
}

export {
  setInitialLength,
  setDirection,
  moveSnake,
  moveEat,
  moveNoEat,
  checkHasEaten,
  hasCrashed,
  paintSnake,
  RIGHT,
  LEFT,
  UP,
  DOWN,
  direction,
  previousDirection,
  setInitialDirection,
  length,
};
