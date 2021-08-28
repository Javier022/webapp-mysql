import { useContext } from "react";
import { DataContext } from "../context/dataContext";

export const UseAuth = () => {
  const { readToken } = useContext(DataContext);

  return readToken();
};
