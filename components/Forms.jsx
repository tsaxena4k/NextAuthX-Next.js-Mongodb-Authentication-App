import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { PlusIcon as PlusIconMini } from '@heroicons/react/20/solid'

const DashboardSection = () => {
    const [user, { mutate }] = useCurrentUser();
    const [universities, setData] = useState([]);
    const [advisors, setAdvisors] = useState([]);
    const [loading, isLoading] = useState(false);
    const [selectedUniversity, setselectedUniversity] = useState('');
    const [selectedAdvisor, setselectedAdvisor] = useState('');
    const [showModal, setShowModal] = useState(false);
    const yearRef = useRef();
    const fnameRef = useRef();
    const lnameRef = useRef();
    const pagesRef = useRef();
    const middleRef = useRef();
    const nameRef = useRef();
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
            dissertation_Title: thesisRef.current.value,
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
      
    const addAdvisor = async (event) => {
        event.preventDefault();
        isLoading(true);
        const body = {
            name: nameRef.current.value,
            createby: user._id,
            createdate: new Date().toDateString()
        };
        const res = await fetch("/api/advisors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.status === 200) {
            await fetch('/api/fetchAdvisors')
                .then((res) => res.json())
                .then((data) => {
                    setAdvisors(data)
                    isLoading(false)
            })
            setShowModal(false);
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
                                    <option key={item.id} value={item._id}>{item.name}</option>
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
                                    <option key={item.id} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1 justify-center items-center">
                            <label htmlFor="advisor" className="block text-sm font-medium text-gray-700">
                                Add Advisor
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="mt-2 inline-flex items-center rounded-full border
                                 border-transparent bg-indigo-600 p-2 text-white shadow-sm 
                                 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <PlusIconMini className="h-5 w-5" aria-hidden="true" />
                            </button>
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
                {showModal ? (
                        <>
                        <form onSubmit={addAdvisor} className="space-y-6" action="#" method="POST">
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 
                            outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none 
                            focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 
                                rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Add New Advisor
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl 
                                    leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                    </span>
                                </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        ref={nameRef}
                                        className="mt-1 block w-full rounded-md border-gray-300 
                                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={addAdvisor}>
                                    Save Changes
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </form>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
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