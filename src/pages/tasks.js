import React, { useState, useEffect, useContext, useCallback } from "react";
import { DataContext } from "../context/dataContext";
import { deleteTask } from "../api/apiUtils";

// components
import Task from "../components/task";
import Layout from "../components/layout";
import Button from "../components/Utils/button";
import Screen from "../components/Utils/screen";
import Spinner from "../components/Utils/spinner";
import TitlePage from "../components/Utils/titlePage";

// utils
import { notify } from "../utilities/toast";

// router
import { Link } from "react-router-dom";

const TasksPage = () => {
  const { getData, tasks, setTasks, deleteTaskById, loading, setLoading } =
    useContext(DataContext);

  const [error, setError] = useState(false);

  const executeDeleteTask = (e) => {
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

  const getTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getData();

      if (data && data.length !== 0) {
        parseData(data);
        setLoading(false);
      } else {
        setLoading(false);
        setTasks({});
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      notify("error", error.message);
    }
  }, [getData, parseData, setLoading, setTasks]);

  useEffect(() => {
    getTasks();
  }, []);

  const handleError = (error) => {
    if (error) return <p>Error not foud</p>;
    return hasTasks();
  };

  const hasTasks = () => {
    const data = Object.values(tasks);
    if (!(data && data.length !== 0)) return <p>add your first task</p>;

    const paintTasks = data.map((task) => {
      return <Task key={task.id} {...task} fn={executeDeleteTask}></Task>;
    });

    return paintTasks;
  };

  return (
    <Layout>
      <div className="m-8 w-full flex items-center justify-around">
        <TitlePage text="Your tasks" />

        <Link className="hidden" to="/create">
          <Button name="add task" />
        </Link>
      </div>

      {loading ? <Screen children={<Spinner />} /> : handleError(error)}
    </Layout>
  );
};

export default TasksPage;
