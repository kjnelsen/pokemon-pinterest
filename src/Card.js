import {useState} from "react";

const Card = ({pokemon, setFaveToAdd, setFaveToRemove}) => {

    const [hide, setHide] = useState(true);
    const [heightWidth, setHeightWidth] = useState('96');

    const clickDislike = () => {
        setFaveToRemove(pokemon);
    };

    const clickLike = () => {
        setFaveToAdd(pokemon);
    };

    const handleClick = () => {
        console.log(pokemon);
        setHide(!hide);
        if(heightWidth === '96')
            setHeightWidth('240');
        else
            setHeightWidth('96');
    }


    return (
        <div className={'card'}>
                <img src={pokemon?.sprites.front_default} alt={''} onClick={handleClick} height={heightWidth} width={heightWidth}/>
            <div>
                <p hidden={hide}>
                    {pokemon?.name + ' : ' + pokemon?.id} <br />
                    {pokemon.types.map((type) => {
                        return (type.type.name + ' ')
                    })}
                </p>
                <button onClick={clickDislike}>Dislike</button> {setFaveToAdd && <button onClick={clickLike}>Like</button>}
            </div>
        </div>
    )
};

export default Card;