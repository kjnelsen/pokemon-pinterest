
const Card = ({pokemon, setFaveToAdd, setFaveToRemove}) => {

    const clickDislike = () => {
        setFaveToRemove(pokemon);
    };

    const clickLike = () => {
        setFaveToAdd(pokemon);
    };

    return (
        <div className={'card'}>
                <img src={pokemon?.sprites.front_default} alt={''}/>
            <div>
                <button onClick={clickDislike}>Dislike</button> <button onClick={clickLike}>Like</button>
            </div>
        </div>
    )
};

export default Card;