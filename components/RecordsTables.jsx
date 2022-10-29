import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { XCircleIcon, UsersIcon, ClockIcon, CheckBadgeIcon } from '@heroicons/react/20/solid';
const tabs = [


    { name: 'Pending', href: '/records', icon: ClockIcon, current: true },
    { name: 'Approved', href: '/recordsApproved', icon: CheckBadgeIcon, current: false },
    { name: 'Rejected', href: 'recordsRejected', icon: XCircleIcon, current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const DashboardSection = () => {
    const [user, { mutate }] = useCurrentUser();

    const [records, setData] = useState([]);
    const [loading, isLoading] = useState(false);
    const nameRef = useRef();
    const bioRef = useRef();
    const profilePictureRef = useRef();
    const [msg, setMsg] = useState({ message: '', isError: false });
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [approved_id, setapprovedId] = useState(false);
   
    useEffect(() => {
        isLoading(true)
        fetch('/api/fetchRecords')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            isLoading(false)
          })
    }, [])

    const approve = (_id) => {
        setapprovedId(_id);
        setShowModal(true);
    };

    const confirmation = async (event) => {
        event.preventDefault();
        isLoading(true);
        const body = {
            status: 1,
        };
        const res = await fetch(`/api/confirmRecord?id=${approved_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.status === 200) {
            setShowModal(false);
            setMsg({ message: 'Addes Successfully' });
            router.push('/records');
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
            <div className="px-4 sm:px-6 lg:px-8">
            {showModal ? (
                        <>
                        <form onSubmit={confirmation} className="space-y-6" action="#" method="POST">
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
                                    Confirmation
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
                                    <p className="mt-2 text-sm text-gray-700">
                                        are you sure?
                                    </p>
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
                                    onClick={confirmation}>
                                    Approve
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </form>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
               {(user.role == 'admin')? <div>
                    <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">
                        Select a tab
                        </label>
                        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                        <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={tabs.find((tab) => tab.current).name}
                        >
                        {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                        ))}
                        </select>
                    </div>
                    <div className="hidden sm:block">
                        <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                tab.current
                                    ? 'border-customerBlue-500 text-customerBlue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                                )}
                                aria-current={tab.current ? 'page' : undefined}>
                                <tab.icon
                                className={classNames(
                                    tab.current ? 'text-customerBlue-500' : 'text-gray-400 group-hover:text-gray-500',
                                    '-ml-0.5 mr-2 h-5 w-5'
                                )}
                                aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </a>
                            ))}
                        </nav>
                        </div>
                    </div>
                </div>:null }
                <div className='sm:flex-auto mt-2'></div>
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Records</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all you records added.
                    </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link href='/recordsForms'><a className='btn btn-primary'>Add New Records</a></Link>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Full Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Alternate Family Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Year
                                </th>
                                <th scope="col" className="px-10 py-12 text-left text-sm font-semibold text-gray-900">
                                    Dissertation Title
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    University
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    City
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    State
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Country
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Pages
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Advisor
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Added Date
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {records.map((person) => (
                                <tr key={person.email}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="font-medium">{person.fname} {person.mname} {person.lname}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <div className="">{person.alFname}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs 
                                    font-semibold leading-5 text-green-800">
                                        {person.year}
                                    </span>
                                </td>
                                <td className="px-5 py-5 text-sm">
                                        {person.dissertation_Title}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {person.universityDetails[0].name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {person.citiesdetails[0].name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {person.statesdetails[0].name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {person.countriesdetails[0].name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {person.pages}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    {person.advisorName[0].name}
                                </td>

                                {
                                    (person.status == '2')?
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className="inline-flex rounded-full bg-blue-100 px-2 
                                            text-xs font-semibold leading-5 text-green-800">
                                            Pending
                                        </span>
                                    </td>:(person.status == '1')?
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 
                                            text-xs font-semibold leading-5 text-green-800">
                                            Approved
                                        </span>
                                    </td>:<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className="inline-flex rounded-full bg-red-100 px-2 
                                            text-xs font-semibold leading-5 text-red-800">
                                            Rejected
                                        </span>
                                    </td>
                                }
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div className="ml-4">
                                        <div className="font-medium">{person.createdate}</div>
                                    </div>
                                </td>
                                {
                                    (person.status == '2' && user.role == 'poster')?
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Link href="/record/:[recordId]" as={`/record/${person._id}`}>
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    Edit<span className="sr-only"></span>
                                                </a>
                                            </Link>
                                        </div>
                                    </td>:(person.status == '2')?
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <button
                                            type="button"
                                            onClick={() => approve(person._id)}
                                            className="inline-flex items-center rounded border border-transparent 
                                            bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 
                                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                Approve
                                        </button>
                                    </td>:<td></td>
                                }
                                
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const DashboardPage = () => {
    const [user] = useCurrentUser();
    if (!user) {
        return (
            <>
                <p>Loading</p>
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