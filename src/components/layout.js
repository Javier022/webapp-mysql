import React from "react";

// components
import Navigation from "components/navigation/nav";

const Layout = ({
  children,
  center = false,
  showNavigation = true,
  height = "screen",
}) => {
  return (
    <>
      {showNavigation && <Navigation />}
      <main
        className={`h-${height} w-3/4 mx-auto flex flex-col items-center 
      ${center ? "justify-center" : ""}`}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
