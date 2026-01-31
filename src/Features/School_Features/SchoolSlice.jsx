import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  loading: "idle",
};
const URL = import.meta.env.VITE_BACKEND_URL;

const schoolFeaturesSlice = createSlice({
  name: "school/features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(SignupAdmin.pending, (state) => {
    //     state.loading = "pending";
    //   })
    //   .addCase(SignupAdmin.fulfilled, (state, action) => {
    //     state.entities = action.payload;
    //     state.loading = "idle";
    //   })
    //   .addCase(SignupAdmin.rejected, (state) => {
    //     state.loading = "idle";
    //   });
  },
});

export default schoolFeaturesSlice.reducer;

export const SigninSchool = createAsyncThunk(
  "school/features/signin",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${URL}/api/schooladmin/login`,
        credentials,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const validateSchoolInviteLink = createAsyncThunk(
  "school/features/invite/validate",
  async (token) => {
    try {
      const response = await axios.get(
        `${URL}/api/schooladmin/invite/validate?invitation_id=${token}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const submitSchoolInfo = createAsyncThunk(
  "school/features/invite/accept",
  async ({ formData, token }) => {
    try {
      const response = await axios.post(
        `${URL}/api/schooladmin/invite/${token}/accept`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  }
);

export const GetUnProcessedStudents = createAsyncThunk(
  "school/features/get/unprocessed/students",
  async (school_id) => {
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(
        `${URL}/api/schooladmin/unprocessed/students?school_id=${school_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      console.log(response?.data);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e; // Critical: re-throw for rejected state
    }
  }
);

export const VerifyStudentAccount = createAsyncThunk(
  "school/features/update/verify/students",
  async (data) => {
    console.log("running");
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(
        `${URL}/api/schooladmin/verify/students?school_id=${data?.school_id}&student_id=${data?.student_id}&status=${data?.status}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const GetProcessedStudents = createAsyncThunk(
  "school/features/get/processed/students",
  async (data) => {
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(
        `${URL}/api/schooladmin/processed/students?school_id=${data?.school_id}&status=${data?.status}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      console.log(response?.data);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e; // Critical: re-throw for rejected state
    }
  }
);

export const GetSchoolProfileData = createAsyncThunk(
  "school/features/get/profile",
  async (school_id) => {
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(
        `${URL}/api/schooladmin/profile?school_id=${school_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

