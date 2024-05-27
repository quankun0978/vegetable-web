import { createSlice } from "@reduxjs/toolkit";
import { handleGetUserById } from "../Action/userAction";

const initialState = {
  currentUser: {},
  dataInfo: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleGetUserById.pending, (state, action) => {});
    builder.addCase(handleGetUserById.fulfilled, (state, action) => {
      state.dataInfo = action.payload;
    });
    builder.addCase(handleGetUserById.rejected, (state, action) => {});
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
