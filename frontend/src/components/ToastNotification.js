export default function ToastNotification({ title, content, onClose, id }) {
    return (
        <div className="fixed left-0 right-10 w-80 p-4 text-white bg-blue-500 rounded-md shadow">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {/* Optionally, add an icon or avatar here */}
                    <div className="mr-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="14"
                            viewBox="0 0 448 512"
                            className="w-8 h-8 rounded-full"
                        >
                            <path
                                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <div>
                        <div className="text-sm font-semibold">{title}</div>
                        <div className="text-sm">{content}</div>
                    </div>
                </div>
                <button
                    onClick={() => onClose(id)}
                    className="p-2 text-white hover:text-gray-900 rounded-full focus:ring-2 focus:ring-gray-300 hover:bg-white"
                    aria-label="Close"
                >
                    <svg
                        className="w-4 h-4"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            </div>
            <div className="mt-2 text-sm font-medium">a few seconds ago</div>
        </div>
    );
}
