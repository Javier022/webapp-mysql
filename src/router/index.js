import React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";

// Routes
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";

// pages
import ProtectedPages from "./protectedPages";
import PublicPages from "./publicPages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoutes path="/home">
          <ProtectedPages />
        </PrivateRoutes>

        <PublicRoutes path="/webapp-mysql">
          <PublicPages />
        </PublicRoutes>
      </Switch>
    </Router>
  );
};

export default Routes;
