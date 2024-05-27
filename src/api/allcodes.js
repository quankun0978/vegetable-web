import axios from "./axios";

export const getListAllcodes = () => {
  return axios.get("/api/allcode/list");
};
