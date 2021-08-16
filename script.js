const numberOfPlayers = 2
const row = 6
const col = 11
const rowsAndCols = row * col
const characters = ['.', '😃', '🎯']
var gameCellState = new Array(rowsAndCols + 1).fill(0)
var playerPosition = new Array(rowsAndCols + 1).fill(0)
var playerNumber = 1
var emojiNumberPerBox = []
const currentPlayers = ['😃', '🎯']


for (var i = 1; i < rowsAndCols + 1; i++) {
  const gameCell = document.createElement('div')
  document.getElementById('game-cells-container').appendChild(gameCell)
  gameCell.id = i
  gameCell.classList.add('btn', 'bg-base-300', 'game-btn')
  gameCell.setAttribute('onClick', 'gameCellClick(this)')
  gameCell.style.position = 'relative'

  if (i % row == 0) {
    var br = document.createElement('div')
    br.setAttribute('style', 'width: 100%')
    document.getElementById('game-cells-container').appendChild(br)
  }

  if (i == 1) gameCell.classList.add('cornerOne')
  else if (i == row) gameCell.classList.add('cornerTwo')
  else if (i == rowsAndCols - row + 1) gameCell.classList.add('cornerThree')
  else if (i == rowsAndCols) gameCell.classList.add('cornerFour')
  else if (i > 1 && i < row) gameCell.classList.add('sideTop')
  else if (i % row == 0 && i != row && i != rowsAndCols)
    gameCell.classList.add('sideRight')
  else if ((i - 1) % row == 0 && i != 1 && i != rowsAndCols - row + 1)
    gameCell.classList.add('sideLeft')
  else if (i > rowsAndCols - row + 1 && i < rowsAndCols)
    gameCell.classList.add('sideDown')
  else gameCell.classList.add('center')  
}

function gameCellClick(event) {
  chainReaction(event)
  chainReactionOutputAndGameOver()
}

function chainReaction(event) {
  const className = Array.from(event.classList).pop()
  const elementId = event.id
  if (
    playerPosition[elementId] == playerNumber ||
    playerPosition[elementId] == 0
  ) {
    function cornerOne(id) {
      var element = document.getElementById(id)
      var classes = Array.from(element.classList).pop()
      if (classes == 'cornerOne') {
        var dot = gameCellState[id] + 1
        gameCellState[id] = dot
        playerPosition[id] = playerNumber
        if (dot > 1) {
          dot = 0
          playerPosition[id] = 0
          gameCellState[id] = dot
          var t = 2
          var u = Number(id) + row

          sideTop(t)
          sideLeft(u)
        }
      }
    }

    function sideTop(id) {
      var element = document.getElementById(id)
      var classes = Array.from(element.classList).pop()
      if (classes == 'sideTop') {
        var dot = gameCellState[id] + 1
        gameCellState[id] = dot
        playerPosition[id] = playerNumber
        if (dot > 2) {
          dot = 0
          playerPosition[id] = 0
          gameCellState[id] = dot
          var t = Number(id) + 1
          var u = Number(id) - 1
          var v = Number(id) + row
          cornerOne(u)
          cornerTwo(t)
          sideTop(t)
          sideTop(u)
          center(v)
        }
      }
    }
    function cornerTwo(id) {
      var element = document.getElementById(id)
      var classes = Array.from(element.classList).pop()
      if (classes == 'cornerTwo') {
        var dot = gameCellState[id] + 1
        gameCellState[id] = dot
        playerPosition[id] = playerNumber
        if (dot > 1) {
          dot = 0
          playerPosition[id] = 0
          gameCellState[id] = dot
          var t = Number(id) - 1
          var u = Number(id) + row
          sideTop(t)
          sideRight(u)
        }
      }
    }
    function sideLeft(id) {
      var element = document.getElementById(id)
      var classes = Array.from(element.classList).pop()
      if (classes == 'sideLeft') {
        var dot = gameCellState[id] + 1
        gameCellState[id] = dot
        playerPosition[id] = playerNumber
        if (dot > 2) {
          dot = 0
          playerPosition[id] = 0
          gameCellState[id] = dot
          var t = Number(id) - row
          var u = Number(id) + row
          var v = Number(id) + 1
          cornerOne(t)
          sideLeft(u)
          sideLeft(t)
          center(v)
          cornerThree(u)
        }
      }
    }
    function center(id) {
      var element = document.getElementById(id)

      var classes = Array.from(element.classList).pop()
      if (classes == 'center') {
        var dot = gameCellState[id] + 1
        gameCellState[id] = dot
        playerPosition[id] = playerNumber
        if (dot > 3) {
          dot = 0
          playerPosition[id] = 0
          gameCellState[id] = dot
          var t = Number(id) - row
          var u = Number(id) + row
          var v = Number(id) + 1
          var w = Number(id) - 1
          sideLeft(w)
          center(t)
          center(u)
          center(v)
          center(w)
          sideTop(t)
          sideRight(v)
          sideDown(u)
        }
      }
    }
    function sideRight(id) {
      var element = document.getElementById(id)
      var classes = Array.from(element.classList).pop()
      if (classes == 'sideRight') {
        var dot = gameCellState[id] + 1
        gameCellState[id] = dot
        playerPosition[id] = playerNumber
        if (dot > 2) {
          dot = 0
          playerPosition[id] = 0
          gameCellState[id] = dot
          var t = Number(id) - row
          var u = Number(id) + row
          var v = Number(id) - 1
          cornerTwo(t)
          cornerFour(u)
          center(v)
          sideRight(t)
          sideRight(u)
        }
      }
    }
    function cornerThree(id) {
      var element = document.getElementById(id)
      var classes = Array.from(element.classList).pop()
      if (classes == 'cornerThree') {
        var dot = gameCellState[id] + 1
        gameCellState[id] = dot
        playerPosition[id] = playerNumber
        if (dot > 1) {
          dot = 0
          playerPosition[id] = 0
          gameCellState[id] = dot
          var t = Number(id) + 1
          var u = Number(id) - row
          sideDown(t)
          sideLeft(u)
        }
      }
    }
    function sideDown(id) {
      var element = document.getElementById(id)
      var classes = Array.from(element.classList).pop()
      if (classes == 'sideDown') {
        var dot = gameCellState[id] + 1
        gameCellState[id] = dot
        playerPosition[id] = playerNumber
        if (dot > 2) {
          dot = 0
          playerPosition[id] = 0
          gameCellState[id] = dot
          var t = Number(id) - row
          var u = Number(id) + 1
          var v = Number(id) - 1
          cornerThree(v)
          cornerFour(u)
          sideDown(u)
          sideDown(v)
          center(t)
        }
      }
    }
    function cornerFour(id) {
      var element = document.getElementById(id)
      var classes = Array.from(element.classList).pop()
      if (classes == 'cornerFour') {
        var dot = gameCellState[id] + 1
        gameCellState[id] = dot
        playerPosition[id] = playerNumber
        if (dot > 1) {
          dot = 0
          playerPosition[id] = 0
          gameCellState[id] = dot
          var t = Number(id) - 1
          var u = Number(id) - row
          sideDown(t)
          sideRight(u)
        }
      }
    }

    //calling the functions
    if (className == 'cornerOne') cornerOne(elementId)
    if (className == 'cornerTwo') cornerTwo(elementId)
    if (className == 'cornerThree') cornerThree(elementId)
    if (className == 'cornerFour') cornerFour(elementId)
    if (className == 'sideTop') sideTop(elementId)
    if (className == 'sideLeft') sideLeft(elementId)
    if (className == 'sideRight') sideRight(elementId)
    if (className == 'sideDown') sideDown(elementId)
    if (className == 'center') center(elementId)

    // for (var j = 1; j <= rowsAndCols; j++) {
    //   document.getElementById(j).innerHTML = gameCellState[j]
    // }
    playerNumber++
    if (playerNumber == numberOfPlayers + 1) {
      playerNumber = 1
    }
  }
}

function chainReactionOutputAndGameOver() {
  for (var j = 1; j <= rowsAndCols; j++) {
    if (gameCellState[j] == 0) {
      document.getElementById(j).innerHTML = ''
    }
    if (gameCellState[j] == 1) {
      // document.getElementById(`span-${j}`).style.position = 'absolute'
      document.getElementById(j).innerHTML = `<span id='span-${j}-1'>${
        characters[playerPosition[j]]
      }</span>`
    }
    if (gameCellState[j] == 2) {
      document.getElementById(j).innerHTML = `
      <span id='span-${j}-1'>${characters[playerPosition[j]]}</span>
      <span id='span-${j}-2'>${characters[playerPosition[j]]}</span>`
      document.getElementById(`span-${j}-1`).style.left = '3px'
      document.getElementById(`span-${j}-2`).style.right = '3px'
    }
    if (gameCellState[j] == 3) {
      document.getElementById(j).innerHTML = `
      <span id='span-${j}-1'>${characters[playerPosition[j]]}</span>
      <span id='span-${j}-2'>${characters[playerPosition[j]]}</span>
      <span id='span-${j}-3'>${characters[playerPosition[j]]}</span>`
      document.getElementById(`span-${j}-1`).style.left = '3px'
      document.getElementById(`span-${j}-2`).style.right = '3px'
      document.getElementById(`span-${j}-3`).style.zIndex = '1'
      document.getElementById(`span-${j}-3`).style.top = '-6px'
    }
  }

  emojiNumberPerBox.length = 0
  for (let t = 1; t < row * col + 1; t++) {
    if (document.getElementById(t).children.length > 0) {
      for (let y = 0; y < document.getElementById(t).children.length; y++) {
        for (let q = 0; q < currentPlayers.length; q++) {
          if (
            document.getElementById(t).children[y].innerHTML ==
            currentPlayers[q]
          ) {
            emojiNumberPerBox.push(
              document.getElementById(t).children[y].innerHTML
            )
          }
        }
      }
    }
  }

  if (emojiNumberPerBox.length >= currentPlayers.length) {
    loop1: for (let u = 0; u < emojiNumberPerBox.length; u++) {
      loop2: for (let q = 0; q < currentPlayers.length; q++) {
        if (emojiNumberPerBox.indexOf(currentPlayers[q]) < 0) {
          if (currentPlayers.length == 2) {
            gameOverTwoPlayer(currentPlayers[q])
          }
        }
      }
    }
  }
}
