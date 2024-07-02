import PropTypes from 'prop-types';
import './RecipeItemStyle.css';
import LoadingPage from './LoadingPage.jsx';
import { useParams } from 'react-router-dom';
import {useEffect, useState, useCallback} from 'react';
import { handleImageError, stripHtmlTags } from "../utils/utils.js";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

export default function RecipeItem({setFavorites, favorites}){
    
    const params  = useParams();

    const [isInFavorites, setIsInFavorites] = useState();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);

    const addToFavorites = () => {
        setFavorites([...favorites, recipeDetails]);
        
    }
    const removeFromFavorites = () => {
        setFavorites(prevFavorites => prevFavorites.filter((recipe) => recipe.id != parseInt(params.recipeId, 10)));
    }

    const fetchRecipeDetails = useCallback(async () => {
        try {
            const storedData = localStorage.getItem(params.recipeId);

            if (storedData){
                const parsedData = JSON.parse(storedData);
                setRecipeDetails(parsedData);
                setRecipeIngredients(parsedData.extendedIngredients.map(i => `${i.measures.us.amount} ${i.measures.us.unitShort} ${i.name}`));
                setInstructions(parsedData.analyzedInstructions[0].steps.map(i => `${i.step}`));
            }
            else{
                const response = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=${apiKey}&includeNutrition=false`);
          
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                setRecipeDetails(data);
                setRecipeIngredients(data.extendedIngredients.map( i => `${i.measures.us.amount} ${i.measures.us.unitShort} ${i.name}`));
                setInstructions(data.analyzedInstructions[0].steps.map(i => `${i.step}`));
                localStorage.setItem(params.recipeId, JSON.stringify(data));
            }
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      }, [params.recipeId]);

    useEffect(() => {
        fetchRecipeDetails();
    }, [fetchRecipeDetails]);

    useEffect(() => {
        if (Array.isArray(favorites) && favorites.some(recipe => recipe.id === parseInt(params.recipeId, 10))) {
            setIsInFavorites(true);
        } else {
            setIsInFavorites(false);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites, params.recipeId]);

    if (!recipeDetails) return <LoadingPage/>;
    return(
        <main id="recipe-details-page">
            <section id="details-and-picture">
                <img id="image" 
                    src={recipeDetails.image}
                    alt={recipeDetails.title}
                    onError={handleImageError}/>
                <div className="details-only">
                    <h1 className="details-text title">{recipeDetails.title}</h1>
                    <h3 className="details-text source">More details at {recipeDetails.sourceName}</h3>
                    <div className="serving-and-cooking-time">
                        <h4 className="details-text serving-size">Serving Size: {recipeDetails.servings} people</h4>
                        <h4 className="details-text cooking-time">Ready in: {recipeDetails.readyInMinutes} minutes</h4>
                    </div>
                    <div className="btn-ctn">
                        {!isInFavorites ? 
                            <button 
                                onClick={addToFavorites}
                                className="btn favorite">
                                Add to Favorites
                            </button> : 
                            <button 
                                onClick={removeFromFavorites}
                                className="btn favorite">
                                Remove from Favorites
                            </button> 
                        }
                        <a className="btn directions"
                            target='_blank'
                            rel='noreferrer' 
                            href={recipeDetails.sourceUrl}>
                                Go to Page
                        </a>
                    </div>
                </div>
            </section>
            <section id="summary" >
                <h2 className="summary-header section-header">Summary</h2>
                <p className="summary-p">{stripHtmlTags(recipeDetails.summary)}</p>
            </section>
            <section id="ingredients">
                <h2 className="ingredients-header section-header">Ingredients</h2>
                <ul className="ingredients-list">
                    {recipeIngredients.map((i, index) => 
                        <li className="ingredient"
                            key={index}>
                                {i}
                        </li>
                    )}
                </ul>
            </section>
            <section id="instructions">
                <h2 className="instruction-header section-header">Instructions</h2>
                <ol className="instructions-list">
                    {instructions.map((i, index) => 
                        <li className="instruction"
                            key={index}>
                                {i}
                        </li>
                    )}
                </ol>
            </section>
        </main>
    );
}

RecipeItem.propTypes = {
    setFavorites: PropTypes.func,
    favorites: PropTypes.array
}