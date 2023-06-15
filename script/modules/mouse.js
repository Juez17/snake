import { boardAr, mappedBoardAr } from '../main.js';

function generateMouseIndexes() {
  let i;
  let j;
  let quit = false;

  while (!quit) {
    i = Math.trunc(Math.random() * 10);
    j = Math.trunc(Math.random() * 16);
    if (boardAr[i][j] === 0) quit = true;
  }
  return [i, j];
}

function placeMouse(i, j) {
  boardAr[i][j] = 'x';
  mappedBoardAr[i][j].classList.add('game-area__mouse');
}

function removeMouse() {
  for (let i = 0; i < boardAr.length; i++) {
    for (let j = 0; j < boardAr[i].length; j++) {
      mappedBoardAr[i][j].classList.remove('game-area__mouse');
    }
  }
}

export { generateMouseIndexes, placeMouse, removeMouse };
