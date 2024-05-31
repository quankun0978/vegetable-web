import axios from "./axios";

export const getListMyVoucher = (user_id) => {
  return axios.post("/api/voucher/item/list", { user_id: user_id });
};

export const getListVoucher = () => {
  return axios.get("/api/voucher/list");
};
export const addMyVoucher = (data) => {
  return axios.post("/api/voucher/item/add", data);
};
export const deleteMyVoucher = (code_id) => {
  return axios.post("/api/voucher/item/delete", { code_id });
};
