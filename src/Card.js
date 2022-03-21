
const Card = ({pokemon, setFaveToAdd, hide}) => {

    const clickDislike = () => {
    console.log("clicked Dislike");
};

    const clickLike = () => {
        console.log("clicked like");
        setFaveToAdd(pokemon);
    };

    return (
        <div>
                <img src={pokemon?.sprites.front_default} alt={''}/>
            <div>
                <button onClick={clickDislike}>Dislike</button> <button onClick={clickLike}>Like</button>
            </div>
        </div>
    )
};

export default Card;