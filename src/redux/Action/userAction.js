import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUserById } from "@/api/user";

export const handleGetUserById = createAsyncThunk(
  "data_user",
  async (user_id) => {
    const data = await getUserById(user_id);

    if (data && data.results && Object.keys(data.results).length > 0) {
      return data.results;
    }
    return {};
  }
);
