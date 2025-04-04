import "../css/Card.css";
import backfaceImgUrl from "/card_backface.jpg";

// dumb Card component - simply renders what's given to render
export default function Card(props){
	return (
		<div onClick={props.onClick} className="card-container">
			<div data-testid="card-front-face" className={"card card-frontface " + (props.flipped?"":"flipped") }>
				<img data-testid="card-front-face-image" className="card-image" src={"/icons/" + props.fname} />
				<p className="card-text">{props.name}</p>
			</div>
			<div className={"card card-backface " +  (props.flipped?"flipped":"")} style={{backgroundImage: 'url(' + backfaceImgUrl + ')'}}></div>
		</div>
	);
}
