import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "components/Utils/spinner/index";

const Task = ({ id, title, description, fn }) => {
  const [loadingUser, setLoadingUser] = useState(false);

  let props = {
    id,
    setLoadingUser,
  };

  return (
    <div className="w-full p-4 mb-8 mx-auto border bg-white rounded-lg shadow flex items-center">
      <div className="flex-1">
        <Link to={`/task/${id}`}>
          <div className="text-blue-900 text-xl font-medium text-black">
            {title}
          </div>
          <p className="text-gray-500">{description}</p>
        </Link>
      </div>

      <div className="flex-initial ">
        {loadingUser ? (
          <Spinner size={6} mb={0} border={2} />
        ) : (
          <button
            onClick={() => fn(props)}
            className="text-xs bg-red-600 text-white rounded p-1"
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
