import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { DataContext } from "../context/dataContext";

// utils
import { objectHasValues } from "../utilities/objectHasValues";

const PrivateRoutes = ({ children, ...rest }) => {
  const { token, setLoad, getProfile, setDataProfile, setServerError } =
    useContext(DataContext);

  const getDataProfile = async (request = 1) => {
    try {
      setLoad(true);

      const profile = await getProfile();

      if (objectHasValues(profile)) {
        setDataProfile(profile);
        setLoad(false);
      }
    } catch (error) {
      //
      if (request > 3) {
        setLoad(false);
        return setServerError(true);
      }

      return getDataProfile(request + 1);
    }
  };

  useEffect(() => {
    console.log("use Effect");

    if (token) {
      getDataProfile();
    }
  }, [token]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoutes;
