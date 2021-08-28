import React from "react";
import { Route, Redirect } from "react-router-dom";

//auth
import { UseAuth } from "../utilities/auth";

const PublicRoutes = ({ children, ...rest }) => {
  const authUser = UseAuth();

  return (
    <Route
      {...rest}
      render={() => (authUser ? <Redirect to="/home" /> : children)}
    />
  );
};

export default PublicRoutes;
