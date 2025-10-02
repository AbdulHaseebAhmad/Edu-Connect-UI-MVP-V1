import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SigninAdmin } from "../Features/Admin_Features/adminSlice";

const initialState = {
  authenticated: false,
  role: null,
  email: null,
  status: null,
  name: null,
};

const URL = import.meta.env.VITE_BACKEND_URL;

const authFeatuureSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAdmin() {
      state.authenticated = false;
      state.role = null;
      state.email = null;
      state.name = null;
      state.status = "in-active";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SigninAdmin.pending, (state) => {})
      .addCase(SigninAdmin.fulfilled, (state, action) => {
        state.authenticated = action.payload.authenticated;
        state.role = "admin";
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.status = action.payload.status;
      })
      .addCase(SigninAdmin.rejected, (state) => {
        state.authenticated = false;
        state.role = null;
        state.email = null;
        state.name = null;
        state.status = "in-active";
      });
  },
});

export const { logout } = authFeatuureSlice.actions;
export default authFeatuureSlice.reducer;
