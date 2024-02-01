import React from 'react'
import { useEffect, useContext, useState, useRef } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import Lead from './Leads/Lead'
import User from './Users/User'
import Notification from './Notifications/Notification'
import Role from './Roles/Role'
import Task from './Tasks/Task'
import Project from './Projects/Project'
import Ticket from './Tickets/Ticket'
import AuthContext from '../AuthContext'
import AdminContext from '../AdminContext'
import ConfirmationModal from './ConfirmationModal'
import Toast from './ToastsContainers/Toast'
import ToastNotification from './ToastNotification'
import { io } from "socket.io-client";
import { IoMdChatboxes } from "react-icons/io";
import ChatList from './Chatbox/ChatList'

const moduleMap = {
	leads: <Lead />,
	users: <User />,
	roles: <Role />,
	notification: <Notification />,
	tasks: <Task />,
	projects: <Project />,
	tickets: <Ticket />

}




export default function Layout() {
	const { module } = useParams();

	const authContext = useContext(AuthContext);
	const admincontext = useContext(AdminContext);
	const [notifications, setNotifications] = useState([]);
	const [isChatlistOpen, setIsChatlistOpen] = useState(false);


	function onCloseNotification(id) {
		setNotifications(old => old.filter(x => x.id !== id));
	}

	const handleChatboxToggle = () => {
		setIsChatlistOpen((prev) => !prev);
	};

	useEffect(() => {

		// for connecting socket instance
		admincontext.setSocket(io('http://localhost:5000', {
			query: { token: localStorage.getItem("token") },

			transports: ["websocket", "polling"] // use WebSocket first, if available
		}));





	}, [])


	// FOR SOCKET START

	useEffect(() => {

		if (admincontext.socket !== null) {
			admincontext.socket.on("connect", () => {




				admincontext.socket.on("push", (args) => {

					let { title, content, id = new Date() } = args;



					setNotifications(old => [...old, { title, content, id }]);

				});

				admincontext.socket.on("newLeadData", (args) => {

					let { title, content, id = new Date() } = args;

					setNotifications(old => [...old, { title, content, id }]);

				});





				const engine = admincontext.socket.io.engine;

				engine.once("upgrade", () => {
					// called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
					console.log("On Upgrade", engine.transport.name); // in most cases, prints "websocket"
				});

				engine.on("packet", ({ type, data }) => {
					// called for each packet received
				});

				engine.on("packetCreate", ({ type, data }) => {
					// called for each packet sent
				});

				engine.on("drain", () => {
					// called when the write buffer is drained
				});

				engine.on("close", (reason) => {
					// called when the underlying connection is closed
				});
			});

			admincontext.socket.on("connect_error", (err) => {
				// revert to classic upgrade
				console.log("Connect Error :", err.message);
				admincontext.socket.io.opts.transports = ["polling", "websocket"];
			});

			admincontext.socket.on("disconnect", () => {

				console.log("Socket disconnected", admincontext.socket.id); // undefined
				admincontext.socket.removeAllListeners();
			});
		}

	}, [admincontext.socket])

	return (
		<div className="flex flex-col h-screen">
			<div className="flex-1 flex">
				<Sidebar />
				<ConfirmationModal data={admincontext.confirmModalData} open={admincontext.confirmModalOpen} closeConfirmationModal={admincontext.closeConfirmationModal} openConfirmationModal={admincontext.openConfirmationModal} />
				{admincontext.toast.msg && <Toast {...admincontext.toast} />}
				<div className='absolute w-[400px] h-auto p-4 z-50'>
					{notifications.map(n => (
						<ToastNotification
							key={n.id}
							id={n.id}
							onClose={onCloseNotification}
							title={n.title}
							content={n.content}
						/>
					))}
				</div>
				<div className="flex-1 p-4 min-h-0 overflow-auto">
					{authContext.auth.permissions[module]?.view && moduleMap[module]}
				</div>
			</div>
			<div className="w-full fixed bottom-0 h-10 flex items-center text-center bg-gray-800 text-white ">
				<div className='text-2xl ml-auto mr-4 cursor-pointer' onClick={handleChatboxToggle}>
					<IoMdChatboxes />
				</div>
			</div>
			{isChatlistOpen && <ChatList />}
		</div>
	)
}
