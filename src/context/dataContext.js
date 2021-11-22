import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [fields, setFields] = useState(null);
  const [alert, setAlert] = useState(false);
  const [dataProfile, setDataProfile] = useState({});
  const [rol, setRol] = useState("");

  // auth token
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("token")
  );

  const getRol = (token) => {
    // decode Token
    const user = JSON.parse(atob(token.split(".")[1]));
    // setRol
    setRol(user.rol_id);
    return user.rol_id;
  };

  const getData = async () => {
    try {
      const request = await api.get("/tasks");
      if (request.status === 200 && request.data.success === true) {
        const tasks = request.data.tasks;
        return tasks;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteTaskById = async (id) => {
    try {
      const req = await api.delete(`/tasks/${id}`);
      const res = await req.data;

      if (res.success) return res;
    } catch (error) {
      throw new Error(error);
    }
  };

  const createNewTask = async (data) => {
    if (!data) {
      throw new Error("body is required");
    }

    try {
      const request = await api.post("/tasks", data);
      const response = await request.data;

      if (response.success) {
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateTask = async (id, data) => {
    if (!data) {
      throw new Error("body is required");
    }

    try {
      const request = await api.put(`/tasks/${id}`, data);
      const response = await request.data;

      if (response.success) {
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const login = async (data) => {
    if (!data) {
      throw new Error("request body required");
    }

    try {
      const request = await api.post("/login", data);
      const response = await request;
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = () => {
    window.localStorage.clear();
    setDataProfile({});
    return setToken(null);
  };

  const register = async (data) => {
    if (!data) {
      throw new Error("body is required");
    }

    try {
      const request = await api.post("/register", data);
      return request;
    } catch (error) {
      throw new Error(error);
    }
  };

  const fillFieldsLogin = (email, password, show = false) => {
    return show ? setFields({ email, password }) : setFields(null);
  };

  const getProfile = async () => {
    try {
      const request = await api.get("/profile");
      if (request.status === 200 && request.data.success === true) {
        const profile = request.data.data;
        return profile;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const editProfile = async (data) => {
    try {
      const req = await api.put("/profile/edit", data);
      if (req.status === 200 && req.data.success) {
        return req.data;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const store = {
    // loadings
    loading,
    setLoading,
    load,
    setLoad,

    //auth
    token,
    setToken,
    register,
    login,
    fillFieldsLogin,
    fields,
    signOut,
    getRol,

    // tasks
    getData,
    tasks,
    setTasks,
    deleteTaskById,
    createNewTask,
    updateTask,

    // user
    dataProfile,
    setDataProfile,
    editProfile,
    getProfile,

    // errors
    alert,
    setAlert,

    // router
    useHistory,

    // rol
    rol,
    setRol,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
