import React, {useContext, useEffect, useState} from "react";
//import {useStateContext} from "../../../contex/ContextProvider";
import {HomeIcon} from '@heroicons/react/24/outline'
import {AdjustmentsHorizontalIcon} from "@heroicons/react/24/outline";
import {admin, adminLinks} from "../../../data/starter";
import {ScreenWidthContext} from "../../../contex/ScreenWidthContext";
import {NavLink} from "react-router-dom";
import {ShowSidebarContext} from "../../../contex/ShowSidebarContext";

const Sidebar = ({Links = adminLinks}) => {

    /*const { activeMenu, setActiveMenu, screenSize,userType } = useStateContext();

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(true);
        }
    };*/
    const {isVisible,setVisible} = useContext(ShowSidebarContext)



    const activeLink = 'flex flex-row w-11/12 h-16 items-center p-1 pl-6 focus:bg-opacity-10 gap-4 items-start justify-start text-white text-opacity-30 text-opacity-100 after:small-line';
    const normalLink = 'flex flex-row w-11/12 h-16 items-center p-1 pl-6 focus:bg-opacity-10 gap-4 items-start justify-start text-white text-opacity-30';


    return (<>
            {isVisible && <>
                <div
                    className="hidden md:block z-50 rounded-r-3xl xl:rounded-none fixed top-0 left-0 flex flex-col md:w-64 xl:w-[15%]  h-screen flex-col bg-gradient-to-b from-[#271547] to-[#521b38] pr-2 py-6 pl-6 gap-2 shadow-xl shadow-neutral-300/20 dark:shadow-gray-900/20">

                    <div className="flex flex-row pb-4 w-full gap-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6 text-white scale-150">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
                        </svg>

                        <h1 className="text-xl xl:text-2xl text-white font-bold flex ">Intern<span
                            className="text-secondary-500">.</span>ship
                        </h1>
                    </div>

                    <div className="flex flex-col w-full items-start justify-start divide-y divide-white divide-opacity-25">
                        {Links.map((link) => (

                            <NavLink
                                key={link.name}
                                to ={link.route}
                                className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                                {link.icon}
                                <h6 className="text-sm font-semibold flex-1 text-start ">{link.name}</h6>
                                <div className="focus:bg-white self-end w-2 h-1/2"/>
                            </NavLink>))}
                    </div>

                    <button
                        className="mt-auto flex flex-row w-[95%] py-2 items-center p-1 gap-4 items-start justify-start text-white text-opacity-30 border-opacity-30 focus:text-opacity-100 focus:border-opacity-100 border-2 border-white rounded-xl">
                        <AdjustmentsHorizontalIcon className="w-6 h-6 text-white"/>

                        <h6 className="text-sm font-semibold flex-1 text-start ">Settings</h6>
                        <div className="focus:bg-white self-end w-2 h-1/2"/>
                    </button>
                </div>
                <div
                    className="fixed hidden md:block xl:hidden h-screen w-screen bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30  dark:bg-opacity-80 !z-20"
                    onClick={(e) => {
                        e.isPropagationStopped()
                        setVisible(prevState => !prevState)
                    }}>

                </div>
            </>}

        </>);

};

export default Sidebar;