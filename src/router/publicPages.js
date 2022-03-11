import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
const LandingPage = lazy(() => import("pages/landing/index"));
const LoginPage = lazy(() => import("pages/login"));
const SignUpPage = lazy(() => import("pages/signUp"));
const ConfirmEmailPage = lazy(() => import("pages/confirmEmail"));
const NotFound404 = lazy(() => import("pages/notFound404"));

const PublicPages = () => {
  return (
    <Suspense fallback={null}>
      <Router>
        <Switch>
          <Route exact path="/">
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
    </Suspense>
  );
};

export default PublicPages;
