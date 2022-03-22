import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "context/dataContext";

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

const MobileMenu = () => {
  const { token, rol, signOut, isOpen } = useContext(DataContext);

  let items = token ? mobileMenuPrivateItems : mobileMenuPublicItems;

  return (
    <>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="bg-gradient-to-b from-blue-900 to-blue-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* bg-gradient-to-r from-blue-900 to-blue-700 */}
            {rol === 1 && (
              <Link
                to="/dashboard"
                className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md  font-medium"
              >
                Dashboard
              </Link>
            )}
            {items.map((item, index) => {
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
    </>
  );
};

export default MobileMenu;
