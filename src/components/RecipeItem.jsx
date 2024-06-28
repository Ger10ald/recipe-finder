import './RecipeItemStyle.css';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { handleImageError } from "../utils/utils.js";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

export default function RecipeItem(){
    const params  = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    
    useEffect(() => {
      const fetchRecipeDetails = async () => {
        try {
          const response = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=${apiKey}&includeNutrition=false`);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setRecipeDetails(data);
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      };
  
      fetchRecipeDetails();
    }, [params.recipeId]);
  
    if (!recipeDetails) return <div>Loading...</div>;
    return(
        <section id="recipe-details-page">
            <div className="details-and-picture">
                <img className="recipe-image"
                    src={recipeDetails.image}
                    alt={recipeDetails.title}
                    onError={handleImageError}/>
                <div className="details-only">
                    <h1 className="details-text title">{recipeDetails.title}</h1>
                    <h2 className="details-text source">More details at {recipeDetails.sourceName}</h2>
                    <div className="serving-and-cooking-time">
                        <h3 className="details-text serving-size">Serving Size: {recipeDetails.servings} people</h3>
                        <h3 className="details-text cooking-time">Ready in {recipeDetails.readyInMinutes} minutes</h3>
                    </div>
                    <div className="btn-ctn">
                        <button className="btn favorite">
                            Add to Favorites
                        </button>
                        <a className="btn directions"
                            target='_blank'
                            rel='noreferrer' 
                            href={recipeDetails.sourceUrl}>
                                Go to Page
                        </a>
                    </div>
                </div>
            </div>
            {/* <div className="ingredients">
                <h2>Ingredients</h2>
                <ul className="ingredient-list">
                    {recipeDetails.map((i, index) => 
                        <li className="ingredient"
                            key={index}>
                                {i}
                        </li>
                    )}
                </ul>
            </div> */}
        </section>
    );
}