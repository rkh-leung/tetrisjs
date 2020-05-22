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
  let random = Math.floor(Math.random() * theTetrominoes.length)
  let current = theTetrominoes[random][0]

  // Draw the tetromino
  function draw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  // Undraw the tetromino
  function undraw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  // Make the tetromino move down every single
  timerId = setInterval(moveDown, 1000)

  // Assign functions to keycodes
  function control (e) {
    if (e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)

  // Move down function
  function moveDown () {
    undraw()
    currentPosition += GRID_WIDTH
    draw()
    freeze()
  }

  // Freeze function
  function freeze () {
    if (
      current.some(index =>
        squares[currentPosition + index + GRID_WIDTH].classList.contains(
          'taken'
        )
      )
    ) {
      current.forEach(index =>
        squares[currentPosition + index].classList.add('taken')
      )
      // Start a new tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }

  // Move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft () {
    undraw()
    const isAtLeftEdge = current.some(
      index => (currentPosition + index) % GRID_WIDTH === 0
    )

    if (!isAtLeftEdge) currentPosition -= 1
    if (
      current.some(index =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition += 1
    }
    draw()
  }

  // Move the tetromino right, unless is at the edge or there is a blockage
  function moveRight () {
    undraw()
    const isAtRightEdge = current.some(
      index => (currentPosition + index) % GRID_WIDTH === GRID_WIDTH - 1
    )

    if (!isAtRightEdge) currentPosition += 1
    if (
      current.some(index =>
        squares[currentPosition + index].classList.contains('taken')
      )
    ) {
      currentPosition += 1
    }
    draw()
  }

  // Rotate the tetromino
  function rotate () {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }
})
