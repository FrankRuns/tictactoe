document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.textContent === '') {
                cell.textContent = currentPlayer;
                cell.setAttribute('data-cell', currentPlayer);
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                document.querySelector('h2').textContent = `Player ${currentPlayer} Turn`;
                checkWin();
            }
        });
    });

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
    
        let isGameOver = false;
    
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            const cellA = cells[a];
            const cellB = cells[b];
            const cellC = cells[c];
    
            if (cellA.textContent !== '' && cellA.textContent === cellB.textContent && cellA.textContent === cellC.textContent) {
                isGameOver = true;
                gameOver(cellA.textContent);
                break;
            }
        }
    
        if (!isGameOver && Array.from(cells).every(cell => !!cell.textContent)) {
            gameOver('draw');
        }
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
        currentPlayer = 'X';
        document.querySelector('h2').textContent = `Player ${currentPlayer} Turn`;
    });
});

