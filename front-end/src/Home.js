import {useState} from "react";
import axios from "axios";
import {Link, Router} from "react-router-dom";


function Home() {

    const [recipes, setRecipes] = useState([])
    const [recipe, setRecipe] = useState(null)
    const getRecipes = async () => {
        const response = await axios.get('http://localhost:5000/recipes')
        return response.data
    }

    getRecipes().then(r => {
        setRecipes(r)
    })

    return (
        <div className="Home">

            <div>
                <Link to={'/create'}>Create</Link>
                <Link to={'/'}>Home</Link>

            </div>
            {recipe ? <div>
                <hr/>
                <h1>View Resipe</h1>

                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
                <hr/>

            </div> : <div></div>}

            <hr/>

            <h1>Search</h1>
            <form onSubmit={(e)=>{
                e.preventDefault()
                const {target} = e
                const {search} = target.elements
                const searchValue = search.value
                axios.get(`http://localhost:5000/search/${searchValue}`).then((response) => {
                    console.log(response.data);
                    setRecipes(response.data)
                })
            }}>
                <input type="text" placeholder="Search..."/>
                <button type="submit">Search</button>
            </form>

            <hr/>
            <h1>All Recipes</h1>
            <div className="recipes">
                {recipes.map((recipe) => {

                    return (
                        <div key={recipe._id} className="recipe">
                            <h2>{recipe.title}</h2>
                            {/*<img src={recipe.image} alt={recipe.title}/>*/}
                            <button onClick={
                                () => {
                                    setRecipe(recipe)
                                }
                            } type={'submit'}>View Recipe
                            </button>
                            <button onClick={
                                () => {
                                    // conferm
                                    if (!window.confirm('Are you sure you want to delete this recipe?')) {
                                        return;
                                    }
                                    axios.delete(`http://localhost:5000/recipes/${recipe._id}`).then((response) => {
                                        console.log(response);
                                    })
                                }
                            }>Delete
                            </button>

                            <Link to={`/update/${recipe._id}`}>Update</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;