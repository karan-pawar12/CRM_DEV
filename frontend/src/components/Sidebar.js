import React, { useContext, useEffect } from "react";
import { FcBullish } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from "../resources/icons/icons";
import AuthContext from "../AuthContext";
import { Badge } from '@nextui-org/react';


function Sidebar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);


    if (!authContext.auth) {
        return <h1>Loading...</h1>;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/cpanel/login');
    };


    return (
        <div className="w-60 p-3 flex-col border-solid border-r border-neutral-400 md:block hidden">
            <div className="flex items-center gap-2 px-1 py-3">
                <FcBullish fontSize={24} />
                <span className="text-neutral-200 text-lg">VKV TECH</span>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
                {
                    authContext.auth.permissions.length !== 0 && <>
                        {DASHBOARD_SIDEBAR_LINKS.map((link) => {
                            if (authContext.auth.permissions[link.key]?.view) {

                                return <SidebarLink key={link.key} link={link} pathname={pathname} icon={link.icon} />;
                            }
                        })}
                    </>

                }

                <div className="flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer text-red-500" onClick={handleLogout}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>

            </div>
        </div>
    )
}

function SidebarLink({ link, pathname, icon }) {
    const linkPath = `/cpanel${link.path}`;

    return (
        <Link
            to={linkPath}
            className={`flex items-center ${pathname === linkPath ? 'bg-neutral-700 text-white' : 'text-neutral-400'} hover:bg-neutral-700 hover:no-underline gap-2 font-light px-3 py-2`}
        >
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    {link.label}
                </div>
                {linkPath === '/cpanel/notification' && (
                    <div className="flex items-center mr-3"><Badge content={2} color="danger" shape="circle"></Badge></div>
                )}
            </div>
        </Link>
    )
}


export default Sidebar;