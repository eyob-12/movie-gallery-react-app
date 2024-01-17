// react movie gallery by eyob-12
import './App.css';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import movieList from './component/movieList';
import movieListStore from './component/movieListStore';
import searchBox from './component/searchBox';
import movieFavorites from './component/movieFavorites';
import removeFavorites from './component/removeFavorites';

const App = () => {
    const [movies, setMovies] = useState([]);
    // for search purpose 
    const [searchMovies, setSearchMovies] = useState('');
    //for favorites store
    const [favoritesMovies, setFavoritesMovies] = useState('');

    const geMovieRequest = async (searchMovies) => {
        //make the request api
        const url = `??????????s=${searchMovies}????????????`;

        const response = await fetch(url);

        //convert the response to JSON
        const responseJson = await response.json();
         // to call it when the user type his /her desired movie 
        // if movie value equal to search value
        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };
    // using usEffect hook call the getMovieRequest
    //it gets called when the page loads

    useEffect(() => {
        geMovieRequest(searchMovies);

    }, [searchMovies]);

    // to get data from local storage
    useEffect(() => {
        const movieFavorite = JSON.parse(
            localStorage.getItem('your-favorites'));
        if (movieFavorite) {
            setFavoritesMovies(movieFavorite);
        }
    }, []);

    // to save our data on our local storage
    const saveToLocalStorage = (items) => {
        localStorage.setItem('your-favorites', JSON.stringify(items));
    }

// add favorite movies 
    const addFavoritesMovies = (movie) => {
        const newFavoritesList = [...favoritesMovies, movie];
        setFavoritesMovies(newFavoritesList);
        saveToLocalStorage(newFavoritesList);//saved the data
    }
// for remove functionallity
    const removeFavoritesMovie = (movie) => {
        const newFavoritesList = favoritesMovies.filter(
            (favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID );
        setFavoritesMovies(newFavoritesList);
        saveToLocalStorage(newFavoritesList);//removed the data from local storage
    }

    return (
        <div className='App container-fluid movie-css'>
           
            <div className=' row d-flex align-center-item mb-4'>
                <movieListStore heading = "e.net movie gallary" />
               <searchBox searchMovies={searchMovies} setSearchMovies={setSearchMovies} />
            </div>

            <div className='row'>
                <movieList movies={movies} 
                    favoritesSelected={addFavoritesMovies}
                    favorites={movieFavorites}
                />
            </div> 

            <div className=' row d-flex align-center-item mt-4 mb-4'>
                <movieListStore heading = "your favorites" />
            </div>

            <div className='row'>
                <movieList movies={favoritesMovies} 
                    favorites={removeFavorites}
                    favoritesSelected={removeFavoritesMovie}
                />
            </div>
        </div>
    )

}

export default App;
