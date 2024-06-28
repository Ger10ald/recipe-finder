import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NavBarStyle.css';

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
            <p className='nav-p'>Let's Eat!</p>
            <form className="main-query" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                    className="search-bar"/>
                <input 
                    type="submit"
                    id="submit-btn"
                    value="Submit"/>
            </form> 
            <div className="icon-ctn">
                <Link to={'/'} className="home-icon icon">Home</Link>
                <a className="fav-icon icon" href=""> Favorites</a> 
            </div>      
        </nav>
    </>);
}

NavBar.propTypes = {
    setQuery: PropTypes.func,
    fetchRecipes: PropTypes.func,
}