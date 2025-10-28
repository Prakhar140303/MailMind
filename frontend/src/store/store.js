import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import MailReducer from "./mailSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    mail: MailReducer,
  },
});

export default store;
