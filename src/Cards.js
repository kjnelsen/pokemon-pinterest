import Card from "./Card";
import {useState} from "react";

const Cards = ( {cards, setFaveToAdd}) => {


    return (
        <div>
            <Card pokemon={cards[cards.length - 3]} setFaveToAdd={setFaveToAdd}/>
            <Card pokemon={cards[cards.length - 2]} setFaveToAdd={setFaveToAdd}/>
            <Card pokemon={cards[cards.length - 1]} setFaveToAdd={setFaveToAdd}/>
        </div>

    )
};

export default Cards;