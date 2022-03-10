import React from "react";
import "./index.css";

const Spinner = ({ size = 12, mb = 4, border = 4 }) => {
  return (
    <div
      className={`loader ease-linear rounded-full border-${border} border-t-${border} border-gray-200 h-${size} w-${size} mb-${mb}`}
    ></div>
  );
};

export default Spinner;
