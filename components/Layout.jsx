import Head from 'next/head';
import React, { useEffect, useState, Fragment } from 'react';
import { GrEmoji } from 'react-icons/gr';
import { AiTwotoneHome } from 'react-icons/ai';
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import Router from 'next/router';
import { useUser } from "../lib/hooks";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import {
    ArrowPathIcon,
    Bars3Icon,
    CloudArrowUpIcon,
    CogIcon,
    LockClosedIcon,
    ServerIcon,
    ShieldCheckIcon,
    XMarkIcon,
  } from '@heroicons/react/24/outline';

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

    const navigation = [
        { name: 'Search', href: '/search' },
        { name: 'About us', href: '/aboutus' },
        { name: 'Poster', href: '#' },
        { name: 'Contact us', href: '/contactus' },
      ]

    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
            </Head>
            <div className="bg-white">
                <div className="relative overflow-hidden">
        
                    <Popover as="header" className="relative">
                        <div className="bg-gray-900 pt-6">
                            <nav
                            className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
                            aria-label="Global"
                            >
                            <div className="flex flex-1 items-center">
                                <div className="flex w-full items-center justify-between md:w-auto">
                                <a href="#">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                    className="h-8 w-auto sm:h-10"
                                    src="https://tailwindui.com/img/logos/mark.svg?from-color=teal&from-shade=200&to-color=cyan&to-shade=400&toShade=400"
                                    alt=""
                                    />
                                </a>
                                <div className="-mr-2 flex items-center md:hidden">
                                    <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                                </div>
                                <div className="hidden space-x-8 md:ml-10 md:flex">
                                {navigation.map((item) => (
                                    <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-base font-medium text-white hover:text-gray-300"
                                    >
                                    {item.name}
                                    </a>
                                ))}
                                </div>
                            </div>
                            <div className="hidden md:flex md:items-center md:space-x-6">

                            {!user ? (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Link href="/login">
                                                    <a className="text-base font-medium text-white hover:text-gray-300">Log in</a>
                                                </Link>
                                                <Link href="/signup">
                                                    <a className="text-base font-medium text-white hover:text-gray-300">Sign up</a>
                                                </Link>
                                            </div>
                                            <a href="#" className="text-base font-medium text-white hover:text-gray-300">
                                                {user && <Link href="/login">
                                                    <a className="text-base font-medium text-white hover:text-gray-300">Log in</a>
                                                </Link>} 
                                                {user && <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                                            </a>

                                        </>
                                    ) : (
                                        <>

                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Link href="/user/[userId]" as={`/user/${user._id}`}>
                                                    <a className="text-base font-medium text-white hover:text-gray-300">Profile</a>
                                                </Link>
                                            </div>
                                            <a href="#" className="text-base font-medium text-white hover:text-gray-300">
                                                {user && <Link href='/dashboard'><a className="text-base font-medium text-white hover:text-gray-300">Dashboard</a></Link>} 
                                                {user && <button className="text-base font-medium text-white hover:text-gray-300" onClick={handleLogout}>Logout</button>}
                                            </a>
                                        </>
                                    )}
                                    {!user ? (<Link href="/signup">
                                <a
                                href="#"
                                className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                                >Sign up       
                                </a></Link>): <Link href="/user/[userId]" as={`/user/${user._id}`}>
                                     <a className="text-base font-medium text-white hover:text-gray-300">Profile</a></Link>}
                            </div>
                            </nav>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="duration-150 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-100 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden">
                            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                                <div className="flex items-center justify-between px-5 pt-4">
                                <div>
                                    <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?from-color=teal&from-shade=500&to-color=cyan&to-shade=600&toShade=600"
                                    alt=""
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                                </div>
                                <div className="pt-5 pb-6">
                                <div className="space-y-1 px-2">
                                    {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                    ))}
                                </div>
                                <div className="mt-6 px-5">
                                    <a
                                    href="#"
                                    className="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 text-center font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700"
                                    >
                                    Start free trialsfsd
                                    </a>
                                </div>
                                <div className="mt-6 px-5">
                                    <p className="text-center text-base font-medium text-gray-500">
                                    Existing customer?{' '}
                                    <a href="#" className="text-gray-900 hover:underline">
                                        Login
                                    </a>
                                    </p>
                                </div>
                                </div>
                            </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                </div>
            </div>
            <main className='d-flex justify-content-center align-items-center'>
                <div className="container mx-auto h-100">
                    <div className="">
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
                        width:100%;
                        padding:0;
                    }     
                    main{
                        min-height:85vh;
                        width:100%;
                        padding:0;
                    }
                `}</style>
        </>
    );
}
