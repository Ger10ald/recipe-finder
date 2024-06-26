import { useState, useCallback } from "react";
import NavBar from "./components/NavBar.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import Filter from "./components/Filter.jsx";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

function App() {
  const baseSearchUrl = "https://api.spoonacular.com/recipes/complexSearch?"
  
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [favoriteRecipe, setFavoriteRecipe] = useState({});

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

  // Refactor fetchRecipes
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

  // Refactor fetchSelectedRecipeDetails
  const fetchSelectedRecipeDetails = async (id) => {
    try{
      const queryString = buildQueryString();  
      const response = await fetch(`${baseSearchUrl}${queryString}`);

      if (!response.ok){
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
    } catch (error){
        console.log('There has been a problem with your fetch operation')
    }
  }

  return (
    <>
      <header className="header">
        <NavBar setQuery={setQuery} fetchRecipes={fetchRecipes}/>
      </header>
      <main className="main">
        <section id="recipes">
          {recipes.length !== 0 ? 
            <div className="recipe-card-ctn"> 
              <Filter setDiet={setDiet} setIntolerances={setIntolerances}/>
              <ul className="recipe-list">
                {recipes.map((r, index) => 
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
            </div> : 
            <p className="no-recipes-found-p">
              Add your ingredients to get started!</p>}
        </section>
        
        {/*{Object.keys(selectedRecipe).length !== 0 && <p>{selectedRecipe.strArea}</p>} */}
      </main>
    </>
  )
}

export default App
