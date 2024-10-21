import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner, aiMove } from "./gameLogic";
import CanvasBackground from './CanvasBackground.js';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i] || !isXNext) return;

    const newSquares = squares.slice();
    newSquares[i] = "X";
    setSquares(newSquares);

    if (calculateWinner(newSquares)) {
      setIsXNext(false);
      return;
    }

    setIsXNext(false);

    // Delay the AI move by 2fea seconds
    setTimeout(() => handleAiMove(newSquares), 1000);
  };

  const handleAiMove = (newSquares) => {
    const aiMoveIndex = aiMove(newSquares);

    
    if (aiMoveIndex !== -1) {
      newSquares[aiMoveIndex] = "O";
      setSquares([...newSquares]);
      
      if (calculateWinner(newSquares)) {
        setIsXNext(false); // End the game
        return;
      }
    }

    setIsXNext(true);

  };

  const handleRestart = () => {
    console.log('Restart button clicked');
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  const isDraw = squares.every(square => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "It's a draw"
    // : `Next player: ${isXNext ? "X" : "O"}`;
    : `${isXNext ? "Your Move, Play X" : "Ai's move"}`;
  return (
    <div className="relative min-h-screen">
      <CanvasBackground /> 
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
      <h1 className=" mb-10 text-black text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">Tic Tac Toe</h1>
      <div className="text-2xl mb-10 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <button
        className="mt-10          px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        onClick={handleRestart}
      >
        Restart
      </button>
    </div>
    </div>
  );
}

export default App;
