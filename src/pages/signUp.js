import React, { useState } from "react";

import api from "../services/api";
// components
import Form from "../components/form";
import Input from "../components/Utils/input";
import Button from "../components/Utils/button";
import Layout from "../components/layout";
import Alert from "../components/Utils/alert";
import Circle from "../components/Utils/circle";
import Screen from "../components/Utils/screen";
import Spinner from "../components/Utils/spinner/index";

// utils
import { hasError } from "../utilities/validateInput";
import { validateEmail, textHasBlanks } from "../utilities/regExp";
import { notify } from "../utilities/toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setErrors] = useState({});
  const [alert, setAlert] = useState(false);
  const [emailSubmited, setEmailSubmited] = useState(false);
  const [count, setCount] = useState(1);
  const [randomString, setRandomString] = useState(null);
  const [loading, setLoading] = useState(false);

  const action = {
    type: "register",
    name: "Sign up",
  };

  const sendData = async (e) => {
    e.preventDefault();

    const errorInEmail = hasError(email, "email required");
    const errorInPassword = hasError(
      password,
      "password required",
      action.type,
      "invalid password, password must contain 6 characters"
    );
    const errorInUsername = hasError(
      username,
      "username required",
      action.type,
      "username must contain at least 3 characters",
      3
    );

    const errors = {
      email: errorInEmail.field,
      password: errorInPassword.field,
      username: errorInUsername.field,
    };

    if (!errors.email) {
      const emailIsValid = validateEmail(email);

      if (!emailIsValid) {
        errors.email = "invalid email";
      }
    }

    if (!errors.username) {
      const textHasSpaces = textHasBlanks(username);

      if (textHasSpaces) {
        errors.username =
          "Usernames can only contain letters, numbers, underscores, and periods.";
      }
    }

    if (errors.email || errors.password || errors.username) {
      return setErrors(errors);
    }

    let body = {
      email,
      password,
      username,
    };

    try {
      setErrors({});
      setLoading(true);
      const request = await api.post("/register", body);

      if (request.status === 200) {
        setLoading(false);
        const data = request.data;

        if (data.message === "Email already registered") {
          setAlert(true);
          errors.email = data.message;
          return setErrors(errors);
        } else if (data.message === "username not available") {
          errors.username = data.message;
          return setErrors(errors);
        }

        setErrors({});
        console.log(data.data.randomValue);
        setRandomString(data.data.randomValue);
        return setEmailSubmited(true);
      }
    } catch (error) {
      setLoading(false);
      notify("error", error.message);
    }
  };

  const resendEmail = async () => {
    setCount(count + 1);
    if (count > 3) {
      return notify("warning", "please, check your email");
    }

    try {
      const req = await api.post("/resend-email", {
        email,
        username,
        randomValue: randomString,
      });

      if (req.status === 200) {
        return notify("success", "email sent");
      }
    } catch (e) {
      notify(e.message);
    }
  };

  alert &&
    setTimeout(() => {
      setAlert(false);
    }, 4000);

  return (
    <Layout center={true} showNavigation={false}>
      {emailSubmited ? (
        <div className="w-full max-w-xs mt-3">
          <div className="text-center bg-white border shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <i
              className="far fa-envelope-open"
              style={{
                fontSize: 50,
                paddingTop: 15,
                paddingBottom: 20,
                color: "#1e3a8a",
              }}
            ></i>
            <p className="text-center w-full text-2xl mb-4 text-blue-900">
              Check your email
            </p>
            <p className="pb-3">
              We have sent an email to <b className="text-gray-800">{email} </b>
              to complete the registration. Didn't get your email?
              <button
                className="text-blue-900 pl-1"
                onClick={() => resendEmail()}
              >
                resend the code
              </button>
            </p>
          </div>
        </div>
      ) : (
        <>
          <Circle />
          <p className="text-center w-full text-2xl mb-4">Sign up to App</p>

          <div className="w-full max-w-xs ">
            {alert && (
              <Alert
                message="the email has already been registered"
                fn={() => setAlert(false)}
              />
            )}
          </div>

          <Form mt={0} handleSubmit={(e) => sendData(e)}>
            <div className="mb-6">
              <Input
                label="Email"
                placeHolder="example@gmail.com"
                type="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                focus={true}
                error={error?.email}
              />
            </div>
            <div className="mb-6">
              <Input
                label="Password"
                placeHolder="password"
                type="password"
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
                error={error?.password}
              />
            </div>
            <div className="mb-6">
              <Input
                label="Username"
                placeHolder="username"
                value={username}
                handleChange={(e) => setUsername(e.target.value)}
                error={error?.username}
              />
            </div>
            <div className="flex justify-center">
              <Button name="Sign up" />
            </div>
          </Form>
        </>
      )}

      {loading && <Screen children={<Spinner />} />}
    </Layout>
  );
};

export default SignUp;
