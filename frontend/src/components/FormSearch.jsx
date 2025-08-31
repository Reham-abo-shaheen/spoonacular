import { useState } from "react";
import RandomButton from "./RandomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function FormSearch({ onSearch }) {

    const [filters, setFilters] = useState({
        query: "",
        cuisine: "",
        diet: "",
        time: ""

    });
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(query);
        if (filters.query.trim()) onSearch(filters);
    }


    return (
        <>
            <div className="bg-white">
                <div className="relative isolate px-6  lg:px-8">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#a7cd3a] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" /*style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"} */></div>
                    </div>
                    <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-32">
                        <div className="text-center">
                            <h1 className="text-5xl font-semibold tracking-tight text-balance text-lime-600 sm:text-7xl hover:text-gray-500 transition-colors duration-300">Search recipes</h1>
                            <p className="mt-8 mb-2 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"><FontAwesomeIcon icon="fa-solid fa-quote-right" />Discover delicious recipes that suit your taste and meet your dietary needs with ease.<FontAwesomeIcon icon="fa-solid fa-quote-left" /></p>
                            <div>
                                <form onSubmit={handleSubmit} method="GET" className="flex items-center flex-col" >
                                    <input className="bg-gray-300/40 w-1/2 focus:bg-gray-200 outline-0 rounded-xl p-2 my-2 bordered" type="text" placeholder="Search recipes" value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
                                    <div className="flex items-center gap-4 mt-2 mx-2">

                                        <select
                                            value={filters.cuisine}
                                            onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                                            className="borderd rounded px-3 py-2 bg-gray-300/40 focus:bg-gray-200"
                                        >
                                            <option value="">Chosse a cuisine</option>
                                            <option value="italian">Italian</option>
                                            <option value="mexican">mexican</option>
                                            <option value="japanese">japanese</option>
                                        </select>
                                        <select
                                            value={filters.diet}
                                            onChange={(e) => setFilters({ ...filters, diet: e.target.value })}
                                            className="borderd rounded px-3 py-2 bg-gray-300/40 focus:bg-gray-200"
                                        >
                                            <option value="">Chosse a diet</option>
                                            <option value="vegetarian">vegetarian</option>
                                            <option value="vegan">vegan</option>
                                            <option value="gluten free">gluten free</option>
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="Max cooking time (minutes)"
                                            value={filters.time}
                                            onChange={(e) => setFilters({ ...filters, time: e.target.value })}
                                            className="bg-gray-300/40  focus:bg-gray-200 outline-0 rounded-xl p-2 my-2 placeholder-black"
                                        />
                                    </div>
                                    <div className="mt-10 flex items-center justify-center gap-x-6">
                                        <button type="submit"
                                            className="cursor-pointer rounded-md bg-lime-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 ">Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <RandomButton />
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                        <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#a4cd2f] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" /*style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" */></div>
                    </div>
                </div>
            </div >
        </>
    );
}