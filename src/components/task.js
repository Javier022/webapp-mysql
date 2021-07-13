import React from "react";

const task = ({ id, title, description }) => {
  const deleteTask = (taskId) => {
    console.log(taskId, "eliminaste la tarea");
  };

  return (
    <div className="w-full p-4 mb-8  mx-auto bg-white rounded-xl shadow flex items-center">
      <div className="flex-1">
        <div className="text-blue-900 text-xl font-medium text-black">
          {title}
        </div>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="flex-initial">
        <button
          onClick={() => deleteTask(id)}
          className="text-xs bg-red-600 text-white rounded p-1"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default task;
