import PropTypes from 'prop-types'
import './RecipeCardStyle.css';
import { handleImageError } from "../utils/utils.js";
import {useNavigate} from 'react-router-dom';

export default function RecipeCard({image, alt, title, id}){

    const navigate = useNavigate();

    const viewRecipe = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
        navigate(`/recipe/${id}`);
        window.scrollTo(0, 0);
    }

    return(
        <div className="card-ctn">
            <img className="recipe-image" 
                src={image} 
                alt={alt}
                onError={handleImageError}></img>
            <h3 className="recipe-title">{title}</h3>
            <button className="view-recipe-btn"
                    onClick={viewRecipe}>
                View Recipe!
            </button>
        </div>
    );
}

RecipeCard.propTypes = {
    image: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number.isRequired,
}