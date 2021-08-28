import React from "react";

const Form = ({ children, handleSubmit, mt = 8 }) => {
  return (
    <div className={`mt-${mt}  w-full max-w-xs`}>
      <form
        className="bg-white border shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </div>
  );
};

export default Form;
