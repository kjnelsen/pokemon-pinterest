import './App.css';
import Header from './Header';
import GalleryView from "./GalleryView";
import {useEffect, useState} from "react";
import FavoriteView from "./FavoriteView";


function App() {

    const [favoriteArr, setFavoriteArr] = useState([]);
    const [pokemonArr, setPokemonArr] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [faveToAdd, setFaveToAdd] = useState();

    const addPokemon = (newPokemon) => {
        setPokemonArr((pokemonArr) => [...pokemonArr, newPokemon]);
    };

    const addPokemonFave = (newPokemon) => {
        setFavoriteArr((favoriteArr) => [...favoriteArr, newPokemon]);
        console.log(favoriteArr);
    };

    const removePokemonFave = () => {
    };

    useEffect(() => {
        async function fetchData() {
        for(let i = 1; i <= 9; i++) {
            const id = Math.ceil(Math.random() * 898);
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
            const pokemonRaw = await response.text();
            const pokemonJson = JSON.parse(pokemonRaw);
            addPokemon(pokemonJson);
        }
        }
        fetchData();
    }, []);


    const RenderView = () => {
        if(isFavorite)
        {
            return <FavoriteView pokemonArr={favoriteArr}/>
        }
        return <GalleryView pokemonArr={pokemonArr} setFaveToAdd={setFaveToAdd}/>
    };

    const headerCallback = (childData) => {
        setIsFavorite(childData);
    };

    useEffect(() => {
        if(typeof faveToAdd === 'undefined')
            return;
        setFavoriteArr((favoriteArr) => [...favoriteArr, faveToAdd]);
        let tempArr = pokemonArr;
        tempArr.splice(tempArr.indexOf(faveToAdd), 1);
        setPokemonArr(tempArr);
    }, [faveToAdd]);

    const loadMore = async () => {
        for(let i = 1; i <= 3; i++) {
            const id = Math.ceil(Math.random() * 898);
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
            const pokemonRaw = await response.text();
            const pokemonJson = JSON.parse(pokemonRaw);
            addPokemon(pokemonJson);
        }
    };

  return (
    <div className="App">
        <Header headerCallback={headerCallback}></Header>
        <div>
            <RenderView/>
        </div>
        <button onClick={loadMore}>Load More</button>
    </div>

  );
}

export default App;
