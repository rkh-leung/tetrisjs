document.addEventListener('DOMContentLoaded', () => {
  const GRID = document.querySelector('.grid')
  const SCORE_DISPLAY = document.querySelector('#score')
  const START_BTN = document.querySelector('#start-button')
  const GRID_WIDTH = 10
  let squares = Array.from(document.querySelectorAll('.grid div'))

  // The Tetrominoes
  const lTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
  ]

  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
  ]

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
  ]

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
  ]

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino
  ]

  let currentPosition = 4
  let currentRotation = 0
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][0]

  // Draw the tetromino
  function draw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  // Undraw the tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  // Make the tetromino move down every single
  timerId = setInterval(moveDown, 1000)

  // Move down function
  function moveDown() {
    undraw()
    currentPosition += GRID_WIDTH
    draw()
  }
})
