import { createSlice } from "@reduxjs/toolkit";

import { handleGetListNews } from "../Action/newsAction";
const initialState = {
  listNews: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleGetListNews.pending, (state, action) => {});
    builder.addCase(handleGetListNews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listNews = action.payload;
    });
    builder.addCase(handleGetListNews.rejected, (state, action) => {});
  },
});

export default newsSlice.reducer;
