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

export const classifyMails = createAsyncThunk(
  "mail/classifyMails",
  async (emails) => {
    const geminiKey = sessionStorage.getItem("gemini_api_key");
    if (!geminiKey) throw new Error("Missing Gemini API key. Set it on the login page.");

    const { data } = await axiosInstance.post("/api/classify", {
      emails,
      gemini_key: geminiKey,
    });

    return data.classifiedMails;
  }
);

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    mails: [],
    mailLoading: false,
    error: null,

    classifiedMails: [],
    classifyLoading: false,
    classifyError: null,
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
        state.classifiedMails = [];
        state.error = null;
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.mailLoading = false;
        state.error = action.error.message || "Failed to fetch mails";
      })
      // classifyMails cases
      .addCase(classifyMails.pending, (state) => {
        state.classifyLoading = true;
        state.classifyError = null;
      })
      .addCase(classifyMails.fulfilled, (state, action) => {
        state.classifyLoading = false;
        state.classifiedMails = Array.isArray(action.payload) ? action.payload : null;
        state.classifyError = null;
      })
      .addCase(classifyMails.rejected, (state, action) => {
        state.classifyLoading = false;
        state.classifyError = action.error.message || "Failed to classify mails";
      });
  },
});

export default mailSlice.reducer;
