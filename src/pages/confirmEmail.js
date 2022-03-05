import React, { useEffect, useContext } from "react";
import { DataContext } from "../context/dataContext";

import { useParams, useHistory } from "react-router-dom";
import api from "../services/api";
// components
import FullScreen from "../components/Utils/fullScreen";
import Spinner from "../components/Utils/spinner";

// utils
import { notify } from "../utilities/toast";

const ConfirmEmail = () => {
  const { setToken } = useContext(DataContext);

  const { id } = useParams();
  const history = useHistory();

  const emailToValidate = async () => {
    try {
      const request = await api.get(`/verify-email/${id}`);

      if (request.status === 200) {
        const data = request.data;

        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("refresh", data.refreshToken);

        setToken(data.token);

        if (data.success === true && data.message) {
          notify("success", data.message);
          return history.push("/login");
        }

        return history.push("/home");
      }
    } catch (error) {
      notify("error", error.message);
      return history.push("/login");
    }
  };

  useEffect(() => {
    emailToValidate();
  }, []);

  return (
    <FullScreen>
      <Spinner />
      <h2 className="text-blue-900 text-center text-xl font-semibold">
        Todo App
      </h2>
    </FullScreen>
  );
};

export default ConfirmEmail;
