import React from 'react'
import { useEffect, useContext, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import Lead from './Leads/Lead'
import User from './Users/User'
import Notification from './Notifications/Notification'
import Role from './Roles/Role'
import Task from './Tasks/Task'
import Project from './Projects/Project'
import AuthContext from '../AuthContext'
import AdminContext from '../AdminContext'
import ConfirmationModal from './ConfirmationModal'
import Toast from './ToastsContainers/Toast'
import ToastNotification from './ToastNotification'

const moduleMap = {
	leads: <Lead />,
	users: <User />,
	roles: <Role />,
	notification: <Notification />,
	tasks: <Task />,
	projects: <Project />

}




export default function Layout() {
	const { module } = useParams();
	const authContext = useContext(AuthContext);
	const admincontext = useContext(AdminContext);
	const [notifications, setNotifications] = useState([]);



	function onCloseNotification(id) {
		setNotifications(old => old.filter(x => x.id !== id));
	}

	useEffect(() => {
		const nots = [
			{ id: 1, title: "Support", content: "A user is having problem with his system" },
			{ id: 2, title: "New Account Registration", content: "Name : Rajesh Agarwal" },
			{ id: 3, title: "New years eve", content: "Wish you a happy new year. It will be off tomorrow" }
		];

		for (let i = 0; i < nots.length; i++) {
			setTimeout(() => {
				setNotifications(old =>[...old,nots[i]]);
			}, i * 3000)
		}
	}, [])

	return (
		<div className="h-screen w-screen overflow-hidden flex flex-row">

			<Sidebar />
			<ConfirmationModal data={admincontext.confirmModalData} open={admincontext.confirmModalOpen} closeConfirmationModal={admincontext.closeConfirmationModal} openConfirmationModal={admincontext.openConfirmationModal} />
			{
				admincontext.toast.msg && <Toast {...admincontext.toast} />
			}

			<div className='fixed w-[400px] h-full p-4 z-50'>

				{notifications.map(n => {
					return <ToastNotification
						id={n.id}
						onClose={onCloseNotification}
						title={n.title}
						content={n.content} />
				})}

			</div>


			<div className="flex-1 p-4 min-h-0 overflow-auto">
				{/* {(moduleMap[module] && perms[modules]) ? moduleMap[module] : "404 page"} */}
				{authContext.auth.permissions[module]?.view && moduleMap[module]}
			</div>
		</div>
	)
}
