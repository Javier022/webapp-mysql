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
  const { token, getProfile, setDataProfile } = useContext(DataContext);

  const [serverError, setServerError] = useState(false);
  const [render, setRender] = useState(false);

  // return JSON.parse(atob(token.split(".")[1]));

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
      return (
        <FullScreen>
          <Title text="500 Internal Server Error" />
          <p onClick={() => getDataProfile()} className="mt-2 text-blue-700">
            reload page
          </p>
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
