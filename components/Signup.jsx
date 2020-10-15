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
                M.toast({ html: 'Signed up', classes: 'blue' })
            } else {
                isLoading(false);
                setErrorMsg(await res.text());
            }
        }
    };
    return (
        <>
            <div className="card-stacked center-align">
                {loading ? <div className="progress" style={{ margin: 0 }}>
                    <div className="indeterminate"></div>
                </div> : null}
                <div className="card-content">
                    <div className="row">
                        <div className="col s12 m12">
                            <div className="card z-depth-0">
                                <h4 style={{ fontWeight: 'bolder' }}>Create account</h4>
                                <div className="container">
                                    <div className="card-container">
                                        <div className="row">
                                            <div className="card-content">
                                                <form onSubmit={handleSubmit}>
                                                    {errorMsg ? (
                                                        <p style={{ color: "red" }}>{errorMsg}</p>
                                                    ) : null}
                                                    <div className="input-field col s12">
                                                        <i className="prefix">
                                                            <FaUserCircle />
                                                        </i>
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            className="validate"
                                                            name="name"
                                                            required
                                                        />
                                                        <label htmlFor="name">Name</label>
                                                    </div>
                                                    <div className="input-field col s12">
                                                        <i className="prefix">
                                                            <MdEmail />
                                                        </i>
                                                        <input
                                                            id="email"
                                                            type="text"
                                                            className="validate "
                                                            name="email"
                                                            required
                                                        />
                                                        <label htmlFor="email">Email</label>
                                                    </div>
                                                    <div className="input-field col s12">
                                                        <i className="prefix">
                                                            <RiLockPasswordFill />
                                                        </i>
                                                        <input
                                                            id="password"
                                                            type="password"
                                                            className="validate"
                                                            name="password"
                                                            required
                                                        />
                                                        <label htmlFor="password">Password</label>
                                                    </div>
                                                    <div className="input-field col s12">
                                                        <i className="prefix">
                                                            <RiLockPasswordLine />
                                                        </i>
                                                        <input
                                                            id="cpassword"
                                                            type="password"
                                                            className="validate"
                                                            name="cpassword"
                                                            required
                                                        />
                                                        <label htmlFor="cpassword">Confirm Password</label>
                                                    </div>
                                                    <div className="col s12" style={{ marginBottom: '1rem' }}>
                                                        <button className="waves-effect waves-light btn col s12" type="submit">
                                                            sign up
                                            </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="card-action col s12">
                                                <p>Already have an account<Link href="/login"> Login here.</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
