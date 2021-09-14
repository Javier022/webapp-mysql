import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/dataContext";

// components
import Form from "../components/form";
import Input from "../components/Utils/input";
import Button from "../components/Utils/button";
import Layout from "../components/layout";
import Alert from "../components/Utils/alert";
import Spinner from "../components/Utils/spinner";

// auth
import { hasError } from "../utilities/validateInput";
import { validateEmail } from "../utilities/regExp";

// utils
import { notify } from "../utilities/toast";
import Circle from "../components/Utils/circle";

//
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

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

  const history = useHistory();
  const location = useLocation();

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

        const token = response.data.token;
        window.localStorage.setItem("token", token);

        setToken(token);

        let { from } = location.state || { from: { pathname: "/" } };

        console.log(from);

        return history.replace(from);
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
    if (fields) {
      setEmail(fields.email);
      setPassword(fields.password);
    }
  }, [fields]);

  return (
    <Layout center={true} showNavigation={false}>
      <Circle />
      <p className="text-center w-full text-2xl mb-4">Sign in to App</p>

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
      {loading && <Spinner />}
    </Layout>
  );
};

export default Login;
