import Card from "./Card";

const Cards = ( {cards, setFaveToAdd}) => {


    return (
        <div className={'flex-container'}>

            {cards.map((card) => {
                return <Card pokemon={card} setFaveToAdd={setFaveToAdd}/>
            })}
        </div>

    )
};

export default Cards;