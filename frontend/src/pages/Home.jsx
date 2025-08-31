import React, { useState } from "react";
import FormSearch from "../components/FormSearch";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
export default function Home() {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [error, setError] = useState(null);

    const searchRecipes = async (filters) => {

        try {
            setLoading(true);
            setCheck(true);

            const queryString = new URLSearchParams({
                query: filters.query || "",
                cuisine: filters.cuisine || "",
                diet: filters.diet || "",
                maxReadyTime: filters.time || ""
            }).toString();

            const response = await fetch(`http://localhost:3000/api/recipes/search?${queryString}`);

            if (!response.ok) throw new Error(`Error fetching data ->  ${response.status}`);
            const data = await response.json();
            setRecipes(data.results || []);
            setLoading(false);
        } catch (e) {
            setError(e.message);
            setRecipes([]);
        } finally {
            setLoading(false);
        };
    };


    return (
        <>

            {!recipes.length > 0 && <FormSearch onSearch={searchRecipes} />}
            {loading && <p className="text-center text-lg text-gray-600">Loading...</p>}
            {error && <p className="text-center text-lg text-red-600">{error}</p>}
            {recipes.length > 0 && (
                <div className="result py-12">
                    <div className="text-center">
                        <h1 className="text-xl  font-semibold tracking-tight text-balance text-gray-600 sm:text-7xl my-8">Result for   </h1>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 m-14">
                            {recipes.map((recipe, index) => (
                                <Card recipe={recipe} key={index} />
                            ))}
                        </div>
                    </div>
                </div >
            )
            }
            {
                recipes.length === 0 && check && (<div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-gray-900">No Results Found</h1>
                    <p className="text-lg text-gray-600">Try searching for something else</p>
                </div>)
            }
        </>
    )
}