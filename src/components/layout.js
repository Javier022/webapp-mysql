import React from "react";
// components
import Navigation from "./nav";
// utils
import { UseAuth } from "../utilities/auth";

const publicItems = [
  {
    caption: "Sign in",
    href: "/login",
  },
  {
    caption: "Sign up",
    href: "/signup",
  },
];

const protectedItems = [
  {
    caption: "Home",
    href: "/home",
  },
  {
    caption: "add Task",
    href: "/create",
  },
];

const Layout = ({ children, center = false, showNavigation = true }) => {
  const auth = UseAuth();

  const navItems = auth ? protectedItems : publicItems;

  return (
    <>
      {showNavigation && <Navigation navItems={navItems} auth={auth} />}
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
