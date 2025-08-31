import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useState, useEffect } from 'react';
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
export default function RecipeComponent({ recipe }) {
  library.add(fas, far, fab) // <- add them to the library
  const [isFavorited, setIsFavorited] = useState(false);
  const token = localStorage.getItem("token")

  const addToFavorites = async (recipe) => {
    const id = recipe.id
    const title = recipe.title
    const image = recipe.image
    // eslint-disable-next-line no-unused-vars
    const newFavorite = fetch("http://localhost:3000/api/favorites/newFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token
      },
      body: JSON.stringify({ id, title, image })

    }).then((response) => {
      if (response.ok) {

        setIsFavorited(true)
        alert("Recipe added to favorites! ⭐");
      }
    }).catch((error) => {
      console.log(error);
    });

  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const idsFa = favorites.map(fav => fav.id);
    setIsFavorited(idsFa.includes(Number(recipe.id)));
  }, [recipe.id]);

  return (
    <>
      <div className="relative isolate px-6 pt-8 lg:px-8 flex mt-4">

        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#a7cd3a] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]">
            {/*style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" */}
          </div>
        </div>
        {/*-- div for info and title --*/}
        <div className="info w-full md:w-1/4 p-6 mt-8 h-full">
          <div className="rating mb-8">
            <FontAwesomeIcon icon="fa-solid fa-star" className="text-red-400" />
            <FontAwesomeIcon icon="fa-solid fa-star" className="text-red-400" />
            <FontAwesomeIcon icon="fa-solid fa-star" className="text-red-400" />
            <FontAwesomeIcon icon='star-half-stroke' className="text-red-400" />
            <FontAwesomeIcon icon="fa-regular fa-star" className="text-red-400" />
          </div>

          <div className="instruction mb-8">
            <span className="block text-center font-semibold tracking-tight text-balance text-gray-400 mb-3  w-fit ">Instruction</span>

            {recipe.analyzedInstructions[0].steps.map((step, index) => (
              <div key={index} className="flex gap-1">
                <p className=" font-semibold tracking-tight text-balance  text-gray-700 ">{step.number}.</p>
                <p className=" font-semibold tracking-tight text-wrap text-sm  text-gray-500 mb-2 max-w-2xs overflow-hidden">{step.step}</p>
              </div>
            ))}
          </div>
          <div className="details mt-8">
            < h3 className="block text-center font-semibold tracking-tight text-balance text-gray-400 mb-3  w-fit ">Information</h3 >
            <p className=" font-semibold tracking-tight text-balance sm:text-md text-gray-500 mb-2 text-sm"><FontAwesomeIcon icon="fa-solid fa-clock" className=" text-sky-300 text-2xl"></FontAwesomeIcon> Preparation time: <span className="text-lime-600 "> {recipe.readyInMinutes} Minutes  </span> </p>
            <p className=" font-semibold tracking-tight text-balance sm:text-md text-gray-500 mb-2 text-sm"><FontAwesomeIcon icon="fa-solid fa-person" className=" text-pink-700 text-2xl"></FontAwesomeIcon> Portions: <span className="text-lime-600 "> {recipe.servings} Portion </span> </p>
            <p className=" font-semibold tracking-tight text-balance sm:text-md text-gray-500 mb-2 text-sm"><FontAwesomeIcon icon="fa-solid fa-seedling" className=" text-green-500 text-2xl"></FontAwesomeIcon> Vegan: <span className={recipe.vegan == false ? "text-gray-700" : "text-lime-600"}  > {recipe.vegan == false ? 'No' : 'Yes'}</span> </p>
            <p className=" font-semibold tracking-tight text-balance sm:text-md text-gray-500 mb-2 text-sm"><FontAwesomeIcon icon="fa-solid fa-wheat-awn" className=" text-yellow-500 text-2xl"></FontAwesomeIcon> Gluten free: <span className={recipe.glutenFree == false ? "text-gray-700" : "text-lime-600"} > {recipe.glutenFree == false ? 'No' : 'Yes'}</span> </p>
          </div >
        </div>

        {/* --div for Image-- */}
        <div className=" w-full md:w-1/2 p-6 text-center">
          <h1 className=" font-semibold tracking-tight text-balance text-lime-600  sm:text-xl">{recipe.title}</h1>
          <div className="flex m-10 justify-center ">
            <img src={recipe.image} alt={recipe.title} className="max-w-full max-h-[300px] object-contain shadow-2xl rounded-3xl" />
          </div>
          <div className="flex  flex-row-reverse  m-12 relative z-10">

            <button onClick={() => addToFavorites(recipe)} className='cursor-pointer rounded-2xl  text-sm font-semibold text-white '><FontAwesomeIcon icon={!isFavorited ? "fa-regular fa-bookmark" : "fa-solid fa-bookmark"} className={!isFavorited ? "text-gray-400 text-2xl relative z-10 mt-1" : "text-yellow-500 text-2xl relative z-10 mt-1"} /></button>
          </div>


        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#a4cd2f] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div> {/*style={{ "clipPath: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
           */} </div>


        {/* --div for ingredients -- */}

        <div className="ingredients  w-1/4 md:w-1/4 p-6 mt-8 ">
          <span className="block text-center font-semibold tracking-tight text-balance  text-gray-400 mb-3  w-fit ">Ingredients</span>
          <div className="mb-8">
            {recipe.extendedIngredients.map((item, index) => (
              <div key={index} className=" flex items-center justify-left mx-2 flex-row gap-1.5 mb-2">
                <img src={`https://img.spoonacular.com/ingredients_100x100/${item.image}`} alt={item.nameClean ?? "img"} className="w-10 h-10 p-2 rounded-full mx-2" />
                <div className="font-bold bg-lime-50 p-2 rounded-2xl shadow-sm  text-lime-600 flex">
                  <p className="mx-1 text-sm"> {item.measures.metric['amount']} <span>{item.measures.metric.unitShort}</span> {item.name} </p>
                </div>
                <p className="font-semibold tracking-tight text-balance  text-gray-500"> </p>
              </div>
            ))}
          </div>
          <div className="dish-type" > <span className="block text-center font-semibold tracking-tight text-balance  text-gray-400 mb-3  w-fit ">Dish Type</span>
            {recipe.dishTypes.map((type, index) => (
              <span key={index} className=" tracking-tight text-balance  text-lime-600 block "><span><FontAwesomeIcon icon="fa-solid fa-utensils" className="text-lime-500 font-bold" /></span> {type}</span>
            ))}
          </div >
        </div>

      </div >

    </>
  );
}
