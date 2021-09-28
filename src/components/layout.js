import React from "react";
// import { DataContext } from "../context/dataContext";

// components
import Navigation from "./navigation/nav";

const Layout = ({ children, center = false, showNavigation = true }) => {
  return (
    <>
      {showNavigation && <Navigation />}
      <main
        className={`h-screen w-3/4 mx-auto flex flex-col items-center 
      ${center ? "justify-center" : ""}`}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
