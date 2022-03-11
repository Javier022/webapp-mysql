import axios from "axios";
import { api } from "constants/api";

const instance = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
  },
});

// requests
instance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["auth-token"] = token; // for Node.js Express back-end
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response
instance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== "/login" && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = window.localStorage.getItem("refresh");
          const request = await instance({
            method: "POST",
            url: "/refresh-token",
            headers: {
              refresh: refreshToken,
            },
          });

          if (request.status === 200) {
            const newAccessToken = request.data.token;
            window.localStorage.setItem("token", newAccessToken);
            return instance(originalConfig);
          }
        } catch (_error) {
          window.localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(_error);
        }
      } // aqui manejar otros status !== 401
    }

    return Promise.reject(error);
  }
);

export default instance;
