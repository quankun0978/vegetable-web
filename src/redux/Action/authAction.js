import { createAsyncThunk } from "@reduxjs/toolkit";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// import { refreshTokenUser } from "@/api/user";
import axios from "axios";

export const handleRefreshToken = createAsyncThunk(
  "refresh_token",
  async (payload) => {
    const res = await await axios.post(
      `${import.meta.env.REACT_APP_URL_BACKEND}/api/refresh_token`,
      {
        refresh_token: /"/g.test(payload.refresh_Token)
          ? payload.refresh_Token.replace(/"/g, "")
          : payload.refresh_Token,
        user_id: payload.user_id,
      }
    );
    const data = res.data;
    if (data && data.results && Object.keys(data.results).length > 0) {
      const decodeToken = jwtDecode(data.results.access_token);

      Cookies.set("a_token", data.results.access_token, {
        expires: new Date(decodeToken.exp * 1000),
      });
      localStorage.setItem("rf_token", data.results.refresh_token);
      return data.results;
    } else {
      return {};
    }
  }
);
