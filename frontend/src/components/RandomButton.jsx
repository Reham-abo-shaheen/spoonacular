import { Link } from "react-router-dom";

export default function RandomButton() {

    return (
        <Link to={"/random"}
            className="cursor-pointer rounded-xl bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Get a random recipe
        </Link>

    )
}
