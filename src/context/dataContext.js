import React, { createContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { api } from "../constants/api";
import jwt_decode from "jwt-decode";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [fields, setFields] = useState(null);
  const [alert, setAlert] = useState(false);
  const [dataProfile, setDataProfile] = useState({});
  const [serverError, setServerError] = useState(false);

  // auth token
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("token")
  );

  // headers requests
  let config = {
    headers: {
      "Type-content": "aplication/json",
      "auth-token": token,
    },
  };

  const getData = async () => {
    try {
      const request = await axios.get(`${api}/tasks`, config);

      if (request.status === 200 && request.data.success) {
        const data = request.data.tasks;

        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteTaskById = async (id) => {
    try {
      const req = await axios.delete(`${api}/tasks/${id}`, config);
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
      const request = await axios.post(`${api}/tasks`, data, config);
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
      const request = await axios.put(`${api}/tasks/${id}`, data, config);
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
      const request = await axios.post(`${api}/login`, data);
      const response = await request;

      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = () => {
    window.localStorage.removeItem("token");
    setDataProfile({});
    return setToken(null);
  };

  const register = async (data) => {
    if (!data) {
      throw new Error("body is required");
    }

    try {
      const request = await axios.post(`${api}/register`, data);
      return request;
    } catch (error) {
      throw new Error(error);
    }
  };

  const fillFieldsLogin = (email, password, show = false) => {
    return show ? setFields({ email, password }) : setFields(null);
  };

  const decodedToken = (token) => {
    const decoded = jwt_decode(token);
    return decoded;
  };

  const getProfile = async () => {
    try {
      const request = await axios.get(`${api}/profile`, config);

      if (request.status === 200 && request.data.success) {
        const data = request.data.data;

        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const editProfile = async (data) => {
    try {
      const req = await axios.put(`${api}/profile/edit`, data, config);

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

    // tasks
    getData,
    tasks,
    setTasks,
    deleteTaskById,
    createNewTask,
    updateTask,

    // user
    getProfile,
    dataProfile,
    setDataProfile,
    editProfile,

    // errors
    alert,
    setAlert,
    serverError,
    setServerError,

    // router
    useHistory,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
