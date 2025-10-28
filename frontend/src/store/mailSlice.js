import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axiosInstance";


export const fetchMails = createAsyncThunk(
  "mail/fetchMails",
  async (limit = 10) => {
    const safeLimit = Math.min(25, Math.max(1, Number(limit) || 10));
    const { data } = await axiosInstance.get("/auth/google/mails", {
      params: { maxResults: safeLimit },
    });
    return data.mails;
  }
);

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    mails: [],
    mailLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMails.pending, (state) => {
        state.mailLoading = true;
      })
      .addCase(fetchMails.fulfilled, (state, action) => {
        state.mailLoading = false;
        state.mails = action.payload;
        state.error = null;
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.mailLoading = false;
        state.error = action.error.message || "Failed to fetch mails";
      });
  },
});

export default mailSlice.reducer;
