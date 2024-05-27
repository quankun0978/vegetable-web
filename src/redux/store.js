import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Reducer/authSlice";
import userSlice from "./Reducer/userSlice";
import productSlice from "./Reducer/productSlice";
import voucherSlice from "./Reducer/voucherSlice";
import appSlice from "./Reducer/appSlice";
import newsSlice from "./Reducer/newsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
    voucher: voucherSlice,
    app: appSlice,
    news: newsSlice,
  },
});
