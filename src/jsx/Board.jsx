import { useState, useEffect, useRef } from "react";
import "../css/Board.css";
import Card from "./Card";

// import imgData from "../../data/img.data.json";

// const cards = imgData.concat(imgData.slice()).sort(()=>Math.random() - 0.5 );

export default function Board(){
	const [flippedCards, setFlippedCards] = useState([]);
	const [f1stFlippedCard, setF1stFlippedCard] = useState(null);
	const [s2ndFlippedCard, set2ndFlippedCard] = useState(null);
	const cards = useRef(null);
	const [loading, setLoading] = useState(true);

	// simple function to determine if a card with a certain should be displayed as flipped
	const isFlipped = (id) =>{
		return (flippedCards.includes(id) || f1stFlippedCard?.id === id || s2ndFlippedCard?.id === id);
	};

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
		let timeoutId;
		if(f1stFlippedCard === null){
			// if no cards are turned over - 1st try --> we simply flip the card
			setF1stFlippedCard({id, ...cards.current[id]});
		}else if( s2ndFlippedCard === null && f1stFlippedCard.id !== id && !flippedCards.includes(id)){
			// if 1 card is flipped, and it's the 2nd one (which is also not the 1st one and not in already flipped cards)
			set2ndFlippedCard({id, ...cards.current[id]});
			if(f1stFlippedCard.name === cards.current[id].name){
				// if we've matched the 1st and 2nd (aka, correct guess)
				setFlippedCards(prev=>prev.concat([f1stFlippedCard.id, id]));
			}else{
				// if we didn't match 1st/2nd card (aka, incorrect guess)
				timeoutId = setTimeout(()=>{
					setF1stFlippedCard(null);
					set2ndFlippedCard(null);
				}, 1000);
			}
		}else{
			// if we click on some card while both 1st and 2nd card are face up
			setF1stFlippedCard(null);
			set2ndFlippedCard(null);
		}
		return ()=>{
			if(timeoutId) {
				console.log("Hi from cleanup");
				clearTimeout(timeoutId);
			}
		};
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