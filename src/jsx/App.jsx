import { useState } from "react";
import '../css/App.css';
import Board from "./Board";
import Counter from "./Counter";
// NOTE: we don't have to use context in this case (Counter and Board aren't too far away from each other) - we only use it for practice
import { GameContext, gameStates } from "../contexts/GameContext";

export default function App() {
  // NOTE how we link the state variable below to context in here: <GameContext value={{gameState, setGameState}}>
  const [ gameState, setGameState ] = useState({
    nFlips: 0,
    state: gameStates.notStarted
  });

  return (
    <div className="main-container">
      <div className="centered-item">
        <h1>Find Matching Cards If You Can!</h1>
        <GameContext value={{gameState, setGameState}}>
          <Counter/>
          <Board/>
        </GameContext>
      </div>
    </div>
  );
}
