import './FilterStyle.css';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export default function Filter({setDiet, setIntolerances}) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    useEffect(() => {
        const savedDiet = JSON.parse(localStorage.getItem('diet')) || {};
        const savedIntolerances = JSON.parse(localStorage.getItem('intolerances')) || {};
        setDiet(savedDiet);
        setIntolerances(savedIntolerances);
    }, [setDiet, setIntolerances]);

    const toggleExpandOn = () => {
        setIsExpanded(true);
    }

    const toggleExpandOff = () => {
        setIsExpanded(false);
    }

    const handleDietChange = (event) => {
        const { value, checked } = event.target;
        setDiet(d => {
            const updatedDiet = { ...d, [value]: checked };
            localStorage.setItem('diet', JSON.stringify(updatedDiet));
            return updatedDiet;
        });
    }

    const handleIntoleranceChange = (event) => {
        const { value, checked } = event.target;
        setIntolerances(i => {
            const updatedIntolerances = { ...i, [value]: checked };
            localStorage.setItem('intolerances', JSON.stringify(updatedIntolerances));
            return updatedIntolerances;
        });
    }

    return (
        <section className="filter-section">
            <div className="filter-heading">
                <button onClick={toggleExpandOn}
                    className={!isExpanded ? "arrow down-arrow" : "arrow down-arrow hidden"}
                    aria-label='Toggles Filters'>
                    <svg width="35px" height="35px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000" />
                    </svg>
                </button>
            </div>
            <div className={isExpanded ? "filter-ctn" : "hidden"}>
                <div className="filter" id="diet-filter">
                    <h2 className="filter-title">Diet</h2>
                    <div className="options-ctn">
                        <label>
                            <input onChange={handleDietChange} className="check-box" type="checkbox" name="Vegetarian" value="Vegetarian" defaultChecked={JSON.parse(localStorage.getItem('diet'))?.Vegetarian || false} />
                            Vegetarian
                        </label>
                        <label>
                            <input onChange={handleDietChange} className="check-box" type="checkbox" name="Vegan" value="Vegan" defaultChecked={JSON.parse(localStorage.getItem('diet'))?.Vegan || false} />
                            Vegan
                        </label>
                        <label>
                            <input onChange={handleDietChange} className="check-box" type="checkbox" name="GlutenFree" value="GlutenFree" defaultChecked={JSON.parse(localStorage.getItem('diet'))?.GlutenFree || false} />
                            Gluten-Free
                        </label>
                        <label>
                            <input onChange={handleDietChange} className="check-box" type="checkbox" name="Pescetarian" value="Pescetarian" defaultChecked={JSON.parse(localStorage.getItem('diet'))?.Pescetarian || false} />
                            Pescetarian
                        </label>
                        <label>
                            <input onChange={handleDietChange} className="check-box" type="checkbox" name="Paleo" value="Paleo" defaultChecked={JSON.parse(localStorage.getItem('diet'))?.Paleo || false} />
                            Paleo
                        </label>
                    </div>
                </div>
                <div className="filter" id="intolerance-filter">
                    <h2 className="filter-title">Intolerances</h2>
                    <div className="options-ctn">
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Dairy" value="Dairy" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Dairy || false} />
                            Dairy
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Egg" value="Egg" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Egg || false} />
                            Egg
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Gluten" value="Gluten" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Gluten || false} />
                            Gluten
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Grain" value="Grain" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Grain || false} />
                            Grain
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Peanut" value="Peanut" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Peanut || false} />
                            Peanut
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Seafood" value="Seafood" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Seafood || false} />
                            Seafood
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Sesame" value="Sesame" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Sesame || false} />
                            Sesame
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Shellfish" value="Shellfish" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Shellfish || false} />
                            Shellfish
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Soy" value="Soy" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Soy || false} />
                            Soy
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Sulfite" value="Sulfite" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Sulfite || false} />
                            Sulfite
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="TreeNut" value="Tree Nut" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.TreeNut || false} />
                            Tree Nut
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Wheat" value="Wheat" defaultChecked={JSON.parse(localStorage.getItem('intolerances'))?.Wheat || false} />
                            Wheat
                        </label>
                    </div>
                </div>
                <button onClick={toggleExpandOff}
                    className={isExpanded ? "arrow up-arrow" : "arrow up-arrow hidden"}
                    aria-label='Toggles Filters'>
                    <svg width="35px" height="35px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000" />
                    </svg>
                </button>
            </div>
        </section>
    );
}

Filter.propTypes = {
    setDiet: PropTypes.func,
    setIntolerances: PropTypes.func,
}