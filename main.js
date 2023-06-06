// Query Selectors
  
// Global Variables

var players = {
  player1: {
    wins: 0,
    token: '🍊',
    moves: [],
  },
  player2: {
    wins: 0,
    token: '🥝',
    moves: [],
  }
}

// Event Listeners
// Functions and Event Handlers

function increaseWins(player) {
  players[player].wins++;
}



function clearPlayerMoves(player) {
    players[player].moves.splice(0);
  
}
