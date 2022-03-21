import Card from "./Card";

const Cards = ( {cards}) => {

    return (
        <div>
            <Card pokemon={cards[0]}/>
            <Card pokemon={cards[1]}/>
            <Card pokemon={cards[2]}/>
        </div>

    )
};

export default Cards;