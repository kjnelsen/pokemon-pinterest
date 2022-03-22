import Card from "./Card";

const Cards = ( {cards, setFaveToAdd, setFaveToRemove}) => {


    return (
        <div className={'flex-container'}>

            {cards.map((card) => {
                return <Card key={card.id} pokemon={card} setFaveToAdd={setFaveToAdd} setFaveToRemove={setFaveToRemove}/>
            })}
        </div>

    )
};

export default Cards;