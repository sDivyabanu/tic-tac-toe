export function calculateWinner(squares) {
  const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  
  for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]; // Returns 'X' or 'O' if someone wins
      }
  }
  return null; // No winner yet
}
export function aiMove(squares) {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
          squares[i] = "O"; // AI makes a temporary move
          let score = minimax(squares, 0, false); // Call Minimax
          squares[i] = null; // Undo move

          if (score > bestScore) {
              bestScore = score;
              move = i;
          }
      }
  }
  return move;
}

function minimax(squares, depth, isMaximizing) {
  const winner = calculateWinner(squares);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (!squares.includes(null)) return 0; // Draw

  if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
              squares[i] = "O";
              let score = minimax(squares, depth + 1, false);
              squares[i] = null;
              bestScore = Math.max(score, bestScore);
          }
      }
      return bestScore;
  } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
              squares[i] = "X";
              let score = minimax(squares, depth + 1, true);
              squares[i] = null;
              bestScore = Math.min(score, bestScore);
          }
      }
      return bestScore;
  }
}
