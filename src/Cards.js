import Card from "./Card";

const Cards = ( {cards, setFaveToAdd, setFaveToRemove}) => {


    return (
        <div className={'flex-container'}>

            {cards.map((card, i) => {
                return <Card key={i} pokemon={card} setFaveToAdd={setFaveToAdd} setFaveToRemove={setFaveToRemove}/>
            })}
        </div>

    )
};

export default Cards;