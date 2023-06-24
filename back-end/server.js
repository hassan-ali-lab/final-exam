const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json

const port = 5000

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:1687/recipes')

// Create a schema recipe
const recipeSchema = new mongoose.Schema({
    title: String, // string
    description: String, // string
    ingredients: String, // array of strings
    instructions: String, // array of strings
    image: Buffer
})


// use recipeSchema to create a model
const Recipe = mongoose.model('recipes', recipeSchema)

// get all recipes
app.get('/recipes', async (req, res) => {
    const all_recipes = await Recipe.find({})
    if (!all_recipes) {
        return res.status(404).json({message: 'No recipes found'})
    }
    res.json(all_recipes)
})
// get one recipe
app.get('/recipes/:id', async (req, res) => {
    const recipe_id = req.params.id
    const recipe = await Recipe.findById(recipe_id)
    console.log(recipe_id)
    if (!recipe) {
        return res.status(404).json({message: 'Recipe not found'})
    }
    res.json(recipe)
})

// add a recipe
app.post('/recipes', async (req, res) => {
    // get axios post data



    const new_recipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        image: ""
        // image: req.body.image
    })
    await new_recipe.save()

    res.json({message: 'Recipe added successfully'})
})

// delete a recipe
app.delete('/recipes/:id', async (req, res) => {
    const recipe_id = req.params.id
    const recipe = await Recipe.findByIdAndDelete(recipe_id)
    if (!recipe) {
        return res.status(404).json({message: 'Recipe not found'})
    }
    res.json({message: 'Recipe deleted successfully'})

})


// update a recipe
app.put('/recipes/:id', async (req, res) => {
    const recipe_id = req.params.id
    const obj = await Recipe.findByIdAndUpdate(recipe_id, req.body, {new: true})
    if (!obj) {
        return res.status(404).json({message: 'Recipe not Updated'})
    }
    res.json({message: 'Recipe updated successfully'})
    console.log("Updated");
})

// search recipes
app.get('/search/:query', async (req, res) => {
    const query = req.params.query
    const recipes = await Recipe.find({
        $or: [
            {title: {$regex: query, $options: 'i'}},
            {description: {$regex: query, $options: 'i'}},
            {ingredients: {$regex: query, $options: 'i'}},
            {instructions: {$regex: query, $options: 'i'}},
        ]
    })
    if (!recipes) {
        return res.status(404).json({message: 'No recipes found'})
    }
    res.json(recipes)
})
// create server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`http://localhost:${port}`)
})

