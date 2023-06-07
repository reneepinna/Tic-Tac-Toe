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

function getWhosTurn() {
  if (players.player1.isTurn){
    return "player1";
  } else {
    return "player2";
  }
}

function increaseWins(player) {
  players[player].wins++;
}

function addPlayerMove(player, space) {
  players[player].moves.push(space);
}

function clearPlayerMoves() {
    players.player1.moves.splice(0);
    players.player2.moves.splice(0);
    allMoves.splice(0);
}

function toggleTurn() {
  players.player1.isTurn = !players.player1.isTurn;
  players.player2.isTurn = !players.player1.isTurn;

}

function updateAllMoves(space){
  allMoves.push(space);
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

function getMoveSpace(e) {
  return e.target.id;
}

function renderToken(player, space) {
  tacBoxes[parseInt(space)].classList.add(player);
}

function checkBoard() {
  var winner = false;
  winner = checkForWin(getWhosTurn());
  checkForDraw();

  if (winner) {
    clearPlayerMoves();
  }
}