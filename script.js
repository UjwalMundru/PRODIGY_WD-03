const board = document.getElementById("board");
const restartButton = document.getElementById("restart");
const aiModeButton = document.getElementById("ai-mode");
let cells = Array.from(board.children);
let currentPlayer = "X";
let gameActive = true;
let isAIMode = false;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            gameActive = false;
            setTimeout(() => alert(`${cells[a].textContent} wins!`), 100);
            return;
        }
    }

    if (cells.every(cell => cell.textContent !== "")) {
        gameActive = false;
        setTimeout(() => alert("It's a draw!"), 100);
    }
}

function handleClick(event) {
    if (!gameActive) return;
    let cell = event.target;
    if (cell.textContent !== "") return; // Skip if cell is already taken

    // Human move (always "X")
    cell.textContent = currentPlayer;
    checkWinner();
    if (!gameActive) return;

    // If playing vs AI, schedule the AI move after human plays.
    if (isAIMode) {
        // Switch to AI's turn and add a slight delay for realism
        currentPlayer = "O";
        setTimeout(aiMove, 300);
    } else {
        // Toggle for two-player mode
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function aiMove() {
    if (!gameActive) return;
    let emptyCells = cells.filter(cell => cell.textContent === "");
    if (emptyCells.length === 0) return;
    
    // Simple AI: choose a random empty cell
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomIndex].textContent = "O";
    checkWinner();
    if (gameActive) {
        // Switch back to human turn
        currentPlayer = "X";
    }
}

function restartGame() {
    cells.forEach(cell => cell.textContent = "");
    gameActive = true;
    currentPlayer = "X";
}

aiModeButton.addEventListener("click", () => {
    isAIMode = true;
    aiModeButton.disabled = true;
    aiModeButton.textContent = "Playing vs AI";
});

board.addEventListener("click", handleClick);
restartButton.addEventListener("click", () => {
    restartGame();
    // Reset AI mode toggle if needed
    if (isAIMode) {
        aiModeButton.disabled = false;
        aiModeButton.textContent = "Play vs AI";
        isAIMode = false;
    }
});
