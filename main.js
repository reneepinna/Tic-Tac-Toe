// Query Selectors
var tacContainer = document.getElementById('cell-container');
var boardCells = document.querySelectorAll('.board-cell');

var player1IMG = document.getElementById('player1-IMG');
var player2IMG = document.getElementById('player2-IMG');
var player1Win = document.getElementById('player1-wins');
var player2Win = document.getElementById('player2-wins');
var player1Bar = document.getElementById('player-1');
var player2Bar = document.getElementById('player-2');

var turnMessage = document.getElementById('turn-message');
// Global Variables

var board = {
  allMoves: [],
}

// Event Listeners
window.addEventListener('load', function() {
  createPlayer("player1", "blueberry",'🫐', true);
  createPlayer("player2", "strawberry", '🍓', false);

  initializePlayerTheme();
})

tacContainer.addEventListener('click', function(e) {
  if (e.target.className.includes('open')) {
    acceptPlayerMove(e);

    if (checkBoardForEndCondition()) {
      blockCellAvailability()
      setTimeout(prepareBoardForNewGame, 1000)
    } else {
      toggleTurn();
      renderPlayerTurn();
    }
  }
})

// Functions and Event Handlers

function createPlayer(position, tokenStyle, token, isTurn) {
  board[position] = {
    tokenStyle: tokenStyle,
    token, token,
    moves: [],
    wins: 0,
    isTurn: isTurn
  }
}

function acceptPlayerMove(e) {
  addPlayerMove(getWhosTurn(), getMoveSpace(e));
  updateAllMoves(getMoveSpace(e));
  toggleCellAvailability();
  renderToken(getWhosTurn(), getMoveSpace(e));
}

function prepareBoardForNewGame() {
  clearTokens();
  clearPlayerMoves();
  toggleCellAvailability();
  toggleTurn();
  renderPlayerTurn();
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

function updateAllMoves(space) {
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
    if (winConditions[i].every(evaluateWinCondition)) {
      return true;
    }
  }
}

function evaluateWinCondition(currentValue) {
 if(board[getWhosTurn()].moves.includes(currentValue)){
  return true;
 }
}

function checkForDraw() {
  if (board.allMoves.length >= 9) {
    return true;
  }
}

function checkBoardForEndCondition() {
  var winner = checkForWin(getWhosTurn());

  if (winner) {
    increaseWins(getWhosTurn());
    renderWinMessage(getWhosTurn());
    renderPlayerPastWins();
    return true;
  } else if (checkForDraw()) {
    renderDrawMessage();
    return true;
  }
}

// ----DOM-----

function getMoveSpace(e) {
  return e.target.id;
}

function toggleCellAvailability() {
  for (var i = 0; i < boardCells.length; i++) {
    if (board.allMoves.includes(boardCells[i].id)) {
      boardCells[i].classList.remove('open');
    } else {
      boardCells[i].classList.add('open');
    }
  }
}

function blockCellAvailability() {
  for (var i = 0; i < boardCells.length; i++) {
    boardCells[i].classList.remove('open');
  }
}

function clearTokens() {
  for (var i = 0; i < boardCells.length; i++) {
      boardCells[i].innerHTML = '';
  }
}

function renderToken(player, space) {
  boardCells[parseInt(space)].innerHTML = `<span class="token" role="img" aria-label="${board[player].tokenStyle}" title="${board[player].tokenStyle}">${board[player].token}</span>`
}

function renderPlayerPastWins() {
  player1Win.innerText = `Wins: ${board.player1.wins}`;
  player2Win.innerText = `Wins: ${board.player2.wins}`;
}

function renderPlayerTurn() {
  turnMessage.innerText = `It's ${board[getWhosTurn()].token}'s turn!`;
}

function renderWinMessage(player) {
  turnMessage.innerText = `${board[player].token} Wins!`;
}

function renderDrawMessage() {
  turnMessage.innerText = `It's a Draw!`;
}

function initializePlayerTheme() {
  player1IMG.innerHTML = board.player1.token;
  player2IMG.innerHTML = board.player2.token;

  player1Bar.classList.add(board.player1.tokenStyle);
  player2Bar.classList.add(board.player2.tokenStyle);

  turnMessage.innerText = `It's ${board.player1.token}'s turn!`;
}