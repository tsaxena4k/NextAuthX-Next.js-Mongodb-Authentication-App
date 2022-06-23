import Link from 'next/link';
import { useUser } from '../lib/hooks';
import AfterLogin from '../components/AfterLogin';
import { useState } from 'react';

export default function Home() {
    const [user, { mutate }] = useUser();
    const [loading, isLoading] = useState(false);
    const handleLogout = async () => {
        isLoading(true);
        await fetch('/api/auth', {
            method: 'DELETE',
        });
        // set the user state to null
        mutate(null);
        isLoading(false);
    };
    return (
        <>
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-5">
                        {!user ? (<>
                            <img
                                src='/Images/Home.png'
                                className="img-fluid" alt=""
                            />
                        </>) : (<img
                            src="/Images/Home2.png"
                            className="img-fluid" alt=""
                        />)}
                    </div>
                    <div class="col-md-7">
                        <div class="card-body h-100 text-center">
                            <div className='row h-100' style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div className='col-sm-12'>
                                    <h2 style={{ marginTop: '0' }}><span style={{ fontWeight: 'bolder', color: `${user ? '#5c9eff' : '#5c9eff'}`, textShadow: '2px 2px black' }}>Hello </span>{!user ? 'Stranger' : user.name}</h2>
                                    <p>Welcome to <strong>Nextjs Auth</strong></p>
                                </div>
                                <div className='col-sm-12'>
                                    {!user ? (<>
                                        <div className="card-text">
                                            This is an Authentication build in <a href="https://nextjs.org/" target="_blank" style={{ textDecoration: 'underline', color: "" }}>Next.js</a> using <a href="http://www.passportjs.org/" target="_blank" style={{ textDecoration: 'underline', color: "" }}>Passport.js</a> and <a href="https://www.mongodb.com/" target="_blank" style={{ textDecoration: 'underline', color: "" }}>Mongodb </a>
                                            . It is a fully functional & ready to use module build for your next web application.This is template 0.0 I will be pushing more new personalized templates soon.
                                        </div>
                                        <div class="alert alert-primary my-2" role="alert">
                                            Till then go on try it around, I hope you like it
                                        </div>
                                    </>) : (<AfterLogin />)}
                                </div>
                                <div className='col-sm-12' style={{ alignSelf: 'end' }}>
                                    {!user ? (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Link href="/login">
                                                    <a className="btn btn-primary">Log in</a>
                                                </Link>
                                                <Link href="/signup">
                                                    <a className="btn btn-primary">Sign up</a>
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <>

                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Link href="/user/[userId]" as={`/user/${user._id}`}>
                                                    <a className="btn btn-primary">Profile</a>
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
