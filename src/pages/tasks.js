import React, { useState, useEffect, useContext, useCallback } from "react";
import { DataContext } from "../context/dataContext";
import Task from "../components/task";
import Layout from "../components/layout";
import { Link } from "react-router-dom";
import Button from "../components/Utils/button";
import { notify } from "../utilities/toast";
import Spinner from "../components/Utils/spinner";
import { deleteTask } from "../api/apiUtils";

const TasksPage = () => {
  const { getData, tasks, setTasks, deleteTaskById } = useContext(DataContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const executeDelete = (e) => {
    return deleteTask(e, tasks, setTasks, deleteTaskById, notify);
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

  useEffect(() => {
    console.log("useEffect");

    const getTasks = async () => {
      try {
        const data = await getData();
        data && parseData(data);
        setLoading(false);
      } catch (error) {
        if (error) {
          setLoading(false);
          setError(true);
        }
      }
    };

    getTasks();
  }, []);

  const hasTasks = () => {
    const data = Object.values(tasks);
    if (!(data && data.length !== 0)) return <p>add your first task</p>;

    const result = data.map((task) => {
      return <Task key={task.id} {...task} fn={executeDelete}></Task>;
    });

    return result;
  };

  const handleError = (error) => {
    if (error) return <p>404 not foud</p>;
    return hasTasks();
  };

  return (
    <Layout>
      <div className="m-8 w-full flex items-center justify-around">
        <h1 className="text-blue-900 font-bold text-3xl text-center flex-auto">
          Todo app
        </h1>
        <Link to="/create">
          <Button name="add task" />
        </Link>
      </div>
      {loading ? <Spinner /> : handleError(error)}
    </Layout>
  );
};

export default TasksPage;
