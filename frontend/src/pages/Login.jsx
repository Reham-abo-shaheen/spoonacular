import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../api/client";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await apiFetch("api/users/login", {
            method: "POST",
            body: { username, password },
        });
        const { token, user } = await res;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (token && user.username === username) {
            localStorage.setItem("isLoggedIn", true);
            navigate("/");
            window.location.reload();
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl text-gray-400 font-bold mb-4">Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-300/40 w-full focus:bg-gray-200 outline-0 rounded-xl p-2 my-3 bordered"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-300/40 w-full focus:bg-gray-200 outline-0 rounded-xl p-2 my-3 bordered"
                    required
                />

                <button type="submit" className="w-full cursor-pointer rounded-md bg-lime-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 ">
                    Login
                </button>

                <Link to="/register" className="text-sm text-gray-400 hover:text-gray-500 my-2 text-center block">
                    Don't have an account? Sign up
                </Link>
            </form>
        </div>
    );
}
