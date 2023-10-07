import react from 'react';

const movieList = (props) => {
    const Favorites = props.Favorites;
    return (
        <>
            {props.movies.map(
                (movie, index) => 
                    <div className='image-container d-flex justify-content-start m-3'>
                        <img src={movie.Poster} alt="movie picture" />
                        <div onClick={() => props.favoritesSelected()}
                            className='overlay d-flex align-items-center justifaied-content-center'>
                            <Favorites />

                        </div>
                    </div>
                
            )}      
        </>
    );
}
export default movieList;