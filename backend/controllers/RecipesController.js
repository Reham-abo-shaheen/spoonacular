import axios from 'axios';

export const getRandomRecipe = async (req, res) => {
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/random', {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
                number: 1,
            }
        })

        const recipe = response.data.recipes[0];
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipe' });
    }
}

export const search = async (req, res) => {
    const { query, cuisine, diet, time } = req.query;
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
                query,
                cuisine,
                diet,
                maxReadyTime: time,
                number: 10,

            }
        })

        const recipe = response.data;
        res.json(recipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch recipe' });
    }
}

export const getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
            }
        })
        const recipe = response.data;
        res.json(recipe);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch recipe' });
    }
}