    import React, {useEffect} from "react";
    import { FcBullish } from 'react-icons/fc';
    import { Link, useLocation } from 'react-router-dom'
    import { HiOutlineLogout } from 'react-icons/hi'
    import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from "../resources/icons/icons";



    function Sidebar() {
        const { pathname } = useLocation()
    
        return (
            <div className="w-60 p-3 flex-col border-solid border-r border-neutral-400 md:block hidden">
                <div className="flex items-center gap-2 px-1 py-3">
                    <FcBullish fontSize={24} />
                    <span className="text-neutral-200 text-lg">VKV TECH</span>
                </div>
                <div className="py-8 flex flex-1 flex-col gap-0.5">
                    {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                        <SidebarLink key={link.key} link={link} pathname={pathname}/>
                    ))}

                    <div className="flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer text-red-500" >
                        <span className="text-xl">
                            <HiOutlineLogout />
                        </span>
                        Logout
                    </div>

                </div>
            </div>
        )
    }

    function SidebarLink({ link,pathname }) {
   
        
        return (
            <Link
                to={link.path}
                className={(pathname === link.path ? 'bg-neutral-700 text-white flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base' : 'text-neutral-400 flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base')}
            >
                <span className="text-xl">{link.icon}</span>
                {link.label}
            </Link>
        )
    }


    export default Sidebar;