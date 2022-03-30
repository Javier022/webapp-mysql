import React from "react";
import { Link } from "react-router-dom";

const Circle = ({ text = "App", href = "/" }) => {
  return (
    <Link replace to={href}>
      <div className="rounded-full h-16 w-16 flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 mb-3">
        <p className="text-white font-bold">{text}</p>
      </div>
    </Link>
  );
};

export default Circle;
