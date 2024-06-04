import { Notification } from "@/common/notification/Notification";
import { setCurrentUser } from "@/redux/Reducer/userSlice";
import { PATH } from "@/routes/path";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
    "Control-Allow-Origin": "*",
  },
});

instance.defaults.headers["Content-Type"] = "application/json";

export const handleRefreshToken = (dispatch, navigate) => {
  instance.interceptors.request.use(
    async function (config) {
      const token = Cookies.get("a_token");
      if (token) {
        config.headers.Authorization = `${token}`;
      } else {
        try {
          const refresh_Token = localStorage.getItem("rf_token");
          const currentUser = JSON.parse(localStorage.getItem("c_user"));
          const currentTime = new Date();
          // const response = await refreshToken({ email: email, refresh_token: refresh_Token });
          if (refresh_Token && currentUser && currentUser.user_id) {
            if (currentUser?.exp < currentTime.getTime() / 1000 || !token) {
              const response = await axios.post(
                `${import.meta.env.REACT_APP_URL_BACKEND}/api/refresh_token`,
                {
                  refresh_token: /"/g.test(refresh_Token)
                    ? refresh_Token.replace(/"/g, "")
                    : refresh_Token,
                  user_id: currentUser.user_id,
                }
              );
              const { results } = response.data;
              if (results && results.access_token) {
                let decodeToken = await jwtDecode(results.access_token);
                if (decodeToken && Object.keys(decodeToken).length > 0) {
                  let time = new Date(decodeToken.exp * 1000);

                  Cookies.set("a_token", results.access_token, {
                    expires: time,
                  });

                  localStorage.setItem("rf_token", results.refresh_token);
                  dispatch(setCurrentUser(decodeToken));

                  // window.location.reload();
                  // Retry the original request with the new token
                }

                // originalRequest.headers.Authorization = `${results.access_token}`;
                config.headers["Authorization"] = `${results.access_token}`;
              }
            }

            // window.location.reload();
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            Notification.error("Vui lòng đăng nhập lại");
            localStorage.removeItem("c_user");
            localStorage.removeItem("rf_token");
            dispatch(setCurrentUser({}));
            navigate(PATH.DANG_NHAP);
          }
          return Promise.reject(error);
        }
      }

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};

// Tạo một mảng lưu trữ các pathname không cần gọi refresh token
// const pathsWithoutRefresh = [
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/product/list",
//   "/product/detail",
//   "/voucher/list",
//   "/comment/item/list",
//   "/allcode/list",
//   "/news/list",
//   "/news/list/detail",
// ];

// instance.interceptors.request.use(
//   async function (config) {
//     const token = Cookies.get("a_token");
//     if (token) {
//       config.headers.Authorization = `${token}`;
//     } else {
//       const refresh_Token = localStorage.getItem("rf_token");
//       const currentUser = JSON.parse(localStorage.getItem("c_user"));
//       if (refresh_Token && currentUser && currentUser.user_id) {
//         try {
//           const response = await axios.post(
//             `${import.meta.env.REACT_APP_URL_BACKEND}/api/refresh_token`,
//             {
//               refresh_token: /"/g.test(refresh_Token)
//                 ? refresh_Token.replace(/"/g, "")
//                 : refresh_Token,
//               user_id: currentUser.user_id,
//             }
//           );
//           const { results } = response.data;
//           if (results && results.access_token) {
//             let decodeToken = await jwtDecode(results.access_token);
//             if (decodeToken && Object.keys(decodeToken).length > 0) {
//               let time = new Date(decodeToken.exp * 1000);

//               Cookies.set("a_token", results.access_token, { expires: time });

//               localStorage.setItem("rf_token", results.refresh_token);

//               config.headers.Authorization = `${results.access_token}`;
//             }
//           }
//         } catch (error) {
//           if (error.response && error.response.status === 400) {
//             // Xử lý lỗi 400
//           }
//           return Promise.reject(error);
//         }
//       }
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true;
      //   try {
      //     const refresh_Token = localStorage.getItem("rf_token");
      //     const currentUser = JSON.parse(localStorage.getItem("c_user"));
      //     // const response = await refreshToken({ email: email, refresh_token: refresh_Token });
      //     if (refresh_Token && currentUser && currentUser.user_id) {
      //       const response = await axios.post(
      //         `${import.meta.env.REACT_APP_URL_BACKEND}/api/refresh_token`,
      //         {
      //           refresh_token: /"/g.test(refresh_Token)
      //             ? refresh_Token.replace(/"/g, "")
      //             : refresh_Token,
      //           user_id: currentUser.user_id,
      //         }
      //       );
      //       const { results } = response.data;
      //       if (results && results.access_token) {
      //         let decodeToken = await jwtDecode(results.access_token);
      //         if (decodeToken && Object.keys(decodeToken).length > 0) {
      //           let time = new Date(decodeToken.exp * 1000);
      //           Cookies.set("a_token", results.access_token, { expires: time });
      //           localStorage.setItem("rf_token", results.refresh_token);
      //           window.location.reload();
      //           // Retry the original request with the new token
      //         }
      //         // originalRequest.headers.Authorization = `${results.access_token}`;
      //         instance.defaults.headers.common[
      //           "Authorization"
      //         ] = `${results.access_token}`;
      //       }
      //       // window.location.reload();
      //     }
      //     return instance(originalRequest);
      //   } catch (error) {
      //     if (error.response && error.response.status === 400) {
      //       // window.location.reload();
      //     }
      //     return Promise.reject(error);
      //   }
      // } else {
      //   Notification.error("Vui lòng đăng nhập lại");
      //   localStorage.removeItem("c_user");
      //   localStorage.removeItem("rf_token");
    }
    return Promise.reject(error);
  }
);

export default instance;
