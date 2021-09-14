import React from "react";
import { Route, Redirect } from "react-router-dom";

//auth
import { useAuth } from "../utilities/useAuth";

const PublicRoutes = ({ children, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          <Redirect to={{ pathname: "/home", state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
};

export default PublicRoutes;
