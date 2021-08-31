import React from "react";

const Alert = ({ message, color = "red", fn }) => {
  return (
    <div
      className={`transition duration-500 ease-in-out ease-in-out flex justify-around items-center py-3 mb-4 border border-${color}-300 rounded bg-${color}-500 bg-opacity-25`}
    >
      <p className={`text-${color}-500 font-normal text-sm`}>{message}</p>
      <button onClick={fn} className={`text-${color}-500 font-semibold`}>
        x
      </button>
    </div>
  );
};

export default Alert;
