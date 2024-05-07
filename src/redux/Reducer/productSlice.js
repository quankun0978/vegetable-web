import { createSlice } from "@reduxjs/toolkit";

import { handleGetAllProduct } from "@/redux/Action/productAction";
const initialState = {
  isLoading: false,
  listProduct: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleGetAllProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleGetAllProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listProduct = action.payload;
    });
    builder.addCase(handleGetAllProduct.rejected, (state, action) => {
      state.isLoading = true;
    });
  },
});

export default productSlice.reducer;
