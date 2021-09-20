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

  const [token, setToken] = useState(() =>
    window.localStorage.getItem("token")
  );

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

      if (request.status === 200 && request.data.success) {
        const data = request.data.tasks;

        return data;
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
    if (!body) {
      throw new Error("send body");
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
    window.localStorage.removeItem("token");
    setDataProfile({});
    return setToken(null);
  };

  const register = async (body) => {
    if (!body) {
      throw new Error("body is required");
    }

    let config = {
      headers: {
        "Type-content": "aplication/json",
      },
    };

    try {
      const request = await axios.post(`${api}/register`, body, config);

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
    let config = {
      headers: {
        "Type-content": "application/json",
      },
    };

    const { id: userId } = decodedToken(token);

    try {
      const request = await axios.get(`${api}/profile/${userId}`, config);

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
