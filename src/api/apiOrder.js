import axios from "./axios";

export const createOrder = (data) => {
  return axios.post("/api/order/create", data);
};

export const getOrderById = (id) => {
  return axios.post("/api/order/list", { user_id: id });
};

export const addItemToOrder = (data) => {
  return axios.post("/api/order/item/add", data);
};

export const getListOrderItem = (order_id) => {
  return axios.post("/api/order/item/list", { order_id });
};
