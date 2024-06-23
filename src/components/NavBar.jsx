import PropTypes from 'prop-types';
import {useState} from 'react';

export default function NavBar({fetchRecipes}){
    const [query, setQuery] = useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();
        if (query.trim() !== "")
            fetchRecipes(query);
        console.log(query.trim());
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
                    value={query}
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
    fetchRecipes: PropTypes.func,
}