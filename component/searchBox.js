import React from 'react';

const searchBox = (props) => {
    return (
        <div className='col col-sm-4'>

           <label>search:</label>
            <input className="form-control" type="text" placeholder='movies store...'
                value={props.value}
                onChange={(event) => props.setSearchMovies(event.target.value)}
            />
            
        </div>
    );
}
export default searchBox;