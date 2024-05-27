import axios from "./axios";

export const getAllProduct = () => {
  return axios.get("/api/product/list");
};

export const getProductById = (id) => {
  return axios.post("/api/product/detail", { id });
};
