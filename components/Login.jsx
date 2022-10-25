import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleLogin } from 'react-google-login';
import { useUser } from "../lib/hooks";
import Link from 'next/link';
//import { gapi } from 'gapi-script';


export default function Login() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    const [user, { mutate }] = useUser();
    const [loading, isLoading] = useState(false);
    
    const responseGoogle = (err) => {
        console.log(err);
    }

    const handleLogin = async googleData => {
        const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })  
    if (res.status === 200) {
        // store returned user somehow
        const userObj = await res.json();
        console.log('fsdafdsaf');
        mutate(userObj);
    }
    
  }
    useEffect(() => {
       /**gapi.load("client:auth2", () => {
            gapi.client.init({
                clientId: "222480430426-hko2000qdbkc2isvpjdki7jhhqsjou7g.apps.googleusercontent.com",
                scope: ''
            });
        });**/
        // redirect to home if user is authenticated
        if (user) router.replace("/");
    }, [user]);

    async function onSubmit(e) {
        isLoading(true);
        e.preventDefault();
        const body = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        };
        const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.status === 200) {
            const userObj = await res.json();
            mutate(userObj);
        } else {
            isLoading(false);
            setErrorMsg("Incorrect username or password. Try again!");
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-black">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Sign in to your account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="mt-4 space-y-4 ">
                            <div className="flex justify-around">
                                <div className="flex items-center">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                    htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                        Admin
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                        Poster
                                    </label>
                                </div>
                            </div>
                            
                        </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                        </label>
                        <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                        </label>
                        <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                        </div>

                        <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot your password?
                        </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" 
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>{loading ? <div class="spinner-border" role="status" style={{width:'1.5rem',height:'1.5rem'}}>
                        <span class="visually-hidden">Loading...</span>
                    </div> : <>Login</>}</button>

                    </div>
                    </form>

                    <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <div>
                        <GoogleLogin
                            className="inline-flex w-full justify-center rounded-md border border-gray-300
                            bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                            clientId="222480430426-hko2000qdbkc2isvpjdki7jhhqsjou7g.apps.googleusercontent.com"
                            buttonText="Login"
                            render={renderProps => (
                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                                    className="inline-flex w-full justify-center rounded-md border 
                                    border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                >
                                    <span className="sr-only">Sign in with Twitter</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16"> <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/> </svg> 
                                </button>
                              )}
                            onSuccess={handleLogin}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}
