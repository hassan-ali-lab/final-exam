import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

export const Update = () => {
    const [recipes, setRecipes] = useState(null)
    const [recipesPopulated, setRecipesPopulated] = useState(false)
    const params = useParams()
    const id = params.id

    useEffect(() => {
        axios.get(`http://localhost:5000/recipes/${id}`).then((response) => {
            console.log(response.data);

            setRecipes(response.data)
        })

    }, [])

    useEffect(() => {
        if (recipes) {
            setRecipesPopulated(true)


        }
    }, [recipes])

    useEffect(() => {
        if (recipesPopulated) {

            // populate the form
            const {title, description, ingredients, instructions} = recipes
            const titleInput = document.getElementById('title')
            const descriptionInput = document.getElementById('description')
            const ingredientsInput = document.getElementById('ingredients')
            const instructionsInput = document.getElementById('instructions')
            titleInput.value = title
            descriptionInput.value = description
            ingredientsInput.value = ingredients
            instructionsInput.value = instructions
        }
    }, [recipesPopulated])
    const handleUpdateSubmit = (event) => {
        event.preventDefault()
        const {target} = event
        const {description, title, ingredients, instructions} = target.elements

        function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
        if(isNumber(title.value)) {
            alert('Title must be a string')
            return
        }
        if(isNumber(description.value)) {
            alert('Description must be a string')
            return
        }
        if(isNumber(ingredients.value)) {
            alert('Ingredients must be a string')
            return
        }
        if(isNumber(instructions.value)) {
            alert('Instructions must be a string')
            return
        }

        axios.put(`http://localhost:5000/recipes/${id}`,
            {
                id: id,
                title: title.value,
                description: description.value,
                ingredients: ingredients.value,
                instructions: instructions.value
            })

    }
    return <div>

        <div>
            <Link to={'/create'}>Create</Link>
            <Link to={'/'}>Home</Link>
        </div>
        <h1>Update Resipe</h1>
        {recipesPopulated ?
            <form onSubmit={handleUpdateSubmit}>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" required/> <br/>

                <label htmlFor="description">Description</label>
                <input id="description" name="description" type="text" required/> <br/>

                <label htmlFor="ingredients">Ingredients</label>
                <input id="ingredients" name="ingredients" type="text" required/> <br/>

                <label htmlFor="instructions">Instructions</label>
                <input id="instructions" name="instructions" type="text" required/> <br/>

                <label htmlFor="image">Image</label>
                <input id="image" name="image" type="file"/> <br/>

                <button type={'submit'}>Update Recipe</button>
            </form> : <div></div>}
    </div>
}