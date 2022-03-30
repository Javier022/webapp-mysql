import React, { useState, useContext } from "react";
import { DataContext } from "context/dataContext";

import GoogleLogin from "react-google-login";
import googleImage from "assets/google.svg";

import { useHistory } from "react-router-dom";
import api from "services/api";
// components
import Form from "components/form";
import Input from "components/Utils/input";
import Button from "components/Utils/button";
import Layout from "components/layout";
import Alert from "components/Utils/alert";
import Circle from "components/Utils/circle";
import Screen from "components/Utils/screen";
import Spinner from "components/Utils/spinner";
import Title from "components/Utils/title";

// validate auth
import { hasError } from "utilities/validateInput";
import { validateEmail } from "utilities/regExp";

// utils
import { notify } from "utilities/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // provider
  const { setToken, getRol } = useContext(DataContext);

  // router
  const history = useHistory();

  const action = {
    type: "login",
    name: "Login",
  };

  const sendData = async (e) => {
    e.preventDefault();

    const emailHasError = hasError(email, "email required"),
      passwordHasError = hasError(
        password,
        "password required",
        action.type,
        "invalida password, password must contain 6 characters"
      );

    let validation = {
      email: emailHasError.field,
      password: passwordHasError.field,
    };

    if (!validation.email) {
      const emailValid = validateEmail(email);
      if (!emailValid) {
        validation.email = "invalid email";
      }
    }

    if (validation.email || validation.password) {
      return setError(validation);
    }

    try {
      setError({});
      setLoading(true);

      const body = {
        email,
        password,
      };

      const request = await api.post("/login", body);
      if (request.status === 200) {
        setLoading(false);
        const response = request.data;

        if (response.success === false) return setAlert(true);

        const token = response.token;
        const refresh = response.refreshToken;

        window.localStorage.setItem("token", token);
        window.localStorage.setItem("refresh", refresh);
        setToken(token);

        const userRol = getRol(token);
        if (userRol === 1) {
          return history.push("/dashboard");
        }

        return history.push("/home");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        return notify("error", error.response.data.message);
      }
      notify("error", error.message);
    }
  };

  const handleLoginWithGoogle = async (google) => {
    try {
      setLoading(true);
      const request = await api.post("/auth/google", {
        token: google.tokenId,
      });

      if (request.status === 200) {
        setLoading(false);
        const response = request.data;

        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("refresh", response.refreshToken);

        setToken(response.token);

        return history.push("/home");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        return notify("error", error.response.data.message);
      }
      notify("error", error.message);
    }
  };

  const onFailure = (response) => {
    let text = response.error.split("_").join(" ");
    if (text === "access denied")
      notify(
        "warning",
        "The user denied the permission to the scopes required"
      );
  };

  alert &&
    setTimeout(() => {
      setAlert(false);
    }, 5000);

  return (
    <Layout center={true} showNavigation={false}>
      <Circle />
      <Title text="Sign in to App" />

      <div className="w-full max-w-xs">
        {alert && (
          <Alert
            message={"Incorrect username or password."}
            fn={() => setAlert(false)}
          />
        )}
      </div>
      <Form mt={0} handleSubmit={(e) => sendData(e)}>
        <div className="mb-6">
          <Input
            label="Email"
            placeHolder="example@gmail.com"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            focus={true}
            type="email"
            error={error?.email}
          />
        </div>
        <div className="mb-6">
          <Input
            label="Password"
            placeHolder="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            type="password"
            error={error?.password}
          />
        </div>
        <div className="flex justify-center ">
          <Button name={action.name} />
        </div>
        <div className="w-full flex items-center justify-between pt-5">
          <hr className="w-full bg-gray-400" />
          <p className="  leading-4 px-2.5 text-gray-400">Or</p>
          <hr className="w-full bg-gray-400" />
        </div>
        <div className="flex justify-center mt-5">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="py-2.5 px-4 border shadow rounded-lg flex items-center w-full"
              >
                <img alt="google" src={googleImage}></img>
                <p className="text-sm sm:text-base font-bold ml-4 text-gray-600">
                  Continue with Google
                </p>
              </button>
            )}
            onSuccess={handleLoginWithGoogle}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </Form>
      {loading && <Screen children={<Spinner />} />}
    </Layout>
  );
};

export default Login;
