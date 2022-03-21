import Cards from "./Cards";

const GalleryView = ({pokemonArr, setFaveToAdd, setFaveToRemove}) => {

    return (
        <div>
        <Cards cards={pokemonArr} setFaveToAdd={setFaveToAdd} setFaveToRemove={setFaveToRemove}/>
        </div>
    )
};

export default GalleryView;