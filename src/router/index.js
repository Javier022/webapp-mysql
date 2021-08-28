import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// pages
import ProtectedPages from "./protectedPages";
import PublicPages from "./publicPages";

// Routes
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";

// test

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoutes path="/home">
          <ProtectedPages />
        </PrivateRoutes>

        <PublicRoutes path="/">
          <PublicPages />
        </PublicRoutes>
      </Switch>
    </Router>
  );
};

export default Routes;
