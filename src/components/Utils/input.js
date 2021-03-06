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
        // required
        className={`shadow appearance-none border
        ${error && "border-red-500"}
        ${error ? "focus:border-red-500" : "focus:border-blue-500"}
        rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
