import {useState} from 'react';

export default function NavBar(){
    const [query, setQuery] = useState("");

    const handleSubmit = () =>{
        
    }

    return(<>
        <nav>
            <p className='nav-p'>Let's Eat</p>
            <form className="query" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search Recipe..."
                    />
            </form> 
            <div className="icon-ctn">
                <a className="home-icon" href="">Home</a>
                <a className="fav-icon" href=""> Favorites</a> 
            </div>      
        </nav>
    </>);
}