import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()
const api = axios.create({
    baseURL: 'https://api.spoonacular.com',
    params: {
        apiKey: process.env.SPOONACULAR_API_KEY
    }
})
export async function spoonSearch({ query, diet, cuisine, Number: maxReadyTime, number = 10, offset = 0 }) {

    const { data } = await api.get('/recipes/complexSearch', {
        params: {
            query,
            diet,
            cuisine,
            maxReadyTime,
            number,
            offset,
            addRecipeInformation: false,
        }
    })
    return data;
}

export async function spoonGetRecipe(id) {
    const { data } = await api.get(`/recipes/${id}/information`, {
        params: {
            includeNutrition: false
        }
    })

    return data;
}

export async function spoonRandom(number = 1) {
    const { data } = await api.get('/recipes/random', {
        params: {
            number,
            addRecipeInformation: false
        }
    })
    return data;


}