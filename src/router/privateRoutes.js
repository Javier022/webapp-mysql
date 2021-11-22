import React, { useEffect, useContext, useState } from "react";
import { DataContext } from "../context/dataContext";

import { Route, Redirect } from "react-router-dom";

// components
import FullScreen from "../components/Utils/fullScreen";
import Spinner from "../components/Utils/spinner";
import Title from "../components/Utils/title";

// utils
import { objectHasValues } from "../utilities/objectHasValues";

const PrivateRoutes = ({ children, ...rest }) => {
  const { token, getProfile, setDataProfile, getRol } = useContext(DataContext);

  const [serverError, setServerError] = useState(false);
  const [render, setRender] = useState(false);

  const getDataProfile = async (request = 1) => {
    try {
      const profile = await getProfile();
      if (objectHasValues(profile)) {
        setDataProfile(profile);
        return setRender(true);
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
      let wait = false;

      serverError &&
        setTimeout(() => {
          return (wait = true);
        }, 3000);

      console.log(wait);

      return (
        <FullScreen>
          <Title text="500 Internal Server Error" />
          {wait ? (
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-blue-700"
            >
              reload page
            </button>
          ) : (
            <p>loading....</p>
          )}
        </FullScreen>
      );
    }

    return render ? (
      children
    ) : (
      // loading...
      <FullScreen>
        <Spinner />
        <h2 className="text-blue-900 text-center text-xl font-semibold">
          Todo App
        </h2>
      </FullScreen>
    );
  };

  useEffect(() => {
    console.log("useEffect routes Prote");
    if (token) {
      getDataProfile();
      getRol(token);
    }
  }, [token]);

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
