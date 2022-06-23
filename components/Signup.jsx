import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdCake } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Link from "next/link";

export default function Login() {
    const [user, { mutate }] = useUser();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        // redirect to home if user is authenticated
        if (user) Router.replace("/");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.currentTarget.password.value !== e.currentTarget.cpassword.value) {
            setErrorMsg("Passwords does not match")
        } else {
            isLoading(true);
            const body = {
                email: e.currentTarget.email.value,
                name: e.currentTarget.name.value,
                password: e.currentTarget.password.value
            };
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (res.status === 201) {
                const userObj = await res.json();
                // writing our user object to the state
                mutate(userObj);
            } else {
                isLoading(false);
                setErrorMsg(await res.text());
            }
        }
    };
    return (
        <>
            <div className="card-form d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
                    </div>
                    <div class="mb-3">
                        <label for="Name" class="form-label"><FaUserCircle /> Name</label>
                        <input type="text" class="form-control" id="name" required />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label"><MdEmail /> Email address</label>
                        <input type="email" class="form-control" id="email" required />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label"><RiLockPasswordFill /> Password</label>
                        <input type="password" class="form-control" id="password" required />
                    </div>
                    <div class="mb-3">
                        <label for="cpassword" class="form-label"><RiLockPasswordFill /> Confirm Password</label>
                        <input type="password" class="form-control" id="cpassword" required />
                    </div>
                    <div className="mb-3">
                        <p>Already registered ? <Link href="/login">Login</Link></p>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 mb-3">{loading ? <div class="spinner-border" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                        <span class="visually-hidden">Loading...</span>
                    </div> : <>Sign up</>}</button>
                </form>
            </div>
        </>
    );
}
