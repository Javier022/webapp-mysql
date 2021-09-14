import { useContext } from "react";
import { DataContext } from "../context/dataContext";

export const useAuth = () => {
  console.log("use Auth");
  return useContext(DataContext);
};
