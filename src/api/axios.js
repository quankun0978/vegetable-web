import axios from "axios";
import { refreshTokenUser } from "./apiUser";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
    "Control-Allow-Origin": "*",
  },
});

instance.defaults.headers["Content-Type"] = "application/json";

instance.interceptors.request.use(
  function (config) {
    const token = Cookies.get("a_token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      try {
        const refresh_Token = localStorage.getItem("rf_token");
        const currentUser = JSON.parse(localStorage.getItem("c_user"));
        // const response = await refreshToken({ email: email, refresh_token: refresh_Token });
        if (refresh_Token && currentUser && currentUser.user_id) {
          const response = await refreshTokenUser({
            user_id: currentUser.user_id,
            refresh_Token: refresh_Token,
          }); 
          const { result } = response.data;
          let decodeToken = jwtDecode(result.access_token);
          let time = new Date(decodeToken.exp * 1000);

          Cookies.set("a_token", result.access_token, { expires: time });
          localStorage.setItem("rf_token", result.refresh_token);
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `${result.access_token}`;
          // window.location.reload();
        }
        return instance(originalRequest);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // window.location.reload();
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
