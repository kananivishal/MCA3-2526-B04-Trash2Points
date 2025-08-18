import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Login from './login'

const Default = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    return (
        <>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <Sidebar isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
                <div className="flex flex-col flex-1 w-full">
                    <Navbar onToggleSidebar={() => setIsSideMenuOpen(prev => !prev)} />
                    <main className="h-full overflow-y-auto">
                        <div className="container px-6 mx-auto grid">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div >
        </>
    )
}

export default Default
