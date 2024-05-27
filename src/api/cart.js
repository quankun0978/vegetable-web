import axios from "./axios";

export const getListCartItem = (user_id) => {
  return axios.post("/api/cart/item/list", { user_id: user_id });
};

export const addItemToCart = (data) => {
  return axios.post("/api/cart/item/add", data);
};

export const deleteItemToCart = (product_id) => {
  return axios.post("/api/cart/item/delete", { product_id });
};
