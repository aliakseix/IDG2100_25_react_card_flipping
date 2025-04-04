
import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react';

import Card from "../src/jsx/Card";

// <Card key={id} onClick={()=>handleCardFlip(id)} flipped={isFlipped(id)} {...card} />
describe("Card component", ()=>{
	it("should render a non-flipped card by default", ()=>{
		render(<Card onClick={()=>{}} flipped={false} name="test-name" fname="rss.svg" />);
		const cardElement = screen.getByTestId('card-front-face');
		const hasFlippedClass = cardElement.classList.contains("flipped");
		expect(hasFlippedClass).to.equal(true);
	});

	it("should have loaded the right svg image", ()=>{
		render(<Card onClick={()=>{}} flipped={false} name="test-name" fname="rss.svg" />);
		const cardElement = screen.getByTestId('card-front-face-image');
		expect(cardElement.src).toContain("/icons/rss.svg");
	});
});

