import React from 'react'
import { Outlet,useParams  } from 'react-router-dom'
import Sidebar from './Sidebar'
import Lead from './Leads/Lead'
import User from './Users/User'
import Role from './Roles/Role'

const moduleMap = {
	leads:<Lead />,
	users:<User />,
	roles:<Role />
}


export default function Layout() {
	const { module } = useParams();
	return (
		<div className="h-screen w-screen overflow-hidden flex flex-row">
			<Sidebar />
            <div className="flex flex-col flex-1 border-red-300">
				
				<div className="flex-1 p-4 min-h-0 overflow-auto">
					{moduleMap[module]}
                </div>
			</div>
		</div>
	)
}
