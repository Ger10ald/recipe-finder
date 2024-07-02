import { useEffect } from "react";
import PropTypes from 'prop-types';
import RecipeCard from "./RecipeCard.jsx";
import Filter from "./Filter.jsx";
import LoadingPage from './LoadingPage.jsx';
import { scrollToPrev } from "../utils/utils.js";

export default function Home({
    recipes,
    setDiet,
    setIntolerances,
    loading,
    noRecipeFoundMessage
}) {
    
    useEffect(() => {
        scrollToPrev();
    }, []);

    if (loading) return <LoadingPage/>;
    return (
    
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
                            id={r.id}/>
                    </li>
                    )}
                </ul> 
            </div> : 
            <p className="no-recipes-found-p">
            {noRecipeFoundMessage}</p>}
        </section>
    )
}

Home.propTypes = {
    recipes: PropTypes.array,
    setDiet: PropTypes.func,
    setIntolerances: PropTypes.func,
    loading: PropTypes.bool,
    noRecipeFoundMessage: PropTypes.string
}
