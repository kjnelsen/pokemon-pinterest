import Cards from "./Cards";

const FavoriteView = ({pokemonArr, setFaveToAdd}) => {

    return (
        <Cards cards={pokemonArr} setFaveToAdd={setFaveToAdd}/>
    )
};

export default FavoriteView;