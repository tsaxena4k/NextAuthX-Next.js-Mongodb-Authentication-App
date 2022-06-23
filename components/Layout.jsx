import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { GrEmoji } from 'react-icons/gr';
import { AiTwotoneHome } from 'react-icons/ai';
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import Router from 'next/router';
import { useUser } from "../lib/hooks";
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Layout({ children }) {
    const [user, { mutate }] = useUser();
    const [loading, isLoading] = useState(false);
    const router = useRouter();
    const handleLogout = async () => {
        isLoading(true);
        await fetch('/api/auth', {
            method: 'DELETE',
        });
        // set the user state to null
        mutate(null);
        isLoading(false);
        router.push('/')
    };
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
            </Head>
            <header>
                <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">Nextjs Auth</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link" href="/"><a style={{ color: '#949585' }}>Home</a></Link>
                                </li>
                                <li>
                                    <a class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        About
                                    </a>
                                </li>
                            </ul>
                            {user && <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                        </div>
                    </div>
                </nav>
            </header>
            <main className='d-flex justify-content-center align-items-center'>
                <div className="container mx-auto my-3 h-100">
                    <div className="row">
                        <div className="col-sm-12">
                            {children}
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">About</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div className='row' style={{ flexDirection: 'column' }}>
                                    <div className='col text-center'>
                                        <img src="/Images/Me.jpg" width="200px" className="rounded mx-auto img-fluid" />
                                        <h2 className='mt-3'>I am Tushar Saxena</h2>
                                    </div>
                                    <div className='col text-center'>
                                        <div className="" style={{ fontSize: '2rem' }}>
                                            <a href="https://github.com/tsaxena4k" target="_blank"><FaGithub /> </a>
                                            <a href="https://www.facebook.com/tushar.saxena.56232/" target="_blank"><FaFacebook /> </a>
                                            <a href="https://www.linkedin.com/in/tushar-saxena-94b742184/" target="_blank"><FaLinkedin /> </a>
                                            <a href="https://www.instagram.com/tsaxena4k/" target="_blank"><FaInstagram /> </a>
                                        </div>
                                        <hr />
                                        <div className="mt-3">
                                            <p><strong>I was just doing Frontend Development a few months ago, was enjoying building personalised UI/UX templates with React and different styling options like materialize css, material UI ,Sass and what not.
                                                Though I was aware that Frontend was just not enough for me I had to start with Backend any day now, but like everyone else struggled with motivation.
                                                <br /><br />For me that day of motivation came in with a college project that a team of three has to work on.As a start I switched to <a href="https://nextjs.org/" target="_blank">Next.js</a> and that was really smooth,
                                                then I worked with nodejs,building API,Mongodb and all that Backend stuff.<br />But I struggled putting all of these things together to build a Login~Signup Authentication for our project.I watched every
                                                single video on youtube for the topic but failed to get things working.This was the start to my backend journey and it was quite what I thought it would be like.
                                                <br /><br />After alot of research and all came to know about <a href="http://www.passportjs.org/">passport.js</a> and here we are with things working. Thanks to <a href="https://hoangvvo.com/" target="_blank">Hoang</a>,his blogs helped me alot and finally
                                                I completed my first backend task.<br />I do realise after all of this that there might be people like me trying hard to make there first Authentication backend to work.
                                                So I decided to put this simple working model up for those who are seeking hard for it.<br /><br />I hope it helped you and I know there are tons of bugs and incomplete parts in the code I'll be working on that,
                                                to know more check out the <a href="https://github.com/tsaxena4k" target="_blank">github repository</a> for the same.</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                    .container{
                        height:85vh;
                    }    
                    main{
                        min-height:85vh;
                    }
                `}</style>
        </>
    );
}
