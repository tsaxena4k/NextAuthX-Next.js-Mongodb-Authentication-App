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
        { name: 'Dashboard', icon: HomeIcon, href: '#', current: false },
        { name: 'Locations', icon: MapIcon, href: 'locations', count: 3, current: false },
        { name: 'Universities', icon: BuildingLibraryIcon, href: '#', count: 4, current: false },
        { name: 'records requests', icon: CalendarIcon, href: '#', current: false },
        { name: 'Posters', icon: InboxIcon, href: 'posters', current: true },
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
            <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
                <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                    />
                    </div>
                    <nav className="mt-5 flex-1 space-y-1 bg-gray-800 px-2" aria-label="Sidebar">
                    {navigation.map((item) => (
                        <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                        >
                        <item.icon
                            className={classNames(
                            item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                            'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                        />
                        <span className="flex-1">{item.name}</span>
                        {item.count ? (
                            <span
                            className={classNames(
                                item.current ? 'bg-gray-800' : 'bg-gray-900 group-hover:bg-gray-800',
                                'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full'
                            )}
                            >
                            {item.count}
                            </span>
                        ) : null}
                        </a>
                    ))}
                    </nav>
                </div>
                <div className="flex flex-shrink-0 bg-gray-700 p-4">
                    <a href="#" className="group block w-full flex-shrink-0">
                    <div className="flex items-center">
                        <div>
                        <img
                            className="inline-block h-9 w-9 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                        </div>
                        <div className="ml-3">
                        <p className="text-sm font-medium text-white">Tom Cook</p>
                        <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
                        </div>
                    </div>
                    </a>
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