import React from "react";
import { Route, Redirect } from "react-router-dom";

// util
import { useAuth } from "../utilities/useAuth";

const PrivateRoutes = ({ children, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoutes;
