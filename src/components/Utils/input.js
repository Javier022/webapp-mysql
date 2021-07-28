import React from "react";

const Input = ({
  label,
  placeHolder,
  handleChange,
  error,
  value = "",
  focus = false,
  type = "text",
}) => {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        autoFocus={focus}
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={handleChange}
      />
      <p className="text-red-500">
        <small>{error && error}</small>
      </p>
    </>
  );
};

export default Input;
