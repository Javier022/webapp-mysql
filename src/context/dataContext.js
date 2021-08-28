import React, { createContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { api } from "../constants/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async (token) => {
    try {
      const request = await axios({
        method: "GET",
        url: `${api}/tasks`,
        headers: {
          "Type-Content": "aplication/json",
          "auth-token": token,
        },
      });
      const { success, tasks } = await request.data;

      if (success) {
        if (Array.isArray(tasks) && tasks.length !== 0) {
          return tasks;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteTaskById = async (id, token) => {
    try {
      const req = await axios({
        method: "DELETE",
        url: `${api}/tasks/${id}`,
        headers: {
          "auth-token": token,
        },
      });

      const res = await req.data;

      if (res.success) return res;
    } catch (error) {
      throw new Error(error);
    }
  };

  const createNewTask = async (body, token) => {
    console.log(token, "token!!");
    if (!body) {
      return console.log("send body");
    }

    try {
      const request = await axios({
        method: "POST",
        url: `${api}/tasks`,
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        data: body,
      });
      const response = await request.data;

      if (response.success) {
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateTask = async (id, body, token) => {
    if (!body) {
      return console.log("send body");
    }

    try {
      const request = await axios({
        method: "PUT",
        url: `${api}/tasks/${id}`,
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        data: body,
      });
      const response = await request.data;

      if (response.success) {
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const login = async (body) => {
    if (!body) {
      throw new Error("request body required");
    }

    try {
      const request = await axios({
        method: "POST",
        url: `${api}/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: body,
      });

      const response = await request;

      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = () => {
    return window.localStorage.removeItem("token");
  };

  const readToken = () => {
    const token = window.localStorage.getItem("token");

    return token ? token : null;
  };

  const store = {
    loading,
    setLoading,
    getData,
    tasks,
    setTasks,
    deleteTaskById,
    createNewTask,
    updateTask,
    login,
    readToken,
    useHistory,
    signOut,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
