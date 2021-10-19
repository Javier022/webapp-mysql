import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import TasksPage from "../pages/tasks";
import AddTaskPage from "../pages/addTask";
import UpdateTask from "../pages/updateTask";
import Profile from "../pages/profile/index";

const ProtectedPages = () => {
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
      </Switch>
    </Router>
  );
};

export default ProtectedPages;
