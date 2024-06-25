import { useState } from "react";
import NavBar from "./components/NavBar.jsx";
import RecipeCard from "./components/RecipeCard.jsx";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

function App() {
  const baseUrl = "https://api.spoonacular.com/recipes/complexSearch?"
  
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [favoriteRecipe, setFavoriteRecipe] = useState({});

  const [query, setQuery] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  
  const buildQueryString = () => {
    const params = {
      apiKey: apiKey,
      query: query,
      includeIngredients: ingredients,
      diet: diet,
      intolerances: intolerances,
      number: 25
    }
    return new URLSearchParams(params).toString(); 
  }

  const fetchRecipes = async () => {
    try{  
      const queryString = buildQueryString();    
      const response = await fetch(`${baseUrl}${queryString}`);
      
      if (!response.ok){
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      const temp = [];
      
      // Ensure meals property exists and is an array
      if (data.results && Array.isArray(data.results)) {
        data.results.forEach((r) => {
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
      <header className="header">
        <NavBar setQuery={setQuery} fetchRecipes={fetchRecipes}/>
      </header>
      <ul>{recipes.map((r, index) => 
            <li key={index}
                className="recipe-item">
              <RecipeCard
                image={r.image}
                alt={r.title}
                title={r.title}
                fetchRecipeDetails={() => fetchSelectedRecipeDetails(r.idMeal)}/>
            </li>
        )}
      </ul>
      {/*{Object.keys(selectedRecipe).length !== 0 && <p>{selectedRecipe.strArea}</p>} */}
    </>
  )
}

export default App
