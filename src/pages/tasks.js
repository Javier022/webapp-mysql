import React, { useState, useEffect, useContext, useCallback } from "react";
import { DataContext } from "../context/dataContext";

import api from "../services/api";
// components
import Task from "../components/task";
import Layout from "../components/layout";
import Button from "../components/Utils/button";
import Screen from "../components/Utils/screen";
import Spinner from "../components/Utils/spinner";
import TitlePage from "../components/Utils/titlePage";

// utils
import { notify } from "../utilities/toast";
import { parseData } from "../utilities/parseData";
// router
import { Link } from "react-router-dom";

const TasksPage = () => {
  const [loading, setLoading] = useState(false);
  const { tasks, setTasks } = useContext(DataContext);

  const deleteTask = async (e) => {
    const id = e.target.dataset.id;
    try {
      const request = await api.delete(`/tasks/${id}`);

      if (request.status === 200 && request.data.success) {
        delete tasks[id];

        setTasks({ ...tasks });
        notify("success", "task deleted");
      }
    } catch (error) {
      notify("error", error.message);
    }
  };

  const getTasks = async () => {
    try {
      setLoading(true);
      const request = await api.get("/tasks");

      if (request.status === 200 && request.data.success === true) {
        const data = request.data.tasks;

        if (Array.isArray(data) && data.length !== 0) {
          const newFormatData = parseData(data);
          setTasks(newFormatData);
          return setLoading(false);
        }

        setLoading(false);
        setTasks({});
      }
    } catch (error) {
      setLoading(false);
      notify("error", error.message);
    }
  };

  const handleTasks = () => {
    const data = Object.values(tasks);
    if (!(data && data.length !== 0))
      return (
        <Link to="/create" className="text-lg text-gray-400 font-semibold">
          add your first task
        </Link>
      );

    const paintTasks = data.map((task) => {
      return <Task key={task.id} {...task} fn={(e) => deleteTask(e)}></Task>;
    });

    return paintTasks;
  };

  useEffect(() => {
    console.log("useEffect tasks");
    getTasks();
  }, []);

  return (
    <Layout>
      <div className="relative  m-8 w-full flex items-center justify-center">
        <TitlePage text="All your tasks" />
        <Link className="hidden  absolute block right-0 top-0" to="/create">
          <Button name="add a task" />
        </Link>
      </div>
      {loading ? <Screen children={<Spinner />} /> : handleTasks()}
    </Layout>
  );
};

export default TasksPage;
