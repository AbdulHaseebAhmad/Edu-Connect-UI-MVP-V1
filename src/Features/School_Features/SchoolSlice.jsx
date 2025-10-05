import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
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

export const validateSchoolInviteLink = createAsyncThunk(
  "school/features/invite/validate",
  async (token) => {
    const csrfToken = Cookies.get("csrf_token");    
    try {
      const response = await axios.get(
        `${URL}/api/schooladmin/invite/validate?token=${token}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
