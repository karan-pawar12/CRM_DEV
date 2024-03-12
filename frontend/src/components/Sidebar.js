import React, { useContext, useEffect, useState } from "react";
import { FcBullish } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineLogout, HiOutlineMenuAlt2 } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from "../resources/icons/icons";
import AuthContext from "../AuthContext";
import { Badge } from '@nextui-org/react';
import getNotificationCount_api from "../api_strings/admin/getNotificationCount";
import Cookies from 'js-cookie';

function Sidebar() {
    const [notificationCount, setNotificationCount] = useState(0);
    const [showText, setShowText] = useState(true); // State for toggling text display
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        getAllNotification();
    }, []);

    function getAllNotification() {
        getNotificationCount_api((error, res) => {
            if (error) {
                console.log("Error", error);
            } else {
                setNotificationCount(res.data.totalCount);
            }
        })
    }

    if (!authContext.auth) {
        return <h1>Loading...</h1>;
    }

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/cpanel/entry');
    };

    const handleToggleText = () => {
        setShowText((prevShowText) => !prevShowText);
    };

    return (
        <div className={`w-${showText ? '50' : '20'} p-3 flex-col border-solid border-r border-neutral-400 md:block hidden`}>
            <div className="flex items-center justify-between px-3 py-3">
                <div className="flex items-center gap-2 cursor-pointer" onClick={handleToggleText}>
                    <span className="text-3xl">
                        <HiOutlineMenuAlt2 />
                    </span>
                </div>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
                {authContext.auth.permissions.length !== 0 && <>
                    {DASHBOARD_SIDEBAR_LINKS.map((link) => {
                        if (authContext.auth.permissions[link.key]?.view) {
                            return (
                                <SidebarLink
                                    key={link.key}
                                    link={link}
                                    pathname={pathname}
                                    icon={link.icon}
                                    showText={showText}
                                    notificationCount={notificationCount}
                                />
                            );
                        }
                    })}
                </>}

                <div className="flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer text-red-500" onClick={handleLogout}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    {showText && <span>Logout</span>}
                </div>


            </div>
        </div>
    );
}

function SidebarLink({ link, pathname, icon, showText, notificationCount }) {
    const linkPath = `/cpanel${link.path}`;

    return (
        <Link
            to={linkPath}
            className={`flex items-center ${pathname === linkPath ? 'bg-neutral-700 text-white' : 'text-neutral-600'} hover:bg-neutral-700 hover:text-white hover:no-underline gap-2 font-light px-3 py-2`}
        >
            <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-2 font-semibold">
                    <span className="text-xl">{icon}</span>
                    {showText && <span>{link.label}</span>}
                </div>
                {linkPath === '/cpanel/notification' && (
                    <div className="flex items-center mr-3">
                        <Badge content={notificationCount} color="danger" shape="circle"></Badge>
                    </div>
                )}
            </div>
        </Link>
    );
}

export default Sidebar;