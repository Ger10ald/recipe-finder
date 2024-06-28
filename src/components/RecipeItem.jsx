import './RecipeItemStyle.css';
import { useParams } from 'react-router-dom';
import {useEffect, useState, useCallback} from 'react';
import { handleImageError, stripHtmlTags } from "../utils/utils.js";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

export default function RecipeItem(){
    
    const params  = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);

    console.log(recipeDetails);

    const fetchRecipeDetails = useCallback(async () => {
        try {
            const storedData = localStorage.getItem(params.recipeId);

            if (storedData){
                const parsedData = JSON.parse(storedData);
                setRecipeDetails(parsedData);
                setRecipeIngredients(parsedData.extendedIngredients.map(i => `${i.measures.us.amount} ${i.measures.us.unitShort} ${i.name}`));
                setInstructions(parsedData.analyzedInstructions.map(i => `${i.step}`));
            }
            else{
                const response = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/information?apiKey=${apiKey}&includeNutrition=false`);
          
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                setRecipeDetails(data);
                setRecipeIngredients(data.extendedIngredients.map( i => `${i.measures.us.amount} ${i.measures.us.unitShort} ${i.name}`));
                setInstructions(data.analyzedInstructions.map(i => `${i.step}`));

                localStorage.setItem(params.recipeId, JSON.stringify(data));
            }
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      }, [params.recipeId]);

    useEffect(() => {
        fetchRecipeDetails();
    }, [fetchRecipeDetails]);
  
    if (!recipeDetails) return <div>Loading...</div>;
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