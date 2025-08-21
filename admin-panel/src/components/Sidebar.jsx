import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {

  // const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isPagesMenuOpenDesktop, setIsPagesMenuOpenDesktop] = useState(false);
  const [isPagesMenuOpenMobile, setIsPagesMenuOpenMobile] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState("Dashboard");

  // SVG icon definitions (replace these or use your own)
  const dashboardIcon = (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const formsIcon = (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const profilesIcon = (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const chartsIcon = (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  );
  const buttonsIcon = (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const modalsIcon = (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const tablesIcon = (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );
  const pagesIcon = (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // Pages dropdown arrow icon
  const arrowIcon = (
    <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd" />
    </svg>
  );

  // Navigation items
  const navLinks = [
    { to: "/", label: "Dashboard", icon: dashboardIcon, isRoute: true },
    { to: "/reports", label: "Reports", icon: formsIcon, isRoute: true },
    { to: "/profile", label: "Profile", icon: profilesIcon, isRoute: true },
    // { to: "#", label: "Charts", icon: chartsIcon, isRoute: false },
    // { to: "#", label: "Buttons", icon: buttonsIcon, isRoute: false },
    // { to: "#", label: "Modals", icon: modalsIcon, isRoute: false },
    // { to: "#", label: "Tables", icon: tablesIcon, isRoute: false }
  ];


  // Pages submenu links
  const pageLinks = [
    // { to: "/login", label: "Login", isRoute: true },
    // { to: "#", label: "Create account", isRoute: false },
    // { to: "#", label: "Forgot password", isRoute: false },
    // { to: "#", label: "404", isRoute: false },
    // { to: "#", label: "Blank", isRoute: false }
  ];


  function handleOnclickLabel(e) {
    setIsActiveMenu(e.target.innerText);

  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link to="/" className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
            Trash2Points
          </Link>
          {/* <ul className="mt-6">
            <li className="relative px-6 py-3">
            <Link to="/" className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
            {dashboardIcon}
            <span className="ml-4">Dashboard</span>
            </Link>
            </li>
            </ul> */}
          <ul className='mt-6'>
            {navLinks.map(({ to, label, icon, isRoute }) => (
              <li className="relative px-6 py-3" key={label}>
                {isRoute ? (
                  <Link to={to} className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    onClick={() => setIsActiveMenu(label)}
                  >
                    {isActiveMenu === label ? <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> : null}
                    <span style={isActiveMenu === label ? { color: "#2d3748" } : null}>{icon}</span>
                    <span className="ml-4" style={isActiveMenu === label ? { color: "#2d3748" } : null}>{label}</span>
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    {icon}
                    <span className="ml-4">{label}</span>
                  </a>
                )}
              </li>
            ))}
            {/* <li className="relative px-6 py-3">
              <button
                type="button"
                className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setIsPagesMenuOpenDesktop(open => !open)}
                aria-haspopup="true"
              >
                <span className="inline-flex items-center">
                  {pagesIcon}
                  <span className="ml-4">Pages</span>
                </span>
                {arrowIcon}
              </button>
              {isPagesMenuOpenDesktop && (
                <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu">
                  {pageLinks.map(({ to, label, isRoute }) => (
                    <li key={label} className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      {isRoute ? (
                        <Link to={to} className="w-full block">
                          {label}
                        </Link>
                      ) : (
                        <a href="#" onClick={e => e.preventDefault()} className="w-full block">
                          {label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li> */}
          </ul>
          {/* <div className="px-6 my-6">
            <button
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Create account
              <span className="ml-2" aria-hidden="true">+</span>
            </button>
          </div> */}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
          onClick={onClose}
        ></div>
      )}
      <aside
        className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden ${isOpen ? '' : 'hidden'}`}
      >
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link to="/" className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
            Trash2Points
          </Link>
          {/* <ul className="mt-6">
            <li className="relative px-6 py-3">
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <Link to="/" className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
                {dashboardIcon}
                <span className="ml-4">Dashboard</span>
              </Link>
            </li>
          </ul> */}
          <ul>
            {navLinks.map(({ to, label, icon, isRoute }) => (
              <li className="relative px-6 py-3" key={label}>
                {isRoute ? (
                  <Link
                    to={to}
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    onClick={() => {
                      setIsActiveMenu(label);
                      if (onClose) onClose();
                    }}
                  >
                    {isActiveMenu === label ? <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span> : null}

                    <span style={isActiveMenu === label ? { color: "#2d3748" } : null}>{icon}</span>
                    <span className="ml-4" style={isActiveMenu === label ? { color: "#2d3748" } : null}>{label}</span>
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    {icon}
                    <span className="ml-4">{label}</span>
                  </a>
                )}
              </li>
            ))}
            {/* <li className="relative px-6 py-3">
              <button
                type="button"
                className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                onClick={() => setIsPagesMenuOpenMobile(open => !open)}
                aria-haspopup="true"
              >
                <span className="inline-flex items-center">
                  {pagesIcon}
                  <span className="ml-4">Pages</span>
                </span>
                {arrowIcon}
              </button>
              {isPagesMenuOpenMobile && (
                <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu">
                  {pageLinks.map(({ to, label, isRoute })=>(
                    <li key={label} className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                      {isRoute ? (
                        <Link to={to} className="w-full block">
                          {label}
                        </Link>
                      ) : (
                        <a href="#" onClick={e => e.preventDefault()} className="w-full block">
                          {label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li> */}
          </ul>
          {/* <div className="px-6 my-6">
            <button
              className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Create account
              <span className="ml-2" aria-hidden="true">+</span>
            </button>
          </div> */}
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      {/* <button
        onClick={() => setIsSideMenuOpen(open => !open)}
        className="md:hidden fixed bottom-4 left-4 z-30 bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        aria-label="Open sidebar"
      > */}
      {/* Hamburger Icon */}
      {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button> */}
    </>
  )
}

export default Sidebar
