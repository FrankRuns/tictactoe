// Function to make a move
function makeMove(row, col) {
    fetch(`/move?row=${row}&col=${col}`)
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                updateBoard(data.board);
                if (data.winner) {
                    showMessage(`${data.winner} wins!`);
                    disableClicks();
                } else if (data.draw) {
                    showMessage("It's a draw!");
                    disableClicks();
                } else {
                    switchPlayer();
                }
            } else {
                showMessage("Invalid move. Try again.");
            }
        });
}

// Function to update the board
function updateBoard(board) {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        cells[i].innerText = board[row][col];
    }
}

// Function to switch the player
function switchPlayer() {
    const message = document.getElementById('message');
    message.innerText = "It's the opponent's turn.";
    disableClicks();

    fetch('/switch')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (!data.gameOver) {
                    message.innerText = "It's your turn.";
                    enableClicks();
                }
            }
        });
}

// Function to reset the game
function resetGame() {
    fetch('/reset')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateBoard(data.board);
                showMessage("New game started. It's your turn.");
                enableClicks();
            }
        });
}

// Function to show a message
function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
}

// Function to disable cell clicking
function disableClicks() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute('onclick');
    }
}

// Function to enable cell clicking
function enableClicks() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].setAttribute('onclick', `makeMove(${Math.floor(i / 3)}, ${i % 3})`);
    }
}