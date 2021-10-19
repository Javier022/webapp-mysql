import React, { useState, useContext } from "react";
import { DataContext } from "../../context/dataContext";
import "./nav.css";

// router
import { Link } from "react-router-dom";

const publicItems = [
  {
    caption: "App",
    href: "/",
  },
];

const protectedItems = [
  {
    caption: "Home",
    href: "/home",
  },
  {
    caption: "Add Task",
    href: "/create",
  },
];

const mobileMenuPrivateItems = [
  {
    caption: "Home",
    href: "/home",
  },
  {
    caption: "Add task",
    href: "/create",
  },
  {
    caption: "Profile",
    href: "/Profile",
  },
];
const mobileMenuPublicItems = [
  {
    caption: "Sign in",
    href: "/login",
  },
  {
    caption: "Sign up",
    href: "/signup",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { token, dataProfile, signOut } = useContext(DataContext);

  let mainMenu = token ? protectedItems : publicItems;
  let secondMenu = token ? mobileMenuPrivateItems : mobileMenuPublicItems;

  return (
    <>
      <nav className="bg-blue-900">
        {/* bg-gradient-to-r from-blue-900 to-blue-700 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {mainMenu.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        to={item.href}
                        // className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                        className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md  font-medium"
                      >
                        {item.caption}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* second navigation */}
            {token ? (
              <div className="relative inline-block text-left dropdown">
                <div className="hidden md:block ml-3 relative">
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white">
                      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
                        {dataProfile.username?.[0].toUpperCase()}
                      </p>
                    </div>
                  </button>
                </div>
                <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                  <div
                    className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                    aria-labelledby="headlessui-menu-button-1"
                    id="headlessui-menu-items-117"
                    role="menu"
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm leading-5">Signed in as</p>
                      <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                        {dataProfile.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        tabIndex="0"
                        className="hover:bg-blue-700 hover:text-white text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                        role="menuitem"
                      >
                        Your profile
                      </Link>

                      <span
                        role="menuitem"
                        tabIndex="-1"
                        className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                        aria-disabled="true"
                      >
                        New feature (soon)
                      </span>
                    </div>
                    <div className="py-1">
                      <button
                        className="hover:bg-blue-700 hover:text-white text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                        onClick={() => signOut()}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3 ">
                <Link
                  to="/login"
                  className="py-2 px-4 font-medium hover:bg-blue-700 text-white rounded  transition duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-4 font-medium hover:text-gray-200 text-white border rounded  transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* mobile nav */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-blue-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-900"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="bg-gradient-to-b from-blue-900 to-blue-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* bg-gradient-to-r from-blue-900 to-blue-700 */}
              {secondMenu.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={item.href}
                    // className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                    className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item.caption}
                  </Link>
                );
              })}

              {token && (
                <button
                  onClick={() => signOut()}
                  className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
