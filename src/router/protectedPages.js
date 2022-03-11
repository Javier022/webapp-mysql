import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// util
import { useAuth } from "utilities/useAuth";

// pages
const TasksPage = lazy(() => import("pages/tasks/index"));
const AddTaskPage = lazy(() => import("pages/addTask"));
const UpdateTask = lazy(() => import("pages/updateTask"));
const Profile = lazy(() => import("pages/profile/index"));
const DashboardAdmin = lazy(() => import("pages/dashboardAdmin/index"));

const ProtectedPages = () => {
  const auth = useAuth();

  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
};

export default ProtectedPages;
