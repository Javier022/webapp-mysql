import React, { useContext } from "react";
import { DataContext } from "../context/dataContext";

import { Link } from "react-router-dom";

const Navigation = ({ navItems, auth }) => {
  const { signOut, useHistory } = useContext(DataContext);

  const history = useHistory();

  const logOut = () => {
    signOut();

    return history.push("/");
  };

  return (
    <header>
      <nav className="bg-blue-900 text-white shadow-md flex justify-between">
        <p className="inline-block px-6 py-5 font-bold">Todo App</p>
        <ul className="flex">
          {navItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className="hover:bg-blue-700 inline-block px-6 py-5"
                  to={item.href}
                >
                  {item.caption}
                </Link>
              </li>
            );
          })}
          {auth ? (
            <button
              onClick={() => logOut()}
              className="hover:bg-blue-700 inline-block px-6 py-5"
            >
              Sign Out
            </button>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
