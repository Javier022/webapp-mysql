import React from "react";

const FullScreen = ({ children }) => {
  return (
    <div className="bg-white fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default FullScreen;
