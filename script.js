const cells = document.querySelectorAll('.cell');
const rank = document.getElementById('rank');
const retryBtn = document.getElementById('retryBtn');

let board = ['', '', '', '', '', '', '', '', ''];
let current = 'X';
let over = false;

const WINS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleClick() {
    const i = parseInt(this.dataset.index);
    if (over || board[i] !== '') return;

    board[i] = current;
    this.textContent = current;
    this.classList.add(current.toLowerCase());

    const winLine = WINS.find(([a, b, c]) =>
        board[a] && board[a] === board[b] && board[a] === board[c]
    );

    if (winLine) {
        winLine.forEach(idx => cells[idx].classList.add('win'));
        rank.textContent = 'Player ' + current + ' wins!';
        over = true;
        return;
    }

    if (board.every(v => v !== '')) {
        rank.textContent = "❌ Both Players Failed! ❌";
        over = true;
        return;
    }

    current = current === 'X' ? 'O' : 'X';
    rank.textContent = "Player " + current + "'s turn";
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    current = 'X';
    over = false;
    rank.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';

        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick);
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

retryBtn.addEventListener('click', resetGame);