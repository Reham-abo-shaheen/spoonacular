import { useState } from "react";
import RandomButton from "./RandomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function FormSearch({ onSearch }) {

    const [filters, setFilters] = useState({
        query: "",
        cuisine: "",
        diet: "",
        maxReadyTime: ""

    });
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(query);
        if (filters.query.trim()) onSearch(filters);
    }


    return (
        <>
            <div className="bg-white">
                <div className="relative isolate px-6 lg:px-8">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#a7cd3a] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        >
                        </div>
                    </div>
                    <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-32">
                        <div className="text-center">
                            <h1 className="text-4xl font-semibold tracking-tight text-balance text-lime-600 sm:text-5xl md:text-6xl lg:text-7xl hover:text-gray-500 transition-colors duration-300">Search recipes</h1>
                            <p className="mt-6 md:mt-8 mb-4 md:mb-2 text-base md:text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"><FontAwesomeIcon icon="fa-solid fa-quote-right" />Discover delicious recipes that suit your taste and meet your dietary needs with ease.<FontAwesomeIcon icon="fa-solid fa-quote-left" /></p>
                            <div className="w-full">
                                <form onSubmit={handleSubmit} method="GET" className="flex items-center flex-col" >
                                    <input className="bg-gray-100 w-full md:w-3/4 lg:w-1/2 focus:bg-white focus:ring-2 focus:ring-lime-500 outline-0 rounded-xl p-3 my-2 border border-gray-300 shadow-sm transition-all duration-200" type="text" placeholder="Search recipes" value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
                                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 mx-2 w-full md:w-auto">
                                        <div className="relative w-full sm:w-48">
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <FontAwesomeIcon icon="fa-solid fa-chevron-down" className="text-gray-500" />
                                            </div>
                                            <select
                                                value={filters.cuisine}
                                                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                                                className="appearance-none bg-gray-100 border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-lime-500 focus:bg-white focus:border-lime-500 outline-none transition-all duration-200 shadow-sm cursor-pointer"
                                            >
                                                <option value="">Choose a cuisine</option>
                                                <option value="italian">Italian</option>
                                                <option value="mexican">Mexican</option>
                                                <option value="japanese">Japanese</option>
                                            </select>
                                        </div>

                                        <div className="relative w-full sm:w-48">
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <FontAwesomeIcon icon="fa-solid fa-chevron-down" className="text-gray-500" />
                                            </div>
                                            <select
                                                value={filters.diet}
                                                onChange={(e) => setFilters({ ...filters, diet: e.target.value })}
                                                className="appearance-none bg-gray-100 border border-gray-300 rounded-xl py-3 px-4 w-full focus:ring-2 focus:ring-lime-500 focus:bg-white focus:border-lime-500 outline-none transition-all duration-200 shadow-sm cursor-pointer"
                                            >
                                                <option value="">Choose a diet</option>
                                                <option value="vegetarian">Vegetarian</option>
                                                <option value="vegan">Vegan</option>
                                                <option value="gluten free">Gluten free</option>
                                            </select>
                                        </div>

                                        <input
                                            type="number"
                                            placeholder="Max cooking time"
                                            value={filters.maxReadyTime}
                                            onChange={(e) => setFilters({ ...filters, maxReadyTime: e.target.value })}
                                            className="bg-gray-100 border border-gray-300 focus:bg-white focus:ring-2 focus:ring-lime-500 outline-0 rounded-xl p-3 my-2 placeholder-gray-500 w-full sm:w-48 shadow-sm transition-all duration-200"
                                        />
                                    </div>
                                    <div className="mt-6 sm:mt-10 flex items-center justify-center gap-x-6">
                                        <button type="submit"
                                            className="cursor-pointer rounded-xl bg-lime-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 transition-colors duration-200">Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-6 sm:mt-10 flex items-center justify-center gap-x-6">
                                <RandomButton />
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        >
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}