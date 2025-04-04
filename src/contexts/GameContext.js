import { createContext } from "react";

// NOTE: a rather unfortunate naming of the variable below - it clashes with the often used "gameState" variables elsewhere
export const gameStates = { notStarted: "not started", running: "running", finished: "finished"};

export const GameContext = createContext({
	gameState: {
		nFlips: 0,
		state: gameStates.notStarted // ["not started", "running", "finished"]
	},
	setGameState: ()=>{}
});