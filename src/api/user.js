import md5 from "md5";
import axios from "./axios";

export const loginUser = (data) => {
  return axios.post("/api/login", {
    ...data,
    password: md5(data.password),
  });
};

export const registerUser = (data) => {
  return axios.post("/api/register", { ...data, password: md5(data.password) });
};

export const refreshTokenUser = (data) => {
  return axios.post("/api/refresh_token", data);
};

export const getUserById = (user_id) => {
  return axios.post(`/api/user/detail`, { user_id: user_id });
};

export const updateUserById = (data) => {
  return axios.post(`/api/user/update`, data);
};

export const changePasswordUser = (data) => {
  return axios.post(`/api/user/change_password`, {
    ...data,
    password: md5(data.password),
    password_new: md5(data.password_new),
  });
};

export const sendMail = (data) => {
  return axios.post(`/api/user/send_mail`, data);
};

export const resetPassword = (data) => {
  return axios.post(`/api/user/reset_password`, {
    ...data,
    password_new: md5(data.password_new),
  });
};
