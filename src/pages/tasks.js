import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/dataContext";
import Task from "../components/task";

const TasksPage = () => {
  const { getData } = useContext(DataContext);
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await getData();
    setTasks(response);
  };

  useEffect(() => {
    getTasks();
  });

  return (
    <div className="w-3/4 mx-auto flex flex-col items-center justify-center">
      <div className="m-8 w-full flex items-center justify-around">
        <h1 className="text-blue-900 font-bold text-3xl text-center flex-auto">
          Todo app
        </h1>
        <button className="bg-blue-900 text-white  m-2 px-2 py-1 rounded-md flex-initial">
          Add Task
        </button>
      </div>
      {tasks.map((task) => {
        return <Task key={task.id} {...task} />;
      })}
    </div>
  );
};

export default TasksPage;
