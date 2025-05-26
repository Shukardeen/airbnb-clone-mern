import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { config } from '../config/config.js';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/authSlice.js';
import { useNavigate } from 'react-router-dom';

function AuthModals({ isOpen, onClose, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const user = useSelector((state) => state.auth.user);

    // Update mode when initialMode changes
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    // Reset form when mode changes
    useEffect(() => {
        reset();
        setLoginError('');
    }, [mode, reset]);

    const handleLogin = async (data) => {
        try {
            const response = await axios.post(`${config.backendUrl}/auth/login`, data, {
                withCredentials: true,
            });
            if(response.data.message === "something went wrong") toast.error("Invalid credentials");
            else if(response.data.message === "Logged in successfully") {
                console.log(response.data.user);
                dispatch(loginSuccess(response.data.user));
                onClose();
                navigate("/");
                toast.success("Logged in successfully");
            }
        } catch (error) {
            console.log("Login Error :: ", error);
            setLoginError("Invalid credentials");
        }
    };

    const handleSignup = async (data) => {
        try {
            const signupData = {
                username: data.username,
                email: data.email,
                password: data.password
            };
            const response = await axios.post(`${config.backendUrl}/auth/signup`, signupData, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });
            onClose();
            toast.success("Registered successfully");
            dispatch(loginSuccess(response.data.createdUser));
            navigate("/");
        } catch (error) {
            console.log("Error occurred while signing up :: ", error);
            toast.error("Registration failed");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-[5px] bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-4/5 md:w-2/5 lg:w-1/4 relative shadow-lg z-60">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 h-8 w-8 cursor-pointer hover:bg-gray-200 px-1 rounded-full"
                    title='Close'
                >
                    ✕
                </button>
                
                <div className="flex justify-center mb-6">
                    <button
                        className={`cursor-pointer px-4 py-2 ${mode === 'login' ? 'border-b-2 border-black' : 'text-gray-500'}`}
                        onClick={() => setMode('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`cursor-pointer px-4 py-2 ${mode === 'signup' ? 'border-b-2 border-black' : 'text-gray-500'}`}
                        onClick={() => setMode('signup')}
                    >
                        Signup
                    </button>
                </div>

                {mode === 'login' ? (
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                        {loginError && <p className="text-red-500 text-center">{loginError}</p>}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-colors cursor-pointer"
                        >
                            Login
                        </button>
                        <p>Don't have an account? <button onClick={() => setMode('signup')} className="text-blue font-semibold mt-2">Signup</button></p>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="h-10 border-1 shadow-[0_0_2px_rgba(0,0,0,0.1)] border-gray-300 rounded-sm px-2 w-full focus:outline-none focus:shadow-[0_0_1px_rgba(0,0,0,1)]"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-colors cursor-pointer"
                        >
                            Signup
                        </button>
                        <p>Already have an account? <button onClick={() => setMode('login')} className="text-blue font-semibold mt-2">Login</button></p>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthModals; 
