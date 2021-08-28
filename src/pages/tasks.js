import React, { useState, useEffect, useContext, useCallback } from "react";
import { DataContext } from "../context/dataContext";
import { deleteTask } from "../api/apiUtils";

// components
import Task from "../components/task";
import Layout from "../components/layout";
import Button from "../components/Utils/button";
import Spinner from "../components/Utils/spinner";
import { notify } from "../utilities/toast";

// util
import { UseAuth } from "../utilities/auth";

// router
import { Link } from "react-router-dom";

const TasksPage = () => {
  const { getData, tasks, setTasks, deleteTaskById } = useContext(DataContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // auth
  const token = UseAuth();

  const executeDelete = (e) => {
    return deleteTask(e, tasks, setTasks, deleteTaskById, token, notify);
  };

  const parseData = useCallback(
    (array) => {
      const newData = array.reduce(
        (acc, el) => ({
          ...acc,
          [el.id]: el,
        }),
        {}
      );

      setTasks(newData);
    },
    [setTasks]
  );

  const getTasks = useCallback(async () => {
    try {
      const data = await getData(token);

      data && parseData(data);
      setLoading(false);
    } catch (error) {
      if (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
  }, [getData, parseData, token]);

  useEffect(() => {
    console.log("useEffect");

    getTasks();
  }, []);

  const handleError = (error) => {
    if (error) return <p>Error not foud</p>;
    return hasTasks();
  };

  const hasTasks = () => {
    const data = Object.values(tasks);
    if (!(data && data.length !== 0)) return <p>add your first task</p>;

    const result = data.map((task) => {
      return <Task key={task.id} {...task} fn={executeDelete}></Task>;
    });

    return result;
  };

  return (
    <Layout>
      <div className="m-8 w-full flex items-center justify-around">
        <h1 className="text-blue-900 font-bold text-3xl text-center flex-auto">
          your tasks ...
        </h1>
        {/* <Link to="/create">
          <Button name="add task" />
        </Link> */}
      </div>
      {loading ? <Spinner /> : handleError(error)}
    </Layout>
  );
};

export default TasksPage;
