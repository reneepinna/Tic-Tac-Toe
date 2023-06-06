// Query Selectors
  
// Global Variables

var players = {
  player1: {
    wins: 0,
    token: '🍊',
    spaces: [],
  },
  player2: {
    wins: 0,
    token: '🥝',
    spaces: [],
  }
}

// Event Listeners
// Functions and Event Handlers

function increaseWins(player) {
  players[player].wins++;
}

function clearPlayerSpaces(player) {
    players[player].spaces.splice(0);
  
}
