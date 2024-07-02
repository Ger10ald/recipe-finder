import { useEffect, useState } from "react";
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
    noRecipeFoundMessage,
    currentPage,
    setCurrentPage
}) {
    
    const pageCount = 20;
 
    const [startingIndex, setStartingIndex] = useState(() => {
        const savedStart = localStorage.getItem("start");
        return savedStart ? JSON.parse(savedStart) : 0;
    });
    
    const [lastIndex, setLastIndex] = useState(() =>{
        const savedLast = localStorage.getItem("last");
        return savedLast ? JSON.parse(savedLast) : pageCount; 
    });

    useEffect(() => {
        scrollToPrev();
    }, []);

    useEffect(() =>{
        localStorage.setItem("start", JSON.stringify(startingIndex));
        localStorage.setItem("last", JSON.stringify(lastIndex));
    }, [startingIndex, lastIndex]);

    useEffect(() => {
        if (currentPage === 0){
            setStartingIndex(_ => 0);
            setLastIndex(_ => pageCount);
        }
    }, [currentPage]);

    const goToNextPage = ()  => {
        setStartingIndex(s => lastIndex + 1);
        setLastIndex(l => Math.min(pageCount + l + 1, recipes.length));
        setCurrentPage(c => c + 1);
        window.scrollTo(0, 0); 
    }

    const goToPrevPage = () => {
        setLastIndex(l => {
            return l - startingIndex < pageCount 
            ? l - (l - startingIndex) - 1 
            : Math.max(l - pageCount - 1, pageCount + 1)
        });
        setStartingIndex(s => Math.max((s - pageCount) - 1, 0));
        setCurrentPage(c => c - 1);
        window.scrollTo(0, 0); 
    }

    if (loading) return <LoadingPage/>;
    return (
        <section id="recipes">
        {recipes.length !== 0 ? 
            <div className="recipe-card-ctn"> 
                <Filter setDiet={setDiet} setIntolerances={setIntolerances}/>
                <ul className="recipe-list">
                    {recipes.slice(startingIndex, lastIndex).map((r, index) => 
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
                <div className="arrow-ctn">
                    <button className={startingIndex !== 0 ? "arrow bottom-arrow prev-arrow" : "hidden"}
                            aria-label="goes to previous page"
                            onClick={goToPrevPage}>
                        <svg fill="#000000" width="75" height="50px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="M629.228 331.011 0 960.239l629.228 629.228 155.901-155.901-363.071-363.071h1497.931V849.984H422.058l363.071-363.072z" fillRule="evenodd"/>
                        </svg>
                    </button>
                    <button className={lastIndex !== recipes.length ? "arrow bottom-arrow next-arrow" : "hidden"}
                            aria-label="goes to next page"
                            onClick={goToNextPage}>
                        <svg fill="#000000" width="75px" height="50" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1290.761 331.004 1134.86 486.905l363.071 363.071H0v220.511h1497.931l-363.071 363.071 155.901 155.902 629.228-629.228z" fillRule="evenodd"/>
                        </svg>
                    </button>
                </div> 
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
    noRecipeFoundMessage: PropTypes.string,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
}
