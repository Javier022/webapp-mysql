import React from "react";

const Button = (props) => {
  const { fn, name, refButton } = props;

  return (
    <button
      ref={refButton}
      onClick={fn && fn}
      className="bg-blue-900 font-bold text-white py-2 px-4 rounded-md flex-initial"
    >
      {name}
    </button>
  );
};

export default Button;
