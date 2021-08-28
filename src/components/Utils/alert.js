import React from "react";

const Alert = ({ message, color, fn }) => {
  return (
    <div
      className={`flex justify-around items-center py-3 my-5 border border-${color}-300 rounded bg-${color}-500 bg-opacity-25`}
    >
      <p className={`text-${color}-500 font-normal text-sm`}>{message}</p>
      <button onClick={fn} className={`text-${color}-500 font-semibold`}>
        x
      </button>
    </div>
  );
};

export default Alert;
