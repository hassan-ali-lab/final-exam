import axios from "axios";
import {Link} from "react-router-dom";

export const Create = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const {target} = event;
        const {description, title, ingredients, instructions} = target.elements;
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
        const file = event.target.image.files[0];
        const formData = new FormData();
        formData.append('json', {
            image: file,
            title: title.value,
            description: description.value,
            ingredients: ingredients.value,
            instructions: instructions.value
        });

        // const fileReader = new FileReader();
        // fileReader.readAsDataURL(file);
        // console.log(FileReader)
        axios.post('http://localhost:5000/recipes', {

            image: "",
            title: title.value,
            description: description.value,
            ingredients: ingredients.value,
            instructions: instructions.value
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'// 'multipart/form-data',// otherwise axios will send it as application/json and backend will not be able to parse it

            }
        }).then((response) => {
            console.log(response);
        })
        //

    }
    return <div>
        <div>
            <Link to={'/create'}>Create</Link>
            <Link to={'/'}>Home</Link>

        </div>
        <h1>Create Resipe</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" required/> <br/>

            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text" required/> <br/>

            <label htmlFor="ingredients">Ingredients</label>
            <input id="ingredients" name="ingredients" type="text" required/> <br/>

            <label htmlFor="instructions">Instructions</label>
            <input id="instructions" name="instructions" type="text" required/> <br/>

            <label htmlFor="image">Image</label>
            <input id="image" name="image" type="file" /> <br/>

            <button type={'submit'}>Create Recipe</button>
        </form>

    </div>
}
