import { useEffect } from "react";
import PropTypes from 'prop-types';
import RecipeCard from "./RecipeCard.jsx";
import Filter from "./Filter.jsx";
import LoadingPage from './LoadingPage.jsx';

export default function Home({
    recipes,
    setDiet,
    setIntolerances,
    loading
}) {
    
    useEffect(() => {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition, 10));
          sessionStorage.removeItem('scrollPosition'); 
        }
    }, []);

    if (loading) return <LoadingPage/>;
    return (
        <>
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
                Add your ingredients to get started!</p>}
            </section>
        </>
    )
}

Home.propTypes = {
    recipes: PropTypes.array,
    setDiet: PropTypes.func,
    setIntolerances: PropTypes.func,
    loading: PropTypes.bool
}
