import { createAsyncThunk } from "@reduxjs/toolkit";

import { getListAllcodes } from "@/api/allcodes";

export const handleGetListAllCodes = createAsyncThunk(
  "list_allcodes",
  async () => {
    const data = await getListAllcodes();

    if (data && data.results && data.results.length > 0) {
      return data.results;
    } else {
      return [];
    }
  }
);
