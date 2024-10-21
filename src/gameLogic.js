
export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export function aiMove(squares) {
    // AI checks for the best move
    // Step 1: Win if possible
    const winMove = findBestMove(squares, "O"); // AI's marker is "O"
    if (winMove !== -1) return winMove; // If a winning move is found, return it
  
    // Step 2: Block player from winning
    const blockMove = findBestMove(squares, "X"); // Player's marker is "X"
    if (blockMove !== -1) return blockMove; // If a blocking move is found, return it
  
    // Step 3: Take the center if available
    if (squares[4] === null) return 4;
  
    // Step 4: Take any empty corner
    const corners = [0, 2, 6, 8];
    for (let i = 0; i < corners.length; i++) {
      if (squares[corners[i]] === null) return corners[i];
    }
  
    // Step 5: Take any empty side
    const sides = [1, 3, 5, 7];
    for (let i = 0; i < sides.length; i++) {
      if (squares[sides[i]] === null) return sides[i];
    }
  
    // If no strategic move, return -1
    return -1;
}

// Helper function to find the best move to win or block
function findBestMove(squares, player) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
  
    // Check all possible lines for a winning/blocking move
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      
      if (squares[a] === player && squares[b] === player && squares[c] === null) {
        return c; // Place in the third spot to win/block
      }
      if (squares[a] === player && squares[c] === player && squares[b] === null) {
        return b; // Place in the second spot to win/block
      }
      if (squares[b] === player && squares[c] === player && squares[a] === null) {
        return a; // Place in the first spot to win/block
      }
    }
    return -1; // No move found
}
