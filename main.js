// Query Selectors
var tacContainer = document.getElementById('tac-container');
var tacBoxes = document.querySelectorAll('.tac-box');

var player1Win = document.getElementById('player1-wins');
var player2Win = document.getElementById('player2-wins');

var turnMessage = document.getElementById('turn-message');
// Global Variables

var board = {
  allMoves: [],
}



// Event Listeners
window.addEventListener('load', function(){
  createPlayer("player1", "orange",'🍊', true);
  createPlayer("player2", "kiwi", '🥝', false);
})

tacContainer.addEventListener('click', function(e) {
  if (e.target.className.includes('open')) {
    addPlayerMove(getWhosTurn(), getMoveSpace(e));
    updateAllMoves(getMoveSpace(e));
    toggleAvailability();
    renderToken(getWhosTurn(), getMoveSpace(e));

    if(checkBoard()){
      buyTime()
    } else {
      toggleTurn();
      renderPlayerTurn();
    }

    // toggleTurn();
    // renderPlayerTurn();

  }
  //render 
})

// Functions and Event Handlers

function createPlayer(position, tokenStyle, token, isTurn) {
  board[position] = {
   // name: name,
    tokenStyle: tokenStyle,
    token, token,
    moves: [],
    wins: 0,
    isTurn: isTurn
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
  console.log(getWhosTurn());

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
    return true;
  }
}

function checkBoard() {
  var winner = checkForWin(getWhosTurn());

  if (winner) {
    renderWinMessage(getWhosTurn());
    renderPlayerWins();
   // resetBoard();

    return true;
  } else if (checkForDraw()) {
    renderDrawMessage();
    return true;
  }
}

function prepareBoard() {
  resetBoard();
  toggleTurn();
  renderPlayerTurn();}

function buyTime(){
  setTimeout(prepareBoard, 1500)
  console.log('buytime')
}

function resetBoard() {
  clearTokens();
  clearPlayerMoves();
  toggleAvailability();
}

// ----DOM-----

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
  tacBoxes[parseInt(space)].classList.add(board[player].tokenStyle);
}

function clearTokens() {
  for (var i = 0; i < tacBoxes.length; i++) {
    if (board.player1.moves.includes(tacBoxes[i].id)){
      tacBoxes[i].classList.remove(board.player1.tokenStyle);
    } else {
      tacBoxes[i].classList.remove(board.player2.tokenStyle)
    }
  }
}

function renderPlayerWins() {
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