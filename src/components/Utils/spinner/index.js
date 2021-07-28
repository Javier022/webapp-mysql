import React from "react";
import "./index.css";

const Spinner = () => {
  return (
    <div className="bg-white bg-opacity-20 absolute h-screen w-screen flex  justify-center items-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
    </div>
  );
};

export default Spinner;
