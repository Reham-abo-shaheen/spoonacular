import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import RecipeComponent from "../components/RecipeComponent";
export default function RecipeDetails() {
    library.add(fas, far, fab) // <- add them to the library
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        const fetchRecipe = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/recipes/${id}`);
                const data = await res.json();
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();

    }, [id]);







    if (loading) return <p>Loading...</p>;
    if (!recipe) return <p>Recipe not found</p>;
    return (
        <>
            <RecipeComponent recipe={recipe} />
        </>
    );
}