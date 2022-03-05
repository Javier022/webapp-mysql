import React, { useEffect, useContext, useState } from "react";
import { DataContext } from "../context/dataContext";

import { Route, Redirect } from "react-router-dom";
import api from "../services/api";
// components
import FullScreen from "../components/Utils/fullScreen";
import Spinner from "../components/Utils/spinner";
import Title from "../components/Utils/title";

// utils
import { objectHasValues } from "../utilities/objectHasValues";

const PrivateRoutes = ({ children, ...rest }) => {
  const { token, getRol, setDataProfile } = useContext(DataContext);

  const [serverError, setServerError] = useState(false);
  const [render, setRender] = useState(false);

  const getDataProfile = async (request = 1) => {
    try {
      const request = await api.get("/profile");

      if (request.status === 200 && request.data.success === true) {
        const profile = request.data.data;

        if (objectHasValues(profile)) {
          setDataProfile(profile);
          return setRender(true);
        }
      }
    } catch (error) {
      if (request > 3) {
        return setServerError(true);
      }
      return getDataProfile(request + 1);
    }
  };

  const renderScreen = () => {
    if (serverError) {
      return (
        <FullScreen>
          <Title text="500 Internal Server Error" />
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-blue-700"
          >
            reload page
          </button>
        </FullScreen>
      );
    }

    return render ? (
      // children = routes protected
      children
    ) : (
      <FullScreen>
        <Spinner />
        <h2 className="text-blue-900 text-center text-xl font-semibold">
          Todo App
        </h2>
      </FullScreen>
    );
  };

  useEffect(() => {
    console.log("useEffect routesPro");
    if (token) {
      getDataProfile();
      getRol(token);
    }
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          renderScreen()
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoutes;
