import { useState, useEffect, useRef, useContext } from "react";
import "../css/Board.css";
import Card from "./Card";
import { GameContext, gameStates } from "../contexts/GameContext";

export default function Board(){
	// defining state variables - to store the info about flipped cards
	const [flippedCards, setFlippedCards] = useState([]);
	const [f1stFlippedCard, setF1stFlippedCard] = useState(null);
	const [s2ndFlippedCard, set2ndFlippedCard] = useState(null);
	const cards = useRef(null); // keeping a reference to a list of cards we've loaded from server
	const [loading, setLoading] = useState(true); // if the cards are being loaded from server

	// context-based variables
	const {gameState, setGameState} = useContext(GameContext);

	// simple function to determine if a card with a certain should be displayed as flipped
	const isFlipped = (id) =>{
		return (flippedCards.includes(id) || f1stFlippedCard?.id === id || s2ndFlippedCard?.id === id);
	};

	useEffect(()=>{
		if(gameState.state === gameStates.notStarted){
			// a) reset all cards face down
			setFlippedCards([]);
			// b) clear the list of flipped cards (our in-component state variable)
			setF1stFlippedCard(null);
			set2ndFlippedCard(null);
			// c) re-randomize card order
			if(cards.current){
				setLoading(true);
				setTimeout(()=>{
					cards.current = cards.current.slice().sort(()=>Math.random() - 0.5 );
					setLoading(false);
				}, 0);
			}
		}
	}, [gameState.state]);

	// fetching data from the server once the component mounts (i.e., when it's in DOM)
	useEffect(()=>{
		fetch("http://localhost:8086/data")
			.then(res=>res.json())
			.then(imgData=>{
				cards.current = imgData.concat(imgData.slice()).sort(()=>Math.random() - 0.5 );
				setLoading(false); // using a state variable to re-render the component when loading is done (changing any state variable results in component re-render)
			});
	}, []);

	const handleCardFlip = (id) => {
		// if all cards are flipped, do nothing afterwards, so the state stays "finished"
		if(flippedCards.length === cards.current.length){
			return; // no more card flipping <-- until the game is reset
		}
		// if any card is flipped, we should transition into the "running" state
		setGameState(prev=>({...prev, state: gameStates.running}));
		if(f1stFlippedCard === null){
			// if no cards are turned over - 1st try --> we simply flip the card
			setF1stFlippedCard({id, ...cards.current[id]});
			setGameState(prev=>({...prev, nFlips: gameState.nFlips + 1})); // and up the counter by 1
		}else if( s2ndFlippedCard === null && f1stFlippedCard.id !== id && !flippedCards.includes(id)){
			// if 1 card is flipped, and it's the 2nd one (which is also not the 1st one and not in already flipped cards)
			set2ndFlippedCard({id, ...cards.current[id]});
			if(f1stFlippedCard.name === cards.current[id].name){
				// if we've matched the 1st and 2nd (aka, correct guess)
				setFlippedCards(prev=>prev.concat([f1stFlippedCard.id, id]));
				setF1stFlippedCard(null);
				set2ndFlippedCard(null);
				// if nFlippedCards is nAllCards minus the last 2 (that have just been flipped), set gameState to finished
				if(flippedCards.length === cards.current.length - 2){
					setGameState(prev=>({...prev, state: gameStates.finished}));
				}
			}else{
				// if we didn't match 1st/2nd card (aka, incorrect guess)
				setTimeout(()=>{
					setF1stFlippedCard(null);
					set2ndFlippedCard(null);
				}, 1000); // a 1sec delay before the cards are flipped face down
			}
		}else{
			// if we click on some card while both 1st and 2nd card are face up
			setF1stFlippedCard(null);
			set2ndFlippedCard(null);
		}
	};

	// returning JSX to render
	// Notice a condition (ternary operator) to render HTML based on a variable "loading"
	// Also note the mapping of cards (objects) into JSX (aka, eventual HTML)
	return (
		<>
			{loading? (
				<p className="msg">Loading Card Data.... Please Wait</p>
			) : (
				<div className="card-board">
					{
						cards.current.map((card, id)=>{
							return (<Card key={id} onClick={()=>handleCardFlip(id)} flipped={isFlipped(id)} {...card} />);
						})
					}
				</div>
			)}
		</>
	);
}