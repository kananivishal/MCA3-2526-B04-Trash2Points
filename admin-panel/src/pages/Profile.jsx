import React from "react";

export default function Profile() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-lg text-gray-700 dark:text-gray-200">No user data found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
                <div className="flex flex-col items-center">
                    <div className="w-28 h-28 mb-4 rounded-full bg-gradient-to-tr from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-700 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                        {user.name[0]}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">{user.name}</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">{user.email}</span>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4">
                    <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                        <svg className="w-6 h-6 text-purple-500 dark:text-purple-300 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M3 10a7 7 0 0114 0v4a7 7 0 01-14 0v-4z" />
                            <path d="M8 21h8" />
                        </svg>
                        <div>
                            <span className="block text-xs text-gray-500 dark:text-gray-400">Phone</span>
                            <span className="text-base font-medium text-gray-700 dark:text-gray-200">{user.phoneno}</span>
                        </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                        <svg className="w-6 h-6 text-purple-500 dark:text-purple-300 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M21 10.5a8.38 8.38 0 01-.9 3.8c-.6 1.2-1.5 2.2-2.6 2.9-1.1.7-2.4 1.1-3.8 1.1s-2.7-.4-3.8-1.1c-1.1-.7-2-1.7-2.6-2.9a8.38 8.38 0 01-.9-3.8c0-2.2.8-4.2 2.2-5.7C7.8 3.8 9.8 3 12 3s4.2.8 5.7 2.3c1.4 1.5 2.3 3.5 2.3 5.7z" />
                        </svg>
                        <div>
                            <span className="block text-xs text-gray-500 dark:text-gray-400">Address</span>
                            <span className="text-base font-medium text-gray-700 dark:text-gray-200">{user.address}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}