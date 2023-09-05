document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const humanPlayer = 'X';
    const aiPlayer = 'O';
    let currentPlayer = humanPlayer;
    let isGameOver = false;

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!isGameOver && cell.textContent === '') {
                cell.textContent = humanPlayer;
                cell.setAttribute('data-cell', humanPlayer);

                if (checkWin(humanPlayer)) {
                    isGameOver = true;
                    gameOver(humanPlayer);
                } else if (!Array.from(cells).some(cell => cell.textContent === '')) {
                    isGameOver = true;
                    gameOver('draw');
                } else {
                    currentPlayer = aiPlayer;
                    document.querySelector('h2').textContent = `Player ${currentPlayer} Turn`;

                    setTimeout(() => {
                        makeAIMove();
                    }, 500); // 1 second delay after human player's move
                }
            }
        });
    });

    function makeAIMove() {
        let bestScore = -Infinity;
        let bestMoveIndex;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === '') {
                cells[i].textContent = aiPlayer;
                cells[i].setAttribute('data-cell', aiPlayer);

                const score = minimax(cells, 0, false);

                cells[i].textContent = '';
                cells[i].setAttribute('data-cell', '');

                if (score > bestScore) {
                    bestScore = score;
                    bestMoveIndex = i;
                }
            }
        }

        cells[bestMoveIndex].textContent = aiPlayer;
        cells[bestMoveIndex].setAttribute('data-cell', aiPlayer);

        if (checkWin(aiPlayer)) {
            isGameOver = true;
            gameOver(aiPlayer);
        } else if (!Array.from(cells).some(cell => cell.textContent === '')) {
            isGameOver = true;
            gameOver('draw');
        }

        currentPlayer = humanPlayer;
        document.querySelector('h2').textContent = `Player ${currentPlayer} Turn`;
    }

    function minimax(board, depth, isMaximizing) {
        const scores = {
            X: -1,
            O: 1,
            draw: 0
        };

        if (checkWin(humanPlayer)) {
            return scores[humanPlayer];
        } else if (checkWin(aiPlayer)) {
            return scores[aiPlayer];
        } else if (!Array.from(board).some(cell => cell.textContent === '')) {
            return scores.draw;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;

            for (let i = 0; i < board.length; i++) {
                if (board[i].textContent === '') {
                    board[i].textContent = aiPlayer;

                    const score = minimax(board, depth + 1, false);

                    board[i].textContent = '';

                    bestScore = Math.max(score, bestScore);
                }
            }

            return bestScore;
        } else {
            let bestScore = Infinity;

            for (let i = 0; i < board.length; i++) {
                if (board[i].textContent === '') {
                    board[i].textContent = humanPlayer;

                    const score = minimax(board, depth + 1, true);

                    board[i].textContent = '';

                    bestScore = Math.min(score, bestScore);
                }
            }

            return bestScore;
        }
    }

    function checkWin(player) {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return (
                cells[a].textContent === player &&
                cells[b].textContent === player &&
                cells[c].textContent === player
            );
        });
    }

    function gameOver(result) {
        if (result === 'draw') {
            document.querySelector('h2').textContent = 'It\'s a draw!';
        } else {
            document.querySelector('h2').textContent = `Player ${result} wins!!`;
        }

        cells.forEach(cell => {
            cell.removeEventListener('click');
        });
    }

    resetButton.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.setAttribute('data-cell', '');
        });
        currentPlayer = humanPlayer;
        isGameOver = false;
        document.querySelector('h2').textContent = `Player ${currentPlayer} Turn`;
    });
});