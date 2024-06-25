import PropTypes from 'prop-types';
import {useState} from 'react';

export default function NavBar({setQuery,fetchRecipes}){
    const handleSubmit = (event) =>{
        event.preventDefault();
        fetchRecipes();
    }

    const handleSearch = (event) =>{
        setQuery(_ => event.target.value);
    }

    return(<>
        <nav className="nav">
            <p className='nav-p'>Let's Eat</p>
            <form className="query" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search Recipe..."
                    onChange={handleSearch}
                    className="search-bar"/>
            </form> 
            <div className="icon-ctn">
                <a className="home-icon" href="">Home</a>
                <a className="fav-icon" href=""> Favorites</a> 
            </div>      
        </nav>
    </>);
}

NavBar.propTypes = {
    setQuery: PropTypes.func,
    fetchRecipes: PropTypes.func,
}