import { createSlice } from "@reduxjs/toolkit";
import { handleGetListAllCodes } from "../Action/appAction";

const initialState = {
  listAllCodes: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(handleGetListAllCodes.pending, (state, action) => {});
    builder.addCase(handleGetListAllCodes.fulfilled, (state, action) => {
      state.listAllCodes = action.payload;
    });
    builder.addCase(handleGetListAllCodes.rejected, (state, action) => {});
  },
});

// Action creators are generated for each case reducer function

export default appSlice.reducer;
