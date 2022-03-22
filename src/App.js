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

    useEffect(() => {
        loadMore(15);
        localStorageToArray();
    }, []);

    useEffect(() => {
        if(typeof faveToAdd === 'undefined')
            return;
        favoriteArr.push(faveToAdd);
        localStorage.setItem(faveToAdd.id, JSON.stringify(faveToAdd));
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
        localStorage.removeItem(faveToRemove.id);
        tempArr = pokemonArr;
        if(tempArr.indexOf(faveToRemove) !== -1)
        {
            tempArr.splice(tempArr.indexOf(faveToRemove), 1);
            setPokemonArr(tempArr);
        }
        burpArrays();
    }, [faveToRemove]);

    const loadMore = async (numberToLoad) => {
        let loopBreakout = 0;
        let prevArr = [...prevCalled];
        for(let i = 1; i <= numberToLoad; i++) {
            const id = Math.ceil(Math.random() * 898);
            if(prevArr.includes(id) || localStorage.getItem(id.toString())){
                i--;
                loopBreakout++;
                if(loopBreakout > 20)
                    break;
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

    const headerCallback = (childData) => {
        setIsFavorite(childData);
    };

    const burpArrays = () => {
        setFavoriteArr((favoriteArr) => [...favoriteArr]);
        setPokemonArr((pokemonArr) => [...pokemonArr]);
    };

    const localStorageToArray = () => {
        let tempArr = [];

        for(let i = 0; i < localStorage.length; i++)
        {
            tempArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        setFavoriteArr(tempArr);
    };

    const clearCache = () => {
        localStorage.clear();
        setFavoriteArr([]);
    }

    const RenderView = () => {
        if(isFavorite)
        {
            return(
                <div>
                    <FavoriteView pokemonArr={favoriteArr} setFaveToRemove={setFaveToRemove}/>
                    <button onClick={clearCache}>Clear</button>
                </div>
            )
        }
        return(
            <div>
                <GalleryView pokemonArr={pokemonArr} setFaveToAdd={setFaveToAdd} setFaveToRemove={setFaveToRemove}/>
                <button onClick={() => {loadMore(5)}}>Load More</button>
            </div>

        )
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
