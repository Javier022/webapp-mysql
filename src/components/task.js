import React from "react";
import { Link } from "react-router-dom";

const Task = (props) => {
  const { id, title, description, fn } = props;

  return (
    <div className="w-full p-4 mb-8 mx-auto border bg-white rounded-xl shadow flex items-center">
      <div className="flex-1">
        <Link to={`/task/${id}`}>
          <div className="text-blue-900 text-xl font-medium text-black">
            {title}
          </div>
          <p className="text-gray-500">{description}</p>
        </Link>
      </div>

      <div className="flex-initial ">
        <button
          data-id={id}
          onClick={(e) => fn(e)}
          className="text-xs bg-red-600 text-white rounded p-1"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default Task;
