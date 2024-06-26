import './FilterStyle.css';
import {useState} from 'react';
import PropTypes from 'prop-types';

export default function Filter({setDiet, setIntolerances}) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleExpandOn = () => {
        setIsExpanded(_ => true);
    }

    const toggleExpandOff = () => {
        setIsExpanded(_ => false);
    }

    const handleDietChange = (event) => {
        const {value, checked} = event.target;
        setDiet(d => ({
            ...d,
            [value]: checked
        }));
    }

    const handleIntoleranceChange = (event) => {
        const {value, checked} = event.target;
        setIntolerances(i => ({
            ...i,
            [value]: checked
        }));
    }

    return(
        <section className="filter-section">
            <div className="filter-heading">
                <button onClick={toggleExpandOn}
                        className={isExpanded === false ? "arrow down-arrow" : "arrow down-arrow hidden"}
                        aria-label='Toggles Filters'>
                    <svg width="35px" height="35px" viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000" />
                    </svg>
                </button>
            </div>
            <div className={isExpanded ? "filter-ctn" : "hidden"}>
                <div className="filter" id="diet-filter">
                    <h2 className="filter-title">Diet</h2>
                    <div className="options-ctn"> 
                        <label>
                            <input onChange={handleDietChange} className="check-box" type="checkbox" name="Vegetarian" value="Vegetarian"  />
                            Vegetarian
                        </label>
                        <label>
                            <input onChange={handleDietChange} className="check-box" type="checkbox" name="Vegan" value="Vegan"  />
                            Vegan
                        </label>
                        <label>
                            <input onChange={handleDietChange} className="check-box" type="checkbox" name="GlutenFree" value="Gluten Free"  />
                            Gluten-Free
                        </label>
                        <label>
                            <input onChange={handleDietChange} className="check-box" type="checkbox" name="Pescetarian" value="Pescetarian"  />
                            Pescetarian
                        </label>
                        <label>
                            <input onChange={handleDietChange} className="check-box" type="checkbox" name="Paleo" value="Paleo"  />
                            Paleo
                        </label>
                    </div>
                </div>
                <div className="filter" id="intolerance-filter">
                <h2 className="filter-title">Intolerances</h2>
                    <div className="options-ctn"> 
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Dairy" value="Dairy"  />
                            Dairy
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Egg" value="Egg"  />
                            Egg
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Gluten" value="Gluten"  />
                            Gluten
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Grain" value="Grain"  />
                            Grain
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Peanut" value="Peanut"  />
                            Peanut
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Seafood" value="Seafood"  />
                            Seafood
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Sesame" value="Sesame"  />
                            Sesame
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Shellfish" value="Shellfish"  />
                            Shellfish
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Soy" value="Soy"  />
                            Soy
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Sulfite" value="Sulfite"  />
                            Sulfite
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="TreeNut" value="Tree Nut"  />
                            Tree Nut
                        </label>
                        <label>
                            <input onChange={handleIntoleranceChange} className="check-box" type="checkbox" name="Wheat" value="Wheat"  />
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