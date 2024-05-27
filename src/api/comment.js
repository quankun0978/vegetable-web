import axios from "./axios";

export const getCommentByProductId = (product_id) => {
  return axios.post("/api/comment/item/list", { product_id: product_id });
};
export const postComment = (data) => {
  return axios.post("/api/comment/item/add", data);
};

// export const addItemToCart = (data) => {
//   return axios.post("/api/cart/item/add", data);
// };
