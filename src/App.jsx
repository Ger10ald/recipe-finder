import { useState, useCallback, useEffect } from "react";
import Home from "./components/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import RecipeItem from "./components/RecipeItem.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import { Routes, Route } from 'react-router-dom';

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

function App() {
  const baseSearchUrl = "https://api.spoonacular.com/recipes/complexSearch?"
  
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : "";
  });

  const [query, setQuery] = useState(() => {
    const savedQuery = localStorage.getItem("query");
    return savedQuery ? JSON.parse(savedQuery) : "";
  });
  
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const [ingredients, setIngredients] = useState("");
  const [diet, setDiet] = useState({});
  const [intolerances, setIntolerances] = useState({});
  const [loading, setLoading] = useState(false);
  
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
      number: 100
    }
    return new URLSearchParams(params).toString(); 
  }

  useEffect(() => {
    localStorage.setItem("query", JSON.stringify(query));
    localStorage.setItem("recipes", JSON.stringify(recipes));
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [query, recipes, ingredients])
  
  
  const fetchRecipes = useCallback(async () => {
    if (!query && !ingredients && !Object.keys(diet).length && !Object.keys(intolerances).length) return;

    setLoading(_ => true);
    
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
      setLoading(_ => false); 
      window.scrollTo(0, 0); 
    
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        setLoading(_ => false); 
    }
  }, [query, ingredients, diet, intolerances])

  return (
      <>
        <header className="header">
          <NavBar setQuery={setQuery} fetchRecipes={fetchRecipes} numberOfFavorites={favorites.length}/>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={
              <Home
                recipes={recipes}
                setDiet={setDiet}
                setIntolerances={setIntolerances}
                loading={loading}
                noRecipeFoundMessage="Add your ingredients to get started!"
             />} 
            />
            <Route path="/recipe/:recipeId" element={<RecipeItem favorites={favorites} setFavorites={setFavorites}/>} />
            <Route path="/favorites" element={
              <Home 
                recipes={favorites} 
                setDiet={setDiet}
                setIntolerances={setIntolerances}
                loading={loading}
                noRecipeFoundMessage="You don't have any favorites yet!"
              />} 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </>
  )
}

export default App
