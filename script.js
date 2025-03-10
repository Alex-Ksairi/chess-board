document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");

    const initialBoard = [
        ["r", "n", "b", "q", "k", "b", "n", "r"], // Black major pieces
        ["p", "p", "p", "p", "p", "p", "p", "p"], // Black pawns
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["P", "P", "P", "P", "P", "P", "P", "P"], // White pawns
        ["R", "N", "B", "Q", "K", "B", "N", "R"]  // White major pieces
    ];

    const board = document.createElement("div");
    board.classList.add("chessboard");

    // Create the chessboard squares
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.row = row;
            square.dataset.col = col;

            // Color the square
            if ((row + col) % 2 === 0) {
                square.classList.add("light");
            } else {
                square.classList.add("dark");
            }

            // Add chess piece if present
            const piece = initialBoard[row][col];
            if (piece) {
                const pieceElement = document.createElement("div");
                pieceElement.textContent = piece;
                pieceElement.classList.add("piece");
                pieceElement.setAttribute("draggable", true);

                // Handle drag start
                pieceElement.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/plain", `${row}-${col}`);
                });

                square.appendChild(pieceElement);
            }

            // Allow dropping on squares
            square.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            // Handle drop event
            square.addEventListener("drop", (e) => {
                e.preventDefault();
                const data = e.dataTransfer.getData("text/plain");
                const [fromRow, fromCol] = data.split("-").map(Number);
                const fromSquare = document.querySelector(
                    `.square[data-row="${fromRow}"][data-col="${fromCol}"]`
                );
                const draggedPiece = fromSquare.querySelector(".piece");

                // Move piece to new square
                if (draggedPiece) {
                    e.currentTarget.innerHTML = "";
                    e.currentTarget.appendChild(draggedPiece);
                }
            });

            board.appendChild(square);
        }
    }

    container.appendChild(board);
});