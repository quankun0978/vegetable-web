import { createAsyncThunk } from "@reduxjs/toolkit";

import { getListMyVoucher, getListVoucher } from "@/api/voucher";

export const handleGetListVoucher = createAsyncThunk(
  "list_voucher",
  async () => {
    const data = await getListVoucher();

    if (data && data.results && data.results.length > 0) {
      return data.results;
    }
    return [];
  }
);

export const handleGetListMyVoucher = createAsyncThunk(
  "list_my_voucher",
  async (user_id) => {
    const data = await getListMyVoucher(user_id);

    if (data && data.results && data.results.length > 0) {
      return data.results;
    }
    return [];
  }
);
