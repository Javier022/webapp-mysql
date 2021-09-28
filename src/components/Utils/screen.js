import React from "react";

const Screen = ({ children }) => {
  return (
    <div className="bg-white bg-opacity-25 absolute h-full w-full flex  justify-center items-center">
      {children}
    </div>
  );
};

export default Screen;
