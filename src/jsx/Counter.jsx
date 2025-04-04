import styles from "../css/Counter.module.css";
import { GameContext, gameStates } from "../contexts/GameContext";
import { useState, useContext, useEffect } from "react";

// F to convert time in seconds into a string to display (min:sec)
function t2str(t){ 
	const sec = t/1;
	const min = Math.floor( sec / 60);
	const minAsStr = (min).toString().padStart(2, "0");
	const secAsStr = (sec - min * 60).toString().padStart(2, "0");
	return `${minAsStr}:${secAsStr}`;
}


export default function Counter(){
	// keeping time as a state variable in Counter: we don't need to access it outside
	const [ time, setTime ] = useState(0);
	// getting the gameState context variable
	const { gameState, setGameState } = useContext(GameContext);

	const { state } = gameState;
	const timeAsStr = t2str(time);

	useEffect(()=>{
		let intervalId;
		if(state === gameStates.running){
			intervalId = setInterval(() => {
				setTime(prev=>prev+1);
			}, 1000);
		}else{
			clearInterval(intervalId);
		}
		if(state === gameStates.notStarted){
			setTime(0);
		}
		return ()=>clearInterval(intervalId);
	}, [state]);

	function onResetClick(ev){
		setGameState(prev=>({...prev, state: gameStates.notStarted, nFlips: 0}));
	}

	return (
		<div className={styles["container"]}>
			<button onClick={onResetClick} className={styles["reset-game-button"]} type="button">Reset Board 😁</button>
			<div className={styles["counter-container"]}>
				<div className={styles["counter"]}>
					<span>Number of Flips: </span>
					<span className={styles["count-info"]}>{gameState.nFlips}</span>
				</div>
				<div className={styles["counter"]}>
					<span>Timer: </span>
					<span className={styles["count-info"]}>{timeAsStr}</span>
				</div>
			</div>
		</div>
	);
}