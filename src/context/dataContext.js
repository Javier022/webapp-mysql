import React, { createContext } from "react";
import axios from "axios";
import { api } from "../constants/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const getData = async () => {
    try {
      const request = await axios.get(api);
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

  const store = {
    getData,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
