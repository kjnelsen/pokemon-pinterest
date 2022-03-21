import './App.css';
import Header from './Header';
import GalleryView from "./GalleryView";
import {useEffect, useState} from "react";
import FavoriteView from "./FavoriteView";


function App() {

    const [favoriteArr, setFavoriteArr] = useState([]);
    const [pokemonArr, setPokemonArr] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    const addPokemon = (newPokemon) => {
        setPokemonArr((pokemonArr) => [...pokemonArr, newPokemon]);
    };

    const addPokemonFave = (newPokemon) => {
        setFavoriteArr((favoriteArr) => [...favoriteArr, newPokemon]);
    };

    const removePokemonFave = (newPokemon) => {

    };

    useEffect(async () => {
        for(let i = 1; i < 4; i++) {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + i);
            const pokemonRaw = await response.text();
            const pokemonJson = JSON.parse(pokemonRaw);
            addPokemon(pokemonJson);
        }
    }, []);

    const RenderView = () => {
        if(isFavorite)
        {
            return <FavoriteView pokemonArr={favoriteArr}/>
        }
        return <GalleryView pokemonArr={pokemonArr}/>
    };

    const headerCallback = (childData) => {
        setIsFavorite(childData);
    };

  return (
    <div className="App">
        <Header headerCallback={headerCallback}></Header>
        <div>
            <RenderView/>
        </div>
    </div>

  );
}

export default App;
