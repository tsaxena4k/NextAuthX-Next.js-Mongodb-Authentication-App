import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../lib/hooks";
import Link from 'next/link';

export default function Login() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    const [user, { mutate }] = useUser();
    const [loading,isLoading]=useState(user?true:false);
    useEffect(() => {
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
            M.toast({ html: 'Logged in', classes: 'blue' })
        } else {
            isLoading(false);
            setErrorMsg("Incorrect username or password. Try again!");
        }
    }

    return (
        <>
            {loading?<div class="progress">
                <div class="indeterminate"></div>
            </div>:null}
            <div className="row">
                <div className="col s12 m12">
                    <div className="card  z-depth-0">
                        <h4 style={{ fontWeight: 'bolder' }} id="title">Login</h4>
                        <div className="container">
                            <div className="card-container">
                                <div className="row">
                                    <div className="card-content"></div>
                                    <form onSubmit={onSubmit}>
                                        {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
                                        <div className="input-field col s12">
                                            <i className="prefix">
                                                <MdEmail />
                                            </i>
                                            <input id="email" type="text" className="validate" required />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div class="input-field col s12">
                                            <i className="prefix">
                                                <RiLockPasswordFill />
                                            </i>
                                            <input id="password" type="password" className="validate" required />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="col s12" style={{ marginBottom: '2rem' }}>
                                            <p className="left">
                                                <label>
                                                    <input type="checkbox" className="filled-in" />
                                                    <span>Remember me</span>
                                                </label>
                                            </p>
                                            <a onClick={() => M.toast({ html: 'Coming soon', classes: 'toast' })} className="right und">Forgot password?</a>
                                        </div>
                                        <div className="col s12">
                                            <button
                                                className="waves-effect waves-light btn col s12"
                                                type="submit"
                                            >
                                                Login
                                        </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-action col s12">
                                    <p>New here? <Link href="/signup">Sign up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
