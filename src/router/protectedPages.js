import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import TasksPage from "../pages/tasks";
import AddTaskPage from "../pages/addTask";
import UpdateTask from "../pages/updateTask";

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
      </Switch>
    </Router>
  );
};

export default ProtectedPages;