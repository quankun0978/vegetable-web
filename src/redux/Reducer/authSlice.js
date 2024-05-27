import { createSlice } from "@reduxjs/toolkit";

import { handleRefreshToken } from "@/redux/Action/authAction";
const initialState = {
  isSuccess: false,
  isLoading: false,
  refresh_token: "",
  isLogout: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleRefreshToken.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleRefreshToken.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.refresh_token = action.payload.refresh_token;
    });
    builder.addCase(handleRefreshToken.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {
    logout: (state, action) => {
      state.isLogout = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
