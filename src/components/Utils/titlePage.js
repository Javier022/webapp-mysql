import React from "react";

const TitlePage = ({ text, mt = 0 }) => {
  return (
    <h1 className={`mt-${mt} text-blue-900 font-bold text-3xl text-center`}>
      {text}
    </h1>
  );
};

export default TitlePage;
