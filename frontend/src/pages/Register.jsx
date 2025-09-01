
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();



    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }


        const res = await apiFetch("/api/users/register", {
            method: "POST",
            body: { username, email, password }
        });

        if (res) {
            alert("Registration successful!");
            navigate("/login");
        } else {
            alert("Registration failed. Please try again.");
        }
        //alert("Registration successful!");
        //("/");
        // window.location.reload();

    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-gray-400">Create Account</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-300/40 w-full focus:bg-gray-200 outline-0 rounded-xl p-2 my-3 bordered" required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-300/40 w-full focus:bg-gray-200 outline-0 rounded-xl p-2 my-3 bordered" required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-300/40 w-full focus:bg-gray-200 outline-0 rounded-xl p-2 my-3 bordered" required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-300/40 w-full focus:bg-gray-200 outline-0 rounded-xl p-2 my-3 bordered" required
                />

                <button type="submit" className="w-full cursor-pointer rounded-md bg-lime-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-lime-500 ">
                    Register
                </button>
            </form>
        </div>
    );
}
