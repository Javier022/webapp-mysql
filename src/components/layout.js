import React from "react";
// components
import Navigation from "./navigation/nav";
// utils
// import { useAuth } from "../utilities/useAuth";

// const publicItems = [
//   {
//     caption: "Sign in",
//     href: "/login",
//   },
//   {
//     caption: "Sign up",
//     href: "/signup",
//   },
// ];

// const protectedItems = [
//   {
//     caption: "Home",
//     href: "/home",
//   },
//   {
//     caption: "add Task",
//     href: "/create",
//   },
// ];

const Layout = ({ children, center = false, showNavigation = true }) => {
  // const auth = useAuth();

  // const navItems = auth ? protectedItems : publicItems;

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
