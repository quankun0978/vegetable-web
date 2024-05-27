import axios from "./axios";

export const getListNews = () => {
  return axios.get("/api/news/list");
};

export const getListNewsById = (news_id) => {
  return axios.post("/api/news/list/detail", { news_id });
};
