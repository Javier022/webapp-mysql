import { useContext } from "react";
import { DataContext } from "context/dataContext";

export const useAuth = () => {
  return useContext(DataContext);
};
