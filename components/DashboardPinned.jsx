import React, { Fragment, useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react'
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, MapIcon, BuildingLibraryIcon} from '@heroicons/react/24/outline';
import { Bars3CenterLeftIcon, Bars4Icon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
    ChevronRightIcon,
    ChevronUpDownIcon,
    EllipsisVerticalIcon,
    MagnifyingGlassIcon,
  } from '@heroicons/react/20/solid';

const DashboardPinnedSection = () => {
    const [user, { mutate }] = useCurrentUser();
    const [loading, isLoading] = useState(false);
    const [counts, setCounts] = useState([]);
    const nameRef = useRef();
    const bioRef = useRef();
    const profilePictureRef = useRef();
    const [msg, setMsg] = useState({ message: '', isError: false });
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/');
        } else {
            //nameRef.current.value = user.name;
            //bioRef.current.value = user.bio;
            isLoading(true)
            fetch('/api/fetchcounts')
              .then((res) => res.json())
              .then((data) => {
                setCounts(data)
                isLoading(false)
            });
        }
    }, [user]);
    const projects = [
        {
          id: 1,
          title: 'Universites',
          initials: 'GA',
          team: 'Engineering',
          totalMembers: counts[0],
          lastUpdated: 'March 17, 2020',
          pinned: true,
          bgColorClass: 'bg-pink-600',
          href: '/universities'
        },{
          id: 1,
          title: 'Records',
          initials: 'GA',
          team: 'Engineering',
          totalMembers: counts[1],
          lastUpdated: 'March 17, 2020',
          pinned: true,
          bgColorClass: 'bg-green-600',
          href: '/records'
        },{
          id: 1,
          title: 'Posters',
          initials: 'GA',
          team: 'Engineering',
          totalMembers: counts[2],
          lastUpdated: 'March 17, 2020',
          pinned: true,
          bgColorClass: 'bg-blue-600',
          href: '/posters'
        }
        // More projects...
      ]

      const projectsPoster = [
        {
          id: 1,
          title: 'Records',
          href: '/records',
          initials: 'GA',
          team: 'Engineering',
          totalMembers: counts[0],
          lastUpdated: 'March 17, 2020',
          pinned: true,
          bgColorClass: 'bg-green-600',
        }
      ]
      const pinnedProjectsPoster = projectsPoster.filter((project) => project.pinned);
      const pinnedProjects = projects.filter((project) => project.pinned);
      
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            {/* Pinned projects */}
            <div className="mt-6 px-4 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-900">Pinned Projects</h2>
              <ul role="list" className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                {user.role == 'poster'?pinnedProjectsPoster.map((project) => (
                  <li key={project.id} className="relative col-span-1 flex rounded-md shadow-sm">
                    <div
                      className={classNames(
                        project.bgColorClass,
                        'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                      )}
                    >
                      {project.initials}
                    </div>
                    <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
                      <div className="flex-1 truncate px-4 py-2 text-sm">
                        <a href={project.href} className="font-medium text-gray-900 hover:text-gray-600">
                          {project.title}
                        </a>
                        <p className="text-gray-500">{project.totalMembers} Items</p>
                      </div>
                    </div>
                  </li>
                )):pinnedProjects.map((project) => (
                  <li key={project.id} className="relative col-span-1 flex rounded-md shadow-sm">
                    <div
                      className={classNames(
                        project.bgColorClass,
                        'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                      )}
                    >
                      {project.initials}
                    </div>
                    <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
                      <div className="flex-1 truncate px-4 py-2 text-sm">
                        <a href={project.href} className="font-medium text-gray-900 hover:text-gray-600">
                          {project.title}
                        </a>
                        <p className="text-gray-500">{project.totalMembers} Items</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        </>
    );
};


const DashboardPinned = () => {
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
            <DashboardPinnedSection />
        </>
    );
};
export default DashboardPinned;