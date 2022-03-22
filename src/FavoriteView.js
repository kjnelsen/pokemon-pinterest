import Cards from "./Cards";

const FavoriteView = ({pokemonArr, setFaveToRemove}) => {

    return (
        <div>
            <Cards cards={pokemonArr} setFaveToRemove={setFaveToRemove}/>
        </div>
    )
};

export default FavoriteView;