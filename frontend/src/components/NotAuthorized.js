import { FaLock } from 'react-icons/fa'
function NotAuthorized() {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <FaLock size={100} color="#FF5733" />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800 mt-4">
                        You are not authorized to view this page
                    </h1>
                </div>
            </div>
        </>
    )
}
export default NotAuthorized;