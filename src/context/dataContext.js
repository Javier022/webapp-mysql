import React, { createContext, useState } from "react";
import axios from "axios";
import { api } from "../constants/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});

  const getData = async () => {
    try {
      const request = await axios.get(`${api}/tasks`);
      const { succes, tasks } = await request.data;

      if (succes) {
        if (Array.isArray(tasks) && tasks.length !== 0) {
          return tasks;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteTaskById = async (id) => {
    try {
      const req = await axios({
        method: "DELETE",
        url: `${api}/tasks/${id}`,
      });

      const res = await req.data;

      if (res.succes) return res;
    } catch (error) {
      throw new Error(error);
    }
  };

  const createNewTask = async (body) => {
    if (!body) {
      return console.log("send body");
    }

    try {
      const request = await axios({
        method: "POST",
        url: `${api}/tasks`,
        headers: {
          "Content-Type": "application/json",
        },
        data: body,
      });
      const response = await request.data;

      if (response.succes) {
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateTask = async (id, body) => {
    if (!body) {
      return console.log("send body");
    }

    try {
      const request = await axios({
        method: "PUT",
        url: `${api}/tasks/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: body,
      });
      const response = await request.data;

      if (response.succes) {
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const store = {
    getData,
    tasks,
    setTasks,
    deleteTaskById,
    createNewTask,
    updateTask,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
