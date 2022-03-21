import Cards from "./Cards";

const GalleryView = ({pokemonArr, setFaveToAdd}) => {

    return (
        <div>
        <Cards cards={pokemonArr.slice(0,3)} setFaveToAdd={setFaveToAdd}/>
        <Cards cards={pokemonArr.slice(3,6)} setFaveToAdd={setFaveToAdd}/>
        <Cards cards={pokemonArr.slice(6,9)} setFaveToAdd={setFaveToAdd}/>
        </div>
    )
};

export default GalleryView;