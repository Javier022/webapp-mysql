import React from "react";

// components
import MobileMenu from "./mobileMenu/index";
import DesktopMenu from "./desktopMenu/index";

const Navigation = () => {
  return (
    <nav className="bg-blue-900">
      <DesktopMenu />
      <MobileMenu />
    </nav>
  );
};

export default Navigation;
