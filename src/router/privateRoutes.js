import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

// util
import { useAuth } from "../utilities/useAuth";

const PrivateRoutes = ({ children, ...rest }) => {
  const auth = useAuth();

  const getDataProfile = async () => {
    try {
      await auth.getProfile();

      // aqui si esto falla entonces no cargar la home si no renderizar un componente
      // de error del servidor y hacer una peticion recursiva que se vuelva a ejecutar despues de
      // 5 segundos

      // y tambien antes de mostrar la barra de navegacion mostrar el spinner
      // porque si no se muestra la navigation y la data todavia no se muestra
    } catch (error) {
      console.log("ocurred an error to get data", error);
    }
  };

  useEffect(() => {
    if (auth.token) {
      console.log("profile");
      getDataProfile();
    }

    console.log("se ejecuto");
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoutes;
