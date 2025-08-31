import { Link } from "react-router-dom"
export default function Card({ recipe }) {

    function truncateTitle(title, maxLength) {
        if (!title) return "";
        return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
    }
    return (
        <>
            <Link to={`/recipe/${recipe.id}`} >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer max-h-[500px] max-w-[500px]">
                    <div className="bg-white rounded-2xl overflow-hidden  transition cursor-pointer">
                        <img src={recipe.image} alt="food" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="mt-2 text-lg font-semibold text-gray-900 hover:text-lime-600 cursor-pointer">
                                {truncateTitle(recipe.title, 20)}
                            </h3>
                            {/*<p className="mt-1 text-gray-600">{recipe.readyInMinutes} minutes | Servings: {recipe.servings}</p> */}
                        </div>
                    </div>
                </div>
            </Link>


        </>
    )
}