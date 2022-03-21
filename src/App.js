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
    const [faveToRemove, setFaveToRemove] = useState();

    const addPokemon = (newPokemon) => {
        setPokemonArr((pokemonArr) => [...pokemonArr, newPokemon]);
    };


    useEffect(() => {
        async function fetchData() {
        for(let i = 1; i <= 9; i++) {
            const id = Math.ceil(Math.random() * 898);
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
            const pokemonRaw = await response.text();
            const pokemonJson = JSON.parse(pokemonRaw);
            if(!pokemonArr.includes(pokemonJson))
                addPokemon(pokemonJson);
            else
                i--;
        }
        }
        fetchData();
    }, []);


    const RenderView = () => {
        if(isFavorite)
        {
            return <FavoriteView pokemonArr={favoriteArr} setFaveToRemove={setFaveToRemove}/>
        }
        return(
            <div>
            <GalleryView pokemonArr={pokemonArr} setFaveToAdd={setFaveToAdd} setFaveToRemove={setFaveToRemove}/>
            <button onClick={loadMore}>Load More</button>
            </div>

        )
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
        console.log('pokemon arr : ' + pokemonArr.length);
    }, [faveToAdd]);

    useEffect( () => {
        if(typeof faveToRemove === 'undefined')
            return;
        let tempArr = favoriteArr;
        if(tempArr.indexOf(faveToRemove) !== -1)
        {
            tempArr.splice(tempArr.indexOf(faveToRemove), 1);
            setFavoriteArr(tempArr);
        }
        tempArr = pokemonArr;
        if(tempArr.indexOf(faveToRemove) !== -1)
        {
            tempArr.splice(tempArr.indexOf(faveToRemove), 1);
            setPokemonArr(tempArr);
            console.log('pokemon arr dislike : ' + pokemonArr.length);
        }
    }, [faveToRemove]);

    const loadMore = async () => {
        for(let i = 1; i <= 3; i++) {
            const id = Math.ceil(Math.random() * 898);
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
            const pokemonRaw = await response.text();
            const pokemonJson = JSON.parse(pokemonRaw);
            if(!pokemonArr.includes(pokemonJson))
                addPokemon(pokemonJson);
            else
                i--;
        }
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
