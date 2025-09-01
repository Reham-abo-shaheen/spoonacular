import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useState, useEffect } from 'react';
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { apiFetch } from '../api/client';
export default function RecipeComponent({ recipe }) {
  library.add(fas, far, fab) // <- add them to the library
  const [isFavorited, setIsFavorited] = useState(false);
  const token = localStorage.getItem("token")

  const addToFavorites = async (recipe) => {
    const id = recipe.id
    const title = recipe.title
    const image = recipe.image
    const newFavorite = await apiFetch("api/favorites/newFavorite", {
      method: "POST",
      token,
      body: { id, title, image }

    })
    if (newFavorite.msg) {

      setIsFavorited(true)
      alert("Recipe added to favorites! ⭐");
    }



  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const idsFa = favorites.map(fav => fav.id);
    setIsFavorited(idsFa.includes(Number(recipe.id)));
  }, [recipe.id]);

  return (
    <>
      <>
        <div className="relative isolate px-6 pt-8 lg:px-8 flex mt-4 flex-col md:flex-row">

          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#a7cd3a] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]">
              {/*style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" */}
            </div>
          </div>

          {/*-- div for info and title --*/}
          <div className="info w-full md:w-1/4 p-4 md:p-6 mt-4 md:mt-8 h-full order-2 md:order-1">
            <div className="rating mb-6 md:mb-8">
              <FontAwesomeIcon icon="fa-solid fa-star" className="text-red-400" />
              <FontAwesomeIcon icon="fa-solid fa-star" className="text-red-400" />
              <FontAwesomeIcon icon="fa-solid fa-star" className="text-red-400" />
              <FontAwesomeIcon icon='star-half-stroke' className="text-red-400" />
              <FontAwesomeIcon icon="fa-regular fa-star" className="text-red-400" />
            </div>

            <div className="instruction mb-6 md:mb-8">
              <span className="block text-center font-semibold tracking-tight text-balance text-gray-400 mb-3 w-fit">Instruction</span>

              {recipe.analyzedInstructions[0].steps.map((step, index) => (
                <div key={index} className="flex gap-1 mb-2">
                  <p className="font-semibold tracking-tight text-balance text-gray-700 text-sm md:text-base">{step.number}.</p>
                  <p className="font-semibold tracking-tight text-wrap text-xs md:text-sm text-gray-500 max-w-xs md:max-w-2xs overflow-hidden">{step.step}</p>
                </div>
              ))}
            </div>

            <div className="details mt-6 md:mt-8">
              <h3 className="block text-center font-semibold tracking-tight text-balance text-gray-400 mb-3 w-fit">Information</h3>
              <p className="font-semibold tracking-tight text-balance text-gray-500 mb-2 text-xs md:text-sm flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-clock" className="text-sky-300 text-xl md:text-2xl" />
                Preparation time: <span className="text-lime-600 ml-1">{recipe.readyInMinutes} Minutes</span>
              </p>
              <p className="font-semibold tracking-tight text-balance text-gray-500 mb-2 text-xs md:text-sm flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-person" className="text-pink-700 text-xl md:text-2xl" />
                Portions: <span className="text-lime-600 ml-1">{recipe.servings} Portion</span>
              </p>
              <p className="font-semibold tracking-tight text-balance text-gray-500 mb-2 text-xs md:text-sm flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-seedling" className="text-green-500 text-xl md:text-2xl" />
                Vegan: <span className={recipe.vegan == false ? "text-gray-700 ml-1" : "text-lime-600 ml-1"}>{recipe.vegan == false ? 'No' : 'Yes'}</span>
              </p>
              <p className="font-semibold tracking-tight text-balance text-gray-500 mb-2 text-xs md:text-sm flex items-center gap-2">
                <FontAwesomeIcon icon="fa-solid fa-wheat-awn" className="text-yellow-500 text-xl md:text-2xl" />
                Gluten free: <span className={recipe.glutenFree == false ? "text-gray-700 ml-1" : "text-lime-600 ml-1"}>{recipe.glutenFree == false ? 'No' : 'Yes'}</span>
              </p>
            </div>
          </div>

          {/* --div for Image-- */}
          <div className="w-full md:w-1/2 p-4 md:p-6 text-center order-1 md:order-2">
            <h1 className="font-semibold tracking-tight text-balance text-lime-600 text-lg md:text-xl mb-4 md:mb-0">{recipe.title}</h1>
            <div className="flex m-4 md:m-10 justify-center">
              <img src={recipe.image} alt={recipe.title} className="max-w-full max-h-[250px] md:max-h-[300px] object-contain shadow-2xl rounded-3xl" />
            </div>
            <div className="flex flex-row-reverse m-6 md:m-12 relative z-10">
              <button onClick={() => addToFavorites(recipe)} className='cursor-pointer rounded-2xl text-sm font-semibold text-white'>
                <FontAwesomeIcon icon={!isFavorited ? "fa-regular fa-bookmark" : "fa-solid fa-bookmark"} className={!isFavorited ? "text-gray-400 text-2xl relative z-10 mt-1" : "text-yellow-500 text-2xl relative z-10 mt-1"} />
              </button>
            </div>
          </div>

          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#a4cd2f] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
          </div>

          {/* --div for ingredients -- */}
          <div className="ingredients w-full md:w-1/4 p-4 md:p-6 mt-4 md:mt-8 order-3">
            <span className="block text-center font-semibold tracking-tight text-balance text-gray-400 mb-3 w-fit">Ingredients</span>
            <div className="mb-6 md:mb-8">
              {recipe.extendedIngredients.map((item, index) => (
                <div key={index} className="flex items-center justify-left mx-1 md:mx-2 flex-row gap-1 md:gap-1.5 mb-2">
                  <img src={`https://img.spoonacular.com/ingredients_100x100/${item.image}`} alt={item.nameClean ?? "img"} className="w-8 h-8 md:w-10 md:h-10 p-1 md:p-2 rounded-full mx-1 md:mx-2" />
                  <div className="font-bold bg-lime-50 p-1 md:p-2 rounded-2xl shadow-sm text-lime-600 flex text-xs md:text-sm">
                    <p className="mx-1">{item.measures.metric['amount']} <span>{item.measures.metric.unitShort}</span> {item.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="dish-type">
              <span className="block text-center font-semibold tracking-tight text-balance text-gray-400 mb-3 w-fit">Dish Type</span>
              {recipe.dishTypes.map((type, index) => (
                <span key={index} className="tracking-tight text-balance text-lime-600 block text-sm md:text-base mb-1">
                  <FontAwesomeIcon icon="fa-solid fa-utensils" className="text-lime-500 font-bold mr-2" />
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </>

    </>
  );
}
