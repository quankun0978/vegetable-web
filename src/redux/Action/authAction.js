import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { refreshTokenUser } from "@/api/apiUser";

export const handleRefreshToken = createAsyncThunk(
  "refresh_token",
  async (payload) => {
    const data = await refreshTokenUser({
      refresh_token: /"/g.test(payload.refresh_token)
        ? payload.refresh_token.replace(/"/g, "")
        : payload.refresh_token,
      user_id: payload.user_id,
    });

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
