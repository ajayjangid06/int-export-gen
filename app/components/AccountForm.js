"use client";
import React, { useState } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AccountForm = (props) => {
    const { type } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            alert("Email is required");
            return;
        }
        if (!password) {
            alert("Password is required");
            return;
        }
        if(type==='signup') {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, { email, password });
                // localStorage.setItem('token', response.data.token);
                router.push('/signin');
            } catch (error) {
                console.error('Login failed', error);
            }
        } else {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { email, password });
                localStorage.setItem('token', response.data.token);
                router.push('/my-uploads');
            } catch (error) {
                console.error('Login failed', error);
            }
        }
    };

    return (
        <Wrapper className="w-96">
            <h2 className="mt-0 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {type === "signup" ? "Create Account" : "Login"}
            </h2>
            <div className="mt-4">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="off"
                                className="px-3 block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="off"
                                className="px-3 block w-full rounded-md outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-black flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {type === "signup" ? "Create Account" : "Login"}
                        </button>
                    </div>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        {type === "signup"
                            ? "Already have an account?"
                            : "Don't have an account?"}
                        <Link
                            href={
                                type === "signup"
                                    ? "/signin?"
                                    : "/create-account"
                            }
                            className="ms-1 font-semibold leading-6 text-blue-500 hover:text-blue-600"
                        >
                            {type === "signup" ? "Signin" : "Create an account"}
                        </Link>
                    </p>
                </form>
            </div>
        </Wrapper>
    );
};

export default AccountForm;
