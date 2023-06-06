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