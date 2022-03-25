import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// pages
import LandingPage from "pages/landing/index";
import LoginPage from "pages/login";
import SignUpPage from "pages/signUp";
import ConfirmEmailPage from "pages/confirmEmail";
import NotFound404 from "pages/notFound404";

const PublicPages = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/webapp-mysql">
          <LandingPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/signup">
          <SignUpPage />
        </Route>

        <Route path="/confirm/:id">
          <ConfirmEmailPage />
        </Route>

        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
};

export default PublicPages;
