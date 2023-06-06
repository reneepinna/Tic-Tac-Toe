// Query Selectors
  
// Global Variables

var players = {
  player1: {
    wins: 0,
    token: '🍊',
  },
  player2: {
    wins: 0,
    token: '🥝',
  }
}

// Event Listeners

// Functions and Event Handlers

function increaseWins(winner) {
  players[winner].wins++;
}