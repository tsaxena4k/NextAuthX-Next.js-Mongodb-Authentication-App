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
    const [loading, isLoading] = useState(false);
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
        } else {
            isLoading(false);
            setErrorMsg("Incorrect username or password. Try again!");
        }
    }

    return (
        <>
            <div className="card-form d-flex justify-content-center">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label"><MdEmail /> Email address</label>
                        <input type="email" class="form-control" id="email" required/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label"><RiLockPasswordFill /> Password</label>
                        <input type="password" class="form-control" id="password" required/>
                    </div>
                    <div className="mb-3">
                        <p>New here? <Link href="/signup">Sign up</Link></p>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">{loading ? <div class="spinner-border" role="status" style={{width:'1.5rem',height:'1.5rem'}}>
                        <span class="visually-hidden">Loading...</span>
                    </div> : <>Login</>}</button>
                </form>
            </div>
        </>
    );
}
