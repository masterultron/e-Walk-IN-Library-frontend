import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { registerUser, signInWithGoogle } = useAuth();
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Register user
    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password);
            alert("User registered successfully!");
            // navigate("/"); // Optionally, redirect after successful registration
        } catch (error) {
            setMessage("Please provide a valid email and password.");
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            alert("Google sign-in failed!");
            console.error(error);
        }
    };

    return (
        <div className="h-[calc(100vh-120px)] flex justify-center">
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4">Please Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@]+@[^@]+\.[^@]+$/,
                                    message: "Please enter a valid email",
                                },
                            })}
                            type="text"
                            id="email"
                            placeholder="Email Address"
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs italic mb-3">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            })}
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs italic mb-3">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Error Message */}
                    {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

                    {/* Register Button */}
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-8 rounded focus:outline-none"
                        >
                            Register
                        </button>
                    </div>
                </form>

                {/* Login Link */}
                <p className="align-baseline font-medium mt-4 text-sm">
                    Have an account? Please
                    <Link to="/login" className="text-blue-500 hover:text-blue-700">
                        {" "}Login
                    </Link>
                </p>

                {/* Google Sign-in Button */}
                <div className="mt-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex flex-wrap gap-1 items-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    >
                        <FaGoogle className="mr-2" />
                        Sign in with Google
                    </button>
                </div>

                <p className="mt-5 text-center text-gray-500 text-xs">
                    TheAlchemist Book Store. All rights reserved
                </p>
            </div>
        </div>
    );
};

export default Register;