import PropTypes from 'prop-types'

export default function RecipeCard({image, alt, title, fetchRecipeDetails}){
    return(
        <div className="card-ctn">
            <img className="recipe-image" src={image} alt={alt}></img>
            <h3 className="recipe-title">{title}</h3>
            <button className="view-recipe-btn"
                    onClick={fetchRecipeDetails}>
                View Recipe!
            </button>
        </div>
    );
}

RecipeCard.propTypes = {
    image: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    fetchRecipeDetails: PropTypes.func,
}