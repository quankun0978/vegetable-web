import { createSlice } from "@reduxjs/toolkit";

import {
  handleGetListMyVoucher,
  handleGetListVoucher,
} from "../Action/voucherAction";
const initialState = {
  listVoucher: [],
  listMyVoucher: [],
};

export const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleGetListVoucher.pending, (state, action) => {});
    builder.addCase(handleGetListVoucher.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listVoucher = action.payload;
    });
    builder.addCase(handleGetListVoucher.rejected, (state, action) => {});
    builder.addCase(handleGetListMyVoucher.pending, (state, action) => {});
    builder.addCase(handleGetListMyVoucher.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listMyVoucher = action.payload;
    });
    builder.addCase(handleGetListMyVoucher.rejected, (state, action) => {});
  },
});

export default voucherSlice.reducer;
