import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronLeftIcon, EnvelopeIcon, FunnelIcon, MagnifyingGlassIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { Search } from '@material-ui/icons';

const DashboardSection = () => {
    //const [user, { mutate }] = useCurrentUser();
    const [loading, isLoading] = useState(false);
    const [universities, setData] = useState([]);
    const [results, setResults] = useState([]);
    const [selectedUniversity, setselectedUniversity] = useState('');
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
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false)


    useEffect(() => {
      isLoading(true)
      fetch('/api/fetchUniversities')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          isLoading(false)
      })
  }, [])
    /**useEffect(() => {
        if (!user) {
            router.push('/');
        } else {
            nameRef.current.value = user.name;
            bioRef.current.value = user.bio;
        }
    }, [user]);**/

    const searchRecords = async (event) => {
      event.preventDefault();
      isLoading(true);
      const body = {
          year: yearRef.current.value,
          fname: fnameRef.current.value,
          lname: lnameRef.current.value,
          mname: middleRef.current.value,
          university: universityRef.current.value,
          dissertation_Title: thesisRef.current.value,
      };
      const res = await fetch(`/api/searchRecords`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
      });
      if (res.status === 200) {
          const userData = await res.json();
          setResults(userData);
          setMsg({ message: 'Added Successfully' });
      } else {
          setMsg({ message: await res.text(), isError: true });
      }
      isLoading(false);
      setTimeout(() => setMsg(''), 2500);
  };

    const user = {
        name: 'Tom Cook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      }

      const profile = {
        name: 'Ricardo Cooper',
        imageUrl:
          'https://www.pngfind.com/pngs/m/53-531599_file-gnome-stock-person-svg-generic-person-icon.png',
        coverImageUrl:
          'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        about: `
          <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
          <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
        `,
        fields: {
          Phone: '(555) 123-4567',
          Email: 'ricardocooper@example.com',
          Title: 'Senior Front-End Developer',
          Team: 'Product Development',
          Location: 'San Francisco',
          Sits: 'Oasis, 4th floor',
          Salary: '$145,000',
          Birthday: 'June 8, 1990',
        },
      }


    return (
        <>
            <Head>
                <title>Search</title>
            </Head>
            <div className="flex h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=500"
                        alt="Your Company"
                      />
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img className="inline-block h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=500"
                  alt="Your Company"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Breadcrumb */}
              <nav className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
                <a href="#" className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                  <ChevronLeftIcon className="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>Directory</span>
                </a>
              </nav>

              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <img className="h-32 w-full object-cover lg:h-48" src={profile.coverImageUrl} alt="" />
                  </div>
                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex">
                        <img
                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={profile.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                          <h1 className="truncate text-2xl font-bold text-gray-900">Search Results</h1>
                        </div>
                        <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                          
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                      <h1 className="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
                    </div>
                  </div>
                </div>

             

                {/* Team member list */}
                <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
                  <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {(results.length > 0)?results.map((person) => (
                      <div
                        key={person._id}
                        className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400"
                      >
                        
                        <div className="min-w-0 flex-1">
                          <a href="#" className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-gray-900">{person.lname}, {person.fname} </p>
                            <p className="text-sm text-gray-500">Dissertation: {person.dissertation_Title}</p>
                            <p className="truncate text-sm text-gray-500">{person.universityDetails[0].name}</p>
                            <p className="truncate text-sm text-gray-500">{person.year}</p>
                            <p className="truncate text-sm text-gray-900">Advisor: {person.advisorName[0].name}</p>
                          </a>
                        </div>
                      </div>
                    )):<div></div>}
                  </div>
                </div>
              </article>
            </main>
            <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
              <div className="px-6 pt-6 pb-4">
                <h2 className="text-lg font-medium text-gray-900">Directory</h2>
                <p className="mt-1 text-sm text-gray-600">Search directory of 3,018 Records</p>
                <form className="mt-6 flex space-x-4" onSubmit={searchRecords} action="#" method="POST">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <button
                              type="button"
                              onClick={() => searchRecords()}>
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /></button>
                      </div>
                      <input
                        type="search"
                        name="search"
                        id="search"
                        ref={thesisRef}
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        placeholder="Thesis Keyword"
                      />
                    </div>
                  </div>
                  <button
                    onSubmit={() => searchRecords()}
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="sr-only">Search</span>
                  </button>
                </form>
              </div>
              {/* Directory list */}
              <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
                  <div className="relative">
                    <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                      <h3>First Name</h3>
                    </div>
                    <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        ref={fnameRef}
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        placeholder="First Name"
                      />
                  </div>

                  <div className="relative">
                    <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                      <h3>Middle Name</h3>
                    </div>
                    <input
                        type="text"
                        name="middle-name"
                        id="middle-name"
                        autoComplete="middle-name"
                        ref={middleRef}
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        placeholder="Middle Name"
                      />
                  </div>

                  <div className="relative">
                    <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                      <h3>Last Name</h3>
                    </div>
                    <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        ref={lnameRef}
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        placeholder="Last Name"
                      />
                  </div>

                  <div className="relative">
                    <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                      <h3>University Name</h3>
                    </div>
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
                              <option value=""></option>
                            {universities.map((item) => (
                                    <option key={item.id} value={item._id}>{item.name}</option>
                            ))}
                      </select>
                  </div>

                  <div className="relative">
                    <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                      <h3>Year of Degree</h3>
                    </div>
                    <input
                        type="number"
                        name="year"
                        id="year"
                        ref={yearRef}
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        placeholder="Year"
                      />
                  </div>
              </nav>
            </aside>
          </div>
        </div>
      </div>
        </>
    );
};


const DashboardPage = () => {
    //const [user] = useCurrentUser();
    return (
        <>
            <DashboardSection />
        </>
    );
};
export default DashboardPage;