import React from "react";
import { Route, Redirect } from "react-router-dom";

// util
import { UseAuth } from "../utilities/auth";

const PrivateRoutes = ({ children, ...rest }) => {
  const authUser = UseAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoutes;
