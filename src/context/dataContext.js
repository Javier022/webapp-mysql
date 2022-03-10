import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [dataProfile, setDataProfile] = useState(null);
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

  const signOut = () => {
    window.localStorage.clear();
    setDataProfile({});
    return setToken(null);
  };

  const store = {
    //auth
    token,
    setToken,
    signOut,

    // tasks
    tasks,
    setTasks,

    // user
    dataProfile,
    setDataProfile,

    // rol
    getRol,
    setRol,
    rol,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};
