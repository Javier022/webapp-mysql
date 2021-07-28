import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="h-screen w-3/4 mx-auto flex flex-col items-center ">
      {children}
    </main>
  );
};

export default Layout;
