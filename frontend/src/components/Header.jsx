import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
export default function Header() {
    library.add(fas, far, fab) // <- add them to the library

    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const handleLogout = () => {
        if (user) {
            localStorage.removeItem("isLoggedIn");
            alert("You have been logged out.");
        }
        return window.location = "/"
    };


    return (
        <>
            <script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1" type="module"></script>

            <header className=" absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src={logo} alt="" />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button type="button" command="show-modal" commandfor="mobile-menu" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link to="/" className="text-sm/6 font-semibold text-gray-900">Recipes</Link>
                        <Link to="/favorites" className="text-sm/6 font-semibold text-gray-900">Favorites</Link>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {isLoggedIn ? <span className="text-sm/6 font-semibold text-gray-900 mr-4">Hello, {user.username} <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" className='cursor-pointer hover:text-lime-500 ' onClick={() => handleLogout()} /></span> :

                            <a href="/login" className="text-sm/6 font-semibold text-gray-900">Log in<span aria-hidden="true">&rarr;</span></a>

                        }
                    </div>
                </nav>
                <el-dialog>
                    <dialog id="mobile-menu" className="backdrop:bg-transparent lg:hidden">
                        <div tabIdex="0" className="fixed inset-0 focus:outline-none">
                            <el-dialog-panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-between">

                                    <button type="button" command="close" commandfor="mobile-menu" className="-m-2.5 rounded-md p-2.5 text-gray-700 absolute">
                                        <span className="sr-only">Close menu</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                                            <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                            <Link to="/" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"><img src={logo} alt='' className=' h-10' /></Link>
                                            <Link to="/" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Recipes</Link>
                                            <Link to="/favorites" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Favorites</Link>
                                        </div>
                                        <div className="py-6">
                                            <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</Link>
                                        </div>
                                    </div>
                                </div>
                            </el-dialog-panel>
                        </div>
                    </dialog>
                </el-dialog>
                { /*<!-- Mobile menu, show/hide based on menu open state. -->*/}


            </header>

        </>
    )
}