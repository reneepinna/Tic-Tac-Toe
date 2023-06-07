// Query Selectors
var tacContainer = document.getElementById('tac-container');
var tacBoxes = document.querySelectorAll('.tac-box');
// Global Variables

var board = {
  'player1': {
    wins: 0,
    token: '🍊',
    moves: [],
    isTurn: true,
  },
  'player2': {
    wins: 0,
    token: '🥝',
    moves: [],
    isTurn: false,
  },
  allMoves: [],
}


// Event Listeners

tacContainer.addEventListener('click', function(e) {
  if (e.target.className.includes('open')) {
    addPlayerMove(getWhosTurn(), getMoveSpace(e));
    updateAllMoves(getMoveSpace(e));
    toggleAvailability();
    renderToken(getWhosTurn(), getMoveSpace(e));

    checkBoard()

    toggleTurn();

  }
  //render 
})

// Functions and Event Handlers

function createPlayer(name, token) {
  board[name] = {
    token: token,
    moves: [],
    wins: 0
  }
}

function getWhosTurn() {
  if (board.player1.isTurn){
    return "player1";
  } else {
    return "player2";
  }
}

function increaseWins(player) {
  board[player].wins++;
}

function addPlayerMove(player, space) {
  board[player].moves.push(space);
}

function clearPlayerMoves() {
    board.player1.moves.splice(0);
    board.player2.moves.splice(0);
    board.allMoves.splice(0);
}

function toggleTurn() {
  board.player1.isTurn = !board.player1.isTurn;
  board.player2.isTurn = !board.player1.isTurn;

}

function updateAllMoves(space){
  board.allMoves.push(space);
}

function checkForWin(player) {
  
  winConditions = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
  ]
  
  for (var i = 0; i < winConditions.length; i++) {
    if (evaluateWinCondition(player, winConditions[i])) {
      increaseWins(player);
      return true;
    }
  }

  return false;
}

function evaluateWinCondition(player, winCondition) {
  var tally = 0;
  for (var i = 0; i < winCondition.length; i++) {
    if (board[player].moves.includes(winCondition[i])) tally++;
  }

  if (tally === 3) {
    return true;
  }
}

function checkForDraw() {
  if (board.allMoves.length >= 9) {
    console.log(`There has been a draw`);
  }
}

function toggleAvailability() {
  for (var i = 0; i < tacBoxes.length; i++) {
    if (board.allMoves.includes(tacBoxes[i].id)) {
      tacBoxes[i].classList.remove('open');
    } else {
      tacBoxes[i].classList.add('open');
    }
  }
}

function getMoveSpace(e) {
  return e.target.id;
}

function renderToken(player, space) {
  tacBoxes[parseInt(space)].classList.add(player);
}

function clearTokens() {
  for (var i = 0; i < tacBoxes.length; i++) {
    if (board.player1.moves.includes(tacBoxes[i].id)){
      tacBoxes[i].classList.remove('player1')
    } else {
      tacBoxes[i].classList.remove('player2')
    }
  }
}

function checkBoard() {
  var winner = false;
  winner = checkForWin(getWhosTurn());
  checkForDraw();

  if (winner) {
    clearTokens();
    clearPlayerMoves();
    
  }
}