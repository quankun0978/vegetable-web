import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Reducer/authSlice";
import userSlice from "./Reducer/userSlice";
import productSlice from "./Reducer/productSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
  },
});
