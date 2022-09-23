import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, MapIcon, BuildingLibraryIcon} from '@heroicons/react/24/outline';

const DashboardSection = () => {
    const [user, { mutate }] = useCurrentUser();
    const [loading, isLoading] = useState(false);
    const nameRef = useRef();
    const bioRef = useRef();
    const profilePictureRef = useRef();
    const [msg, setMsg] = useState({ message: '', isError: false });
    const router = useRouter();

    /**useEffect(() => {
        if (!user) {
            router.push('/');
        } else {
            nameRef.current.value = user.name;
            bioRef.current.value = user.bio;
        }
    }, [user]);**/

    const navigation = [
        { name: 'Dashboard', icon: HomeIcon, href: 'dashboard', current: true },
        { name: 'Universities', icon: BuildingLibraryIcon, href: 'universities', count: 4, current: false },
        { name: 'records requests', icon: CalendarIcon, href: 'records', current: false },
        { name: 'Posters', icon: InboxIcon, href: 'posters', current: false },
        { name: 'Rewards Rules', icon: ChartBarIcon, href: '#', count: 12, current: false },
      ]
      
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <form className="space-y-6" action="#" method="POST">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Record Information</h3>
                        <p className="mt-1 text-sm text-gray-500">Add new record Information</p>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            First name
                            </label>
                            <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Last name
                            </label>
                            <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Email address
                            </label>
                            <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            University
                            </label>
                            <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                            </select>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                            Street address
                            </label>
                            <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mt-4 space-y-4">
                            <div className="flex items-center">
                            <input
                                id="push-everything"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                Male
                            </label>
                            </div>
                            <div className="flex items-center">
                            <input
                                id="push-email"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                Female
                            </label>
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
                    Save
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