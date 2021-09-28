import React from "react";

const Button = (props) => {
  const { fn, name, refButton, color = "", type = "", textColor = "" } = props;

  return (
    <button
      ref={refButton}
      onClick={fn && fn}
      className={`
      ${color ? color : "bg-blue-900"} 
      ${textColor ? textColor : "text-white"}
      w-full font-bold  py-2 px-4 rounded-md flex-initial`}
      type={type}
    >
      {name}
    </button>
  );
};

export default Button;
