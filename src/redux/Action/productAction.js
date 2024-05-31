import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllProduct } from "@/api/product";

export const handleGetAllProduct = createAsyncThunk(
  "list_product",
  async () => {
    const data = await getAllProduct();

    if (data && data.results && data.results.length > 0) {
      return data.results;
    }
    return [];
  }
);
