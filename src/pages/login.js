import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/dataContext";

// components
import Form from "../components/form";
import Input from "../components/Utils/input";
import Button from "../components/Utils/button";
import Layout from "../components/layout";
import Alert from "../components/Utils/alert";
import Circle from "../components/Utils/circle";
import Screen from "../components/Utils/screen";
import Spinner from "../components/Utils/spinner";
import Title from "../components/Utils/title";

// validate auth
import { hasError } from "../utilities/validateInput";
import { validateEmail } from "../utilities/regExp";

// utils
import { notify } from "../utilities/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  // provider
  const {
    login,
    alert,
    setAlert,
    loading,
    setLoading,
    fields,
    useHistory,
    setToken,
  } = useContext(DataContext);

  // router
  const history = useHistory();

  const action = {
    type: "login",
    name: "Login",
  };

  const sendData = async (e) => {
    e.preventDefault();

    const emailHasError = hasError(email, "correo requerido"),
      passwordHasError = hasError(
        password,
        "contraseña requerida",
        action.type,
        "contraseña invalida, la contraseña debe contener 6 caracteres"
      );

    let validation = {
      email: emailHasError.field,
      password: passwordHasError.field,
    };

    if (!validation.email) {
      const emailValid = validateEmail(email);
      if (!emailValid) {
        validation.email = "email invalido";
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

      const request = await login(body);

      if (request.status === 200) {
        setLoading(false);
        const response = request.data;

        if (response.success === false) return setAlert(true);

        const token = response.token;
        const refresh = response.refreshToken;

        window.localStorage.setItem("token", token);
        window.localStorage.setItem("refresh", refresh);

        setToken(token);

        return history.push("/home");
      }
    } catch (error) {
      setLoading(false);
      notify("error", error.message);
    }
  };

  alert &&
    setTimeout(() => {
      setAlert(false);
    }, 5000);

  useEffect(() => {
    console.log("useEffect login");
    if (fields) {
      setEmail(fields.email);
      setPassword(fields.password);
    }
  }, [fields]);

  return (
    <Layout center={true} showNavigation={false}>
      <Circle />
      <Title text="Sign in to App" />

      <div className="w-full max-w-xs">
        {alert && (
          <Alert
            message={"email o contraseña incorrecta"}
            fn={() => setAlert(false)}
          />
        )}
      </div>
      <Form mt={0} handleSubmit={(e) => sendData(e)}>
        <div className="mb-6">
          <Input
            label="email"
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
            label="password"
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
      </Form>
      {loading && <Screen children={<Spinner />} />}
    </Layout>
  );
};

export default Login;
