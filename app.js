import {
  GRID_WIDTH,
  THE_TETROMINOES,
  UP_NEXT_TETROMINOES
} from './tetrominoes.js'

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayIndex = 0

  let nextRandom = 0
  let squares = [...document.querySelectorAll('.grid div')]
  let timerId
  let score = 0
  let currentPosition = 4
  let currentRotation = 0
  let random = Math.floor(Math.random() * THE_TETROMINOES.length)
  let current = THE_TETROMINOES[random][0]

  document.addEventListener('keydown', control)

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
      nextRandom = Math.floor(Math.random() * THE_TETROMINOES.length)
      random = nextRandom
      current = THE_TETROMINOES[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
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
    current = THE_TETROMINOES[random][currentRotation]
    draw()
  }

  // Display the shape in the mini-grid display
  function displayShape () {
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })
    UP_NEXT_TETROMINOES[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }

  // Add functionality to the button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * THE_TETROMINOES.length)
      displayShape()
    }
  })

  // Add score
  function addScore () {
    for (let i = 0; i < 199; i += GRID_WIDTH) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9
      ]

      if (row.every(index => squares[index].classList.contains('taken'))) {
        score += 10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
        })
        const squaresRemoved = squares.splice(i, GRID_WIDTH)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  // Game over
  function gameOver () {
    if (current.some(index =>
        squares[currentPosition + index].classList.contains('taken')
      )) {
      scoreDisplay.innerHTML = 'end'
      clearInterval(timerId)
      document.removeEventListener('keydown', control)
    }
  }
})
