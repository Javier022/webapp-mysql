import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import PublicPage from "../pages";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signUp";
import NotFound404 from "../pages/notFound404";

const PublicPages = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PublicPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/signup">
          <SignUpPage />
        </Route>

        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
};

export default PublicPages;
