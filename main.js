// Query Selectors
  
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

// Event Listeners
// Functions and Event Handlers

function increaseWins(player) {
  players[player].wins++;
}

function addPlayerMove(player, space) {
  players[player].moves.push(space);
}

function clearPlayerMoves(player) {
    players[player].moves.splice(0);
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

