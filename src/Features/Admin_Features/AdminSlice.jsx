import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading:'idle'
};
const URL = import.meta.env.VITE_BACKEND_URL;

const adminFeaturesSlice = createSlice({
  name: "admin/features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignupAdmin.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(SignupAdmin.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = "idle";
      })
      .addCase(SignupAdmin.rejected, (state) => {
        state.loading = "idle";
      });
  },
});

export default adminFeaturesSlice.reducer;

export const SignupAdmin = createAsyncThunk(
  "admin/features/signup",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${URL}/api/sysadmin/signup`,
        credentials,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data
    } catch (e) {
      console.log(e);
    }
  }
);
export const SigninAdmin = createAsyncThunk(
  "admin/features/signup",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${URL}/api/sysadmin/login`,
        credentials,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data)
      return response.data
    } catch (e) {
      console.log(e);
    }
  }
);
