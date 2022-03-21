import Cards from "./Cards";

const GalleryView = ({pokemonArr, setFaveToAdd}) => {

    return (
        <div>
        <Cards cards={pokemonArr} setFaveToAdd={setFaveToAdd}/>
        </div>
    )
};

export default GalleryView;