import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Navigate } from "react-router-dom";
import { apiFetch } from "../api/client";
library.add(fas, far, fab) // <- add them to the library
export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const token = localStorage.getItem("token");

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = async () => {
        const response = await apiFetch("/api/favorites", {
            method: "GET",
            token,

        })
        localStorage.setItem("favorites", JSON.stringify(response));
        setFavorites(response);



    };


    const removeFavorite = async (id) => {
        if (!id) {
            alert("Recipe ID is undefined");

        }

        try {
            const res = await fetch(`http://localhost:3000/api/favorites/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + token
                }
            });

            const data = await res.json();
            alert(data.msg);

            const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
            setFavorites(updatedFavorites);

        } catch (error) {
            console.log(error);
            alert("Error removing favorite");
        }


    }




    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return (
        <div className="p-4">
            <h1 className="text-3xl text-center my-16 font-semibold tracking-tight text-balance text-lime-500">My Favorite Recipes</h1>

            {favorites.length === 0 ? (
                <div className="text-center h-full">
                    <p className="text-2xl font-bold mb-4 text-gray-400 text-center" >No favorite recipes yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {favorites.map((recipe, index) => (
                        <div key={index} className="flex flex-row-reverse">
                            <button
                                onClick={() => removeFavorite(recipe.id)}
                                className="mt-2 px-4 py-2  text-white rounded cursor-pointer " >
                                <FontAwesomeIcon icon="fa-solid fa-trash" className="text-red-500  hover:text-red-700 transition-colors duration-300" />
                            </button>
                            <Card recipe={recipe} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
/*
                        <div key={recipe.id} className="p-4 border rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded mb-3" />

                            
                        </div>
                        */
