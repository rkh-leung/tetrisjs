document.addEventListener("DOMContentLoaded", () => {
  const GRID = document.querySelector('grid');
  const SCORE_DISPLAY = document.querySelector('#score')
  const START_BTN = document.querySelector('#start-button')
  const WIDTH = 10;
  let squares = Array.from(document.querySelectorAll('grid div'))

  // The Tetrominoes
  const lTetromino = [
      [1, WIDTH+1, WIDTH*2+1, 2],
      [WIDTH, WIDTH+1, WIDTH+2, WIDTH*2+2],
      [1, WIDTH+1, WIDTH*2+1, WIDTH*2],
      [WIDTH, WIDTH*2, WIDTH*2+1, WIDTH*2+2]
  ]
});
