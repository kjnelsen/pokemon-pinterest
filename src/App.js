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
    const [prevCalled, setPrevCalled] = useState([]);

    const burpArrays = () => {
        setFavoriteArr((favoriteArr) => [...favoriteArr]);
        setPokemonArr((pokemonArr) => [...pokemonArr]);
    };

    useEffect(() => {
        async function fetchData() {
            let prevArr = [...prevCalled];
        for(let i = 1; i <= 15; i++) {
            const id = Math.ceil(Math.random() * 898);
            if(prevArr.includes(id)) {
                i--;
                continue;
            }
            prevArr.push(id);
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
            const pokemonRaw = await response.text();
            const pokemonJson = JSON.parse(pokemonRaw);
            setPokemonArr((pokemonArr) => [...pokemonArr, pokemonJson]);
        }
        setPrevCalled(prevArr);
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
        favoriteArr.push(faveToAdd);
        pokemonArr.splice(pokemonArr.indexOf(faveToAdd), 1);
        burpArrays();
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
        }
        burpArrays();
    }, [faveToRemove]);

    const loadMore = async () => {
        let prevArr = [...prevCalled];
        for(let i = 1; i <= 3; i++) {
            const id = Math.ceil(Math.random() * 898);
            if(prevArr.includes(id)){
                i--;
                continue;
            }
            prevArr.push(id);
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
            const pokemonRaw = await response.text();
            const pokemonJson = JSON.parse(pokemonRaw);
            setPokemonArr((pokemonArr) => [...pokemonArr, pokemonJson]);
        }
        setPrevCalled(prevArr);
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
