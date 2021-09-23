import React, { createContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { api } from "../constants/api";
import jwt_decode from "jwt-decode";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [alert, setAlert] = useState(false);
  const [dataProfile, setDataProfile] = useState({});

  // auth token
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("token")
  );

  // request headers
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
    const { id: userId } = decodedToken(token);

    try {
      const request = await axios.get(`${api}/profile/${userId}`);

      if (request.status === 200 && request.data.success) {
        const data = request.data.data;

        return setDataProfile(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const store = {
    loading,
    setLoading,
    // tasks
    getData,
    tasks,
    setTasks,
    deleteTaskById,
    createNewTask,
    updateTask,
    // alert
    alert,
    setAlert,

    //auth
    // readToken,
    token,
    setToken,
    register,
    login,
    signOut,

    // user
    getProfile,
    dataProfile,

    useHistory,
    fillFieldsLogin,
    fields,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
