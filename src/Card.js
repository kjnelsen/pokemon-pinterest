
const Card = ({pokemon}) => {

    const clickDislike = () => {
    console.log("clicked Dislike");
};

    const clickLike = () => {
        console.log("clicked like");
    };

    return (
        <div>
                <img src={pokemon?.sprites.front_default}/>
            <div>
                <button onClick={clickDislike}>Dislike</button> <button onClick={clickLike}>Like</button>
            </div>
        </div>
    )
};

export default Card;