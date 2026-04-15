import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SigninAdmin } from "../Admin_Features/adminSlice";
import { SigninSchool } from "../School_Features/SchoolSlice";
import {
  SigninStudent,
  SignUpStudent,
} from "../Students_Features/StudentAppSlice";
import { LoginUniversity } from "../University_Features/UniversityAppSlice";

const initialState = {
  authenticated: false,
  role: null,
  email: null,
  status: null,
  name: null,
  user_id: null,
  school_verified: "un-verified",
  csrf_token: "",
};

const URL = import.meta.env.VITE_BACKEND_URL;

const authFeaturesSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAdmin(state) {
      state.authenticated = false;
      state.role = null;
      state.email = null;
      state.name = null;
      state.status = "in-active";
      state.csrf_token = "";
      state.user_id = "";
      state.school_verified =  "un-verified"
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
        state.csrf_token = action.payload.csrf_token;
      })
      .addCase(SigninAdmin.rejected, (state) => {
        state.authenticated = false;
        state.role = null;
        state.email = null;
        state.name = null;
        state.status = "in-active";
      })
      .addCase(SigninSchool.pending, (state) => {})
      .addCase(SigninSchool.fulfilled, (state, action) => {
        state.authenticated = action.payload.authenticated;
        state.role = action.payload.role;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.status = action.payload.status;
        state.user_id = action.payload.id;
        state.csrf_token = action.payload.csrf_token;
      })
      .addCase(SigninSchool.rejected, (state) => {
        state.authenticated = false;
        state.role = null;
        state.email = null;
        state.name = null;
        state.status = "in-active";
      })
      .addCase(SigninStudent.pending, (state) => {})
      .addCase(SigninStudent.fulfilled, (state, action) => {
        state.authenticated = true;
        state.role = action.payload.role;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.status = action.payload.student_status;
        state.user_id = action.payload.student_id;
        state.school_verified = action.payload.school_verified;
        state.csrf_token = action.payload.csrf_token;

      })
      .addCase(SigninStudent.rejected, (state) => {
        state.authenticated = false;
        state.role = null;
        state.email = null;
        state.name = null;
        state.status = "in-active";
        state.user_id = null;
      })
      .addCase(LoginUniversity.pending, (state) => {})
      .addCase(LoginUniversity.fulfilled, (state, action) => {
        state.authenticated = action.payload.authenticated;
        state.role = action.payload.role;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.status = action.payload.status;
        state.user_id = action.payload.university_id;
        state.csrf_token = action.payload.csrf_token;

      })
      .addCase(LoginUniversity.rejected, (state) => {
        state.authenticated = false;
        state.role = null;
        state.email = null;
        state.name = null;
        state.status = "in-active";
        state.user_id = null;
      });
  },
});

export const { logoutAdmin } = authFeaturesSlice.actions;
export default authFeaturesSlice.reducer;
