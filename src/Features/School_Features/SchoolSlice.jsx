import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
        `${URL}/api/schooladmin/invite/validate?token=${token}`,
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
  async ({formData,token}) => {
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
