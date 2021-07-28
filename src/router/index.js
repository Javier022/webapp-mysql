import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import TasksPage from "../pages/tasks";
import AddTaskPage from "../pages/addTask";
import UpdateTask from "../pages/updateTask";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
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

export default Routes;
