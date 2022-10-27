import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, MapIcon, BuildingLibraryIcon} from '@heroicons/react/24/outline';

const DashboardSection = () => {
    const [user, { mutate }] = useCurrentUser();
    const [universities, setData] = useState([]);
    const [advisors, setAdvisors] = useState([]);
    const [loading, isLoading] = useState(false);
    const [selectedUniversity, setselectedUniversity] = useState('');
    const [selectedAdvisor, setselectedAdvisor] = useState('');
    const yearRef = useRef();
    const fnameRef = useRef();
    const lnameRef = useRef();
    const pagesRef = useRef();
    const middleRef = useRef();
    const alFnameRef = useRef();
    const advisorRef = useRef();
    const universityRef = useRef();
    const thesisRef = useRef();
    const [msg, setMsg] = useState({ message: '', isError: false });

    useEffect(() => {
        isLoading(true)
        fetch('/api/fetchUniversities')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            isLoading(false)
          })
        fetch('/api/fetchAdvisors')
          .then((res) => res.json())
          .then((data) => {
            setAdvisors(data)
            isLoading(false)
          })
    }, [])

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        isLoading(true);
        const body = {
            year: yearRef.current.value,
            fname: fnameRef.current.value,
            lname: lnameRef.current.value,
            mname: middleRef.current.value,
            alFname: alFnameRef.current.value,
            advisor: advisorRef.current.value,
            university: universityRef.current.value,
            pages: pagesRef.current.value,
            status: 2,
            createby: user._id,
            createdate: new Date().toDateString()
        };
        const res = await fetch("/api/records", {
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
            setMsg({ message: 'Addes Successfully' });
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
            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Record Information</h3>
                        <p className="mt-1 text-sm text-gray-500">Add new record Information</p>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                First name
                                </label>
                                <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                ref={fnameRef}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="middle-name" className="block text-sm font-medium text-gray-700">
                                Middle name
                                </label>
                                <input
                                type="text"
                                name="middle-name"
                                id="middle-name"
                                autoComplete="middle-name"
                                ref={middleRef}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                Last name
                                </label>
                                <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                ref={lnameRef}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
                                focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-2">
                                <label htmlFor="Alternate_Family_Name" className="block text-sm font-medium text-gray-700">
                                Alternate Family Name
                                </label>
                                <input
                                    type="text"
                                    name="Alternate_Family_Name"
                                    id="Alternate_Family_Name"
                                    min="0"
                                    autoComplete="Alternate_Family_Name"
                                    ref={alFnameRef}
                                    className="mt-1 block w-full rounded-md border-gray-300 
                                    shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Year
                            </label>
                            <input
                                type="number"
                                min="0"
                                name="year-address"
                                id="year-address"
                                autoComplete="year"
                                ref={yearRef}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 
                                focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            University
                            </label>
                            <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            ref={universityRef}
                            value={selectedUniversity}
                            onChange={setselectedUniversity}
                            className="mt-1 block w-full rounded-md border border-gray-300 
                            bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none 
                            focus:ring-indigo-500 sm:text-sm"
                            >
                            {universities.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="pages" className="block text-sm font-medium text-gray-700">
                            Pages
                            </label>
                            <input
                                type="number"
                                name="pages"
                                id="pages"
                                min="0"
                                autoComplete="pages"
                                ref={pagesRef}
                                className="mt-1 block w-full rounded-md border-gray-300 
                                shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="advisor" className="block text-sm font-medium text-gray-700">
                            Advisor
                            </label>
                            <select
                                id="advisor"
                                name="advisor"
                                autoComplete="advisor-name"
                                ref={advisorRef}
                                value={selectedAdvisor}
                                onChange={setselectedAdvisor}
                                className="mt-1 block w-full rounded-md border border-gray-300 
                                bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none 
                                focus:ring-indigo-500 sm:text-sm"
                                >
                                {advisors.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                            Dissertation Title
                            </label>
                            <textarea
                                type="text"
                                name="street-address"
                                id="street-address"
                                autoComplete="street-address"
                                ref={thesisRef}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
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