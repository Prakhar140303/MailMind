import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axiosInstance";

// Fetch session
export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data.user;
});

// Logout
export const logout = createAsyncThunk("auth/logoutUser", async () => {
  await axiosInstance.post("/auth/logout");
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchSession.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = "Not logged in";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
