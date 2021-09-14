import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import PublicPage from "../pages";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signUp";

const PublicPages = () => {
  console.log("ejecuto public pages");
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
      </Switch>
    </Router>
  );
};

export default PublicPages;
