import React, { useState, useContext } from "react";
import { DataContext } from "../context/dataContext";

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
import { validateEmail } from "../utilities/regExp";
import { notify } from "../utilities/toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setErrors] = useState({});
  const [alert, setAlert] = useState(false);

  const { register, loading, setLoading, useHistory, fillFieldsLogin } =
    useContext(DataContext);

  const history = useHistory();

  const action = {
    type: "register",
    name: "Sign up",
  };

  const sendData = async (e) => {
    e.preventDefault();

    const errorInEmail = hasError(email, "email requerido");
    const errorInPassword = hasError(
      password,
      "contraseña requerida",
      action.type,
      "la contraseña debe contener almenos 6 caracteres"
    );
    const errorInUsername = hasError(
      username,
      "username requerido",
      action.type,
      "username debe contener almenos 3 caracteres",
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

    const textWithoutSpaces = (text) => {
      const res = /\s/;

      return res.test(text);
    };

    if (!errors.username) {
      const textHasSpaces = textWithoutSpaces(username);

      if (textHasSpaces) {
        errors.username =
          "Los nombres de usuario solo pueden contener letras, números, guiones bajos y puntos.";
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
      const request = await register(body);

      if (request.status === 200) {
        setLoading(false);

        const data = request.data;

        if (data.message === "Email already registered") {
          setAlert(true);
          errors.email = "ingresa otro correo";
          return setErrors(errors);
        } else if (data.message === "username not available") {
          errors.username = "nombre de usuario no disponible";
          return setErrors(errors);
        }

        setErrors({});

        notify("success", "usuario registrado");

        fillFieldsLogin(email, password, true);

        return history.push("/login");
      }
    } catch (error) {
      setLoading(false);
      notify("error", error.message);
    }
  };

  alert &&
    setTimeout(() => {
      setAlert(false);
    }, 4000);

  return (
    <Layout center={true} showNavigation={false}>
      <Circle />
      <p className="text-center w-full text-2xl mb-4">Sign up to App</p>

      <div className="w-full max-w-xs ">
        {alert && (
          <Alert
            message="el correo ya ha sido registrado"
            fn={() => setAlert(false)}
          />
        )}
      </div>

      <Form mt={0} handleSubmit={(e) => sendData(e)}>
        <div className="mb-6">
          <Input
            label="email"
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
            label="password"
            placeHolder="password"
            type="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            error={error?.password}
          />
        </div>
        <div className="mb-6">
          <Input
            label="username"
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
      {loading && <Screen children={<Spinner />} />}
    </Layout>
  );
};

export default SignUp;
