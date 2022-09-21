import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, MapIcon, BuildingLibraryIcon} from '@heroicons/react/24/outline';


const DashboardSection = () => {
    const [loading, isLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const emailRef = useRef();
    const fnameRef = useRef();
    const lnameRef = useRef();
    const phoneRef = useRef();


    /**useEffect(() => {
        if (!user) {
            router.push('/');
        } else {
            nameRef.current.value = user.name;
            bioRef.current.value = user.bio;
        }
    }, [user]);**/

    const [user, { mutate }] = useCurrentUser();   
    const navigation = [
        { name: 'Dashboard', icon: HomeIcon, href: '#', current: true },
        { name: 'Locations', icon: MapIcon, href: 'locations', count: 3, current: false },
        { name: 'Universities', icon: BuildingLibraryIcon, href: '#', count: 4, current: false },
        { name: 'records requests', icon: CalendarIcon, href: '#', current: false },
        { name: 'Posters', icon: InboxIcon, href: '#', current: false },
        { name: 'Rewards Rules', icon: ChartBarIcon, href: '#', count: 12, current: false },
    ];
    const [msg, setMsg] = useState({ message: '', isError: false });
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        isLoading(true);
        const formData = new FormData();
        /**formData.append('email', emailRef.current.value);
        formData.append('fname', fnameRef.current.value);
        formData.append('lname', lnameRef.current.value);
        formData.append('phone', phoneRef.current.value);
        formData.append('createby', user.id);
        formData.append('createdate', new Date().toDateString());**/

        const body = {
            email: fnameRef.current.value,
            fname: fnameRef.current.value,
            lname: lnameRef.current.value,
            phone: phoneRef.current.value,
            createby: user.id,
            createdate: new Date().toDateString()
        };
        const res = await fetch("/api/posters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.status === 200) {
            const userData = await res.json();
            mutate({
                user: {
                    ...user,
                    ...userData.user,
                },
            });
            setMsg({ message: 'Profile updated' });
        } else {
            setMsg({ message: await res.text(), isError: true });
        }
        isLoading(false);
        setTimeout(() => setMsg(''), 2500);
    };
    
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Poster Information</h3>
                        <p className="mt-1 text-sm text-gray-500">Add new Poster Information</p>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            First name
                            </label>
                            <input
                            type="text"
                            required
                            name="fname"
                            id="fname"
                            autoComplete="given-name"
                            ref={fnameRef}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Last name
                            </label>
                            <input
                            required
                            type="text"
                            name="lname"
                            id="lname"
                            autoComplete="family-name"
                            ref={lnameRef}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Email address
                            </label>
                            <input
                            required
                            type="text"
                            name="email"
                            id="email"
                            autoComplete="email"
                            ref={emailRef}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>


                        <div className="col-span-6">
                            <div>
                                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="phone"
                                        required
                                        id="phone"
                                        ref={phoneRef}
                                        className="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="+1 (555) 987-6543"
                                    />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Cancel
                    </button>

                    <button
                    type="submit"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    {loading ? <div class="spinner-border" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                        <span class="visually-hidden">Loading...</span>
                    </div> : <>Save</>}
                    </button>
                </div>
                </form>
        </>
    );
};


const handleSubmite = async (e) => {
    e.preventDefault();
    
    const [user, { mutate }] = useCurrentUser();   
    isLoading(true);
    console.log(e.currentTarget.email);
    const body = {
        email: e.currentTarget.email,
        fname: e.currentTarget.fname,
        lname: currentTarget.lname,
        phone: currentTarget.phone,
        createby: user.id,
        createdate: new Date().toDateString()
    };
    const res = await fetch("/api/posters", {
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
};

const DashboardPage = () => {
    const [user] = useCurrentUser();
    if (!user) {
        return (
            <>
                <p>Please sign in</p>
            </>
        );
    }
    return (
        <>
            <DashboardSection />
        </>
    );
};
export default DashboardPage;