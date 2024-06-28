import { useState, useCallback } from "react";
import Home from "./components/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import RecipeItem from "./components/RecipeItem.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import { Routes, Route } from 'react-router-dom';

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

function App() {
  const baseSearchUrl = "https://api.spoonacular.com/recipes/complexSearch?"
  
  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState(0);
  // const [favorites, setFavorites] = useState([]);
  // const [favoriteRecipe, setFavoriteRecipe] = useState({});

  const [query, setQuery] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState({});
  const [intolerances, setIntolerances] = useState({});
  
  const buildString = (obj) => {
    let string = "";
    for (let i in obj) {
      if (obj[i])
        string += i +",";
    }
    return string;
  }

  const buildQueryString = () => {
    const params = {
      apiKey: apiKey,
      query: query,
      includeIngredients: ingredients,
      diet: buildString(diet),
      intolerances: buildString(intolerances),
      number: 50
    }
    return new URLSearchParams(params).toString(); 
  }

  const fetchRecipes = useCallback(async () => {
    if (query === "" &&
        diet === "" &&
        intolerances === "" &&
        ingredients === ""
    ) return;
    
    try{  
      const queryString = buildQueryString();  
      const response = await fetch(`${baseSearchUrl}${queryString}`);
      
      if (!response.ok){
        if (response.status === 402)
          alert("Sorry, no more searches can be made today 😞");
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
      window.scrollTo(0, 0); 
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
  }, [query, ingredients, diet, intolerances])

  return (
      <>
        <header className="header">
          <NavBar setQuery={setQuery} fetchRecipes={fetchRecipes}/>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={
              <Home
                recipes={recipes}
                setRecipes={setRecipes}
                query={query}
                setQuery={setQuery}
                ingredients={ingredients}
                setIngredients={setIngredients}
                diet={diet}
                setDiet={setDiet}
                intolerances={intolerances}
                setIntolerances={setIntolerances}
                fetchRecipes={fetchRecipes}
              />
            } />
            <Route path="/recipe/:recipeId" element={<RecipeItem />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </>
  )
}

export default App
