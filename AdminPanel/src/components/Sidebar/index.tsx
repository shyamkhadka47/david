import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { BsPeopleFill, BsSliders } from 'react-icons/bs';
import { FaBlog, FaPeopleGroup, FaPhone, FaQuestion } from 'react-icons/fa6';
import {
  MdClose,
  MdEngineering,
  MdPlaylistAdd,
  MdVideoSettings,
} from 'react-icons/md';
import { IoPulseOutline } from 'react-icons/io5';

import { RxDashboard } from 'react-icons/rx';
import { AiOutlineSetting } from 'react-icons/ai';

import { TfiGallery } from 'react-icons/tfi';
import { TbLogout2 } from 'react-icons/tb';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const navigate = useNavigate();

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/dashboard">
          <h1 className="text-[19px] text-white font-bold underline underline-offset-[5px] ">
            David Arts
          </h1>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <MdClose size={25} />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            {/* <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3> */}

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/dashboard' || pathname.includes('dashboard')
                }
              >
                {() => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/dashboard"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/dashboard' ||
                            pathname.includes('dashboard')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <RxDashboard size={20} />
                        Dashboard
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}

                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!--site-settings --> */}
              <li>
                <NavLink
                  to="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('settings') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <AiOutlineSetting size={20} />
                  Site Settings
                </NavLink>
              </li>
              {/* METADATA ROUTE */}
              <li>
                <NavLink
                  to="/metadata"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('settings') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <IoPulseOutline size={20} />
                  Meta Data
                </NavLink>
              </li>

              {/* STORY TELLER */}
              <li>
                <NavLink
                  to="/story-tellers"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('slider') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FaBlog size={20} />
                  Story Teller
                </NavLink>
              </li>

              {/* Sliders  */}
              {/* <li>
                <NavLink
                  to="/slider"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('slider') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <BsSliders size={20} />
                  Sliders
                </NavLink>
              </li> */}
              {/* BANNER VIDEOS */}
              <li>
                <NavLink
                  to="/banner-videos"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('slider') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <BsSliders size={20} />
                  Banner Videos
                </NavLink>
              </li>
              {/* Videos */}
              <li>
                <NavLink
                  to="/videos"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('slider') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <MdVideoSettings size={20} />
                  Videos Link
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/category"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 ${
                      isActive ? 'bg-graydark dark:bg-meta-4' : ''
                    }`
                  }
                >
                  {/* <GiPlaylist size={20} /> */}
                  <MdPlaylistAdd size={20} />
                  Visual History Category
                </NavLink>
              </li>

              {/* Gallery */}
              <li>
                <NavLink
                  to="/gallery"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <TfiGallery size={20} />
                  Visual History
                </NavLink>
              </li>

              {/* About us  */}
              <li>
                <NavLink
                  to="/about-us"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <BsPeopleFill />
                  Biography
                </NavLink>
              </li>
              {/* Customer Testimonial */}
              {/* <li>
                <NavLink
                  to="/customers-testimonials"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FaPeopleGroup />
                  Customer Testimonials
                </NavLink>
              </li> */}

              {/* Our Services */}
              {/* <li>
                <NavLink
                  to="/services"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <MdEngineering />
                  Services
                </NavLink>
              </li> */}

              {/* User Queries */}
              {/* <li>
                <NavLink
                  to="/user-queries"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FaPhone />
                  User Queries
                </NavLink>
              </li> */}
              {/* FAQ'S */}
              {/* <li>
                <NavLink
                  to="/faq"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FaQuestion size={20} />
                  {`FAQ'S`}
                </NavLink>
              </li> */}

              {/* Logout */}
              <li>
                {' '}
                <div
                  className={`mt-2 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
                >
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      navigate('/');
                    }}
                    className="flex bg-black text-white items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-white lg:text-base"
                  >
                    <TbLogout2 size={30} />
                    Log Out
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
