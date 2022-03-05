import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// pages
import TasksPage from "../pages/tasks";
import AddTaskPage from "../pages/addTask";
import UpdateTask from "../pages/updateTask";
import Profile from "../pages/profile/index";
import DashboardAdmin from "../pages/dashboardAdmin";

// util
import { useAuth } from "../utilities/useAuth";

const ProtectedPages = () => {
  const auth = useAuth();

  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <TasksPage />
        </Route>

        <Route path="/create">
          <AddTaskPage />
        </Route>

        <Route path="/task/:id">
          <UpdateTask />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route
          path="/dashboard"
          render={() =>
            auth.rol === 1 ? <DashboardAdmin /> : <Redirect to="/home" />
          }
        />
      </Switch>
    </Router>
  );
};

export default ProtectedPages;
