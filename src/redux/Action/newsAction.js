import { createAsyncThunk } from "@reduxjs/toolkit";

import { getListNews } from "@/api/news";

export const handleGetListNews = createAsyncThunk("list_news", async () => {
  const data = await getListNews();

  if (data && data.results && data.results.length > 0) {
    return data.results;
  }
  return [];
});
