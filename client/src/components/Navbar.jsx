import React from 'react';
import {
    FaTachometerAlt,
    FaPlusCircle,
    FaClipboardList,
    FaChartBar,
    FaSignOutAlt,
} from 'react-icons/fa';

function Navbar() {
    return (
        <div className="flex items-center h-[85vh]">

            <div className="group w-16 hover:w-52 transition-[width] duration-300 h-full bg-[#0D1117] mt-8 rounded-lg px-4 py-10 overflow-hidden">
                <ul className="text-white flex flex-col justify-center gap-8 text-base font-normal h-full">
                    <li className="hover:bg-[#F4F4F4] px-2 py-3 rounded-md hover:text-[#0D1117] flex items-center gap-3">
                        <div className="min-w-[20px] text-xl"><FaTachometerAlt /></div>
                        <span className="opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                            Dashboard
                        </span>
                    </li>
                    <li className="hover:bg-[#F4F4F4] px-2 py-3 rounded-md hover:text-[#0D1117] flex items-center gap-3">
                        <div className="min-w-[20px] text-xl"><FaPlusCircle /></div>
                        <span className="opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                            Create Event
                        </span>
                    </li>
                    <li className="hover:bg-[#F4F4F4] px-2 py-3 rounded-md hover:text-[#0D1117] flex items-center gap-3">
                        <div className="min-w-[20px] text-xl"><FaClipboardList /></div>
                        <span className="opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                            Manage Event
                        </span>
                    </li>
                    <li className="hover:bg-[#F4F4F4] px-2 py-3 rounded-md hover:text-[#0D1117] flex items-center gap-3">
                        <div className="min-w-[20px] text-xl"><FaChartBar /></div>
                        <span className="opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                            Analytics
                        </span>
                    </li>
                    <li className="hover:bg-[#F4F4F4] px-2 py-3 rounded-md hover:text-[#0D1117] flex items-center gap-3">
                        <div className="min-w-[20px] text-xl"><FaSignOutAlt /></div>
                        <span className="opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 whitespace-nowrap">
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        </div>

    );
}

export default Navbar;
