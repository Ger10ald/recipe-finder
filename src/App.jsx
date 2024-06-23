import { useState } from "react";
import NavBar from "./components/NavBar.jsx";
import RecipeCard from "./components/RecipeCard.jsx";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [favoriteRecipe, setFavoriteRecipe] = useState({}); 

  const fetchRecipes = async (query) => {
    try{
      const response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${query.trim()}`);
      
      if (!response.ok){
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      const temp = [];
      
      // Ensure meals property exists and is an array
      if (data.meals && Array.isArray(data.meals)) {
        data.meals.forEach((r) => {
          temp.push(r);
        });
      } else {
        setRecipes([]);
      }
      setRecipes(temp);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const fetchSelectedRecipeDetails = async (id) => {
    try{
      const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

      if (!response.ok){
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();

      if (data.meals && Array.isArray(data.meals)){
        setSelectedRecipe(data.meals[0]);
      }
      else{
        setSelectedRecipe({});
      }
      
    } catch (error){
        console.log('There has been a problem with your fetch operation')
    }
  }

  return (
    <>
      <NavBar fetchRecipes={fetchRecipes}/>
      <ul>{recipes.map((r, index) => 
            <li key={index}
                className="recipe-item">
              <RecipeCard
                image={r.strMealThumb}
                alt={r.strMeal}
                title={r.strMeal}
                fetchRecipeDetails={() => fetchSelectedRecipeDetails(r.idMeal)}/>
            </li>
        )}
      </ul>
      {Object.keys(selectedRecipe).length !== 0 && <p>{selectedRecipe.strArea}</p>} 
    </>
  )
}

export default App
