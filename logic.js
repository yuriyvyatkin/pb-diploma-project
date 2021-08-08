const players = ['x', 'o'];
let activePlayer = 0;
// boardScale is any positive number from 0 inclusive
// e.g. boardScale = 0 means 1 x 1 scale
const boardScale = 3;
// clicksCounter saves system resources
let clicksCounter;
let board;

function generateBoard(boardScale) {
    board = new Array(boardScale)
        .fill('')
        .map(() => new Array(boardScale).fill(''));
}

function startGame() {
    generateBoard(boardScale + 1);

    clicksCounter = -boardScale;

    //choose an active player randomly
    activePlayer = Math.trunc(Math.random() * 2);

    renderBoard(board);
}

function click(row, col) {
    ++clicksCounter;
    
    board[row][col] = players[activePlayer];

    renderBoard(board);

    // check a win
    if (clicksCounter > boardScale && isWinSituation()) {
        showWinner(activePlayer);
    }

    // change the active player
    activePlayer = activePlayer ? 0 : 1;
}

function isWinSituation() {
    let leftDiagonal = '';
    let rightDiagonal = '';
    let testRow;
    let testColumn;

    return board.some((_, i) => {
        // test row
        testRow = board[i].every(checkField);

        // test column
        testColumn = board.map(row => row[i]).every(checkField);
        
        if (testRow || testColumn) {
            return true;
        }

        // collect diagonal values
        leftDiagonal += board[i][i];
        rightDiagonal += board[i][boardScale - i];

        // test leftDiagonal
        if (leftDiagonal.length > boardScale) {
            return leftDiagonal.split('').every(checkField);
        }

        // test rightDiagonal
        if (rightDiagonal.length > boardScale) {
            return rightDiagonal.split('').every(checkField);
        }

        return false;
    }); 
}

const checkField = item => item === players[activePlayer];