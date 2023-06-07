// Query Selectors
var tacContainer = document.getElementById('tac-container');
var tacBoxes = document.querySelectorAll('.tac-box');
// Global Variables

var players = {
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
  }
}
var allMoves = [];

// Event Listeners

tacContainer.addEventListener('click', function(e) {
  if (e.target.className.includes('open')) {

  }
  //is the space empty
  //which space did they click on
  //which player turn is it
  //render 
})

// Functions and Event Handlers

function increaseWins(player) {
  players[player].wins++;
}

function addPlayerMove(player, space) {
  players[player].moves.push(space);
}

function clearPlayerMoves(player) {
    players[player].moves.splice(0);
    allMoves.splice(0);
}

function toggleTurn(player) {
  players[player].isTurn = !players[player].isTurn;
}

function checkForWin(player) {
  
  winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  
  for (var i = 0; i < winConditions.length; i++) {
    if (evaluateWinCondition(player, winConditions[i])) {
      increaseWins(player);
      return;
    }
  }
}

function evaluateWinCondition(player, winCondition) {
  var tally = 0;
  for (var i = 0; i < winCondition.length; i++) {
    if (players[player].moves.includes(winCondition[i])) tally++;
  }

  if (tally === 3) {
    return true;
  }
}

function checkForDraw() {
  if (allMoves.length >= 9) {
    console.log(`There has been a draw`);
  }
}

function toggleAvailability() {
  for (var i = 0; i < tacBoxes.length; i++) {
    if( allMoves.includes(tacBoxes[i].id)) {
      tacBoxes[i].classList.remove('open');
    } else {
      tacBoxes[i].classList.add('open');
    }
  }
}