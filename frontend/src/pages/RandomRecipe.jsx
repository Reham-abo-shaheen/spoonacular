import React, { useState, useEffect } from "react";
import RecipeComponent from "../components/RecipeComponent";
import { apiFetch } from "../api/client";
export default function RandomRecipe() {
    const [randomRecipe, setRandomRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRandomRecipe = async () => {

        try {
            setLoading(true);
            setError(null);
            const response = await apiFetch('api/recipes/random');

            setRandomRecipe(response || []);

        } catch (e) {
            console.error(e.message);
            setError(e.message);
            setRandomRecipe(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomRecipe();
    }, []);

    return (
        <>
            <div className="relative text-center mt-20 z-100 ">
                <button onClick={fetchRandomRecipe}
                    type="submit"
                    className="cursor-pointer rounded-xl bg-lime-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    New Recipe
                </button>
            </div>
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    Error: {error}
                </div>
            )}

            {loading && <p className="mt-4">Loading recipe...</p>}

            {randomRecipe && !loading && (
                <RecipeComponent recipe={randomRecipe} />
            )}

            {!randomRecipe && !loading && !error && (
                <p className="mt-4 text-gray-500">Click the button to get a random recipe!</p>
            )}

        </>
    );
}