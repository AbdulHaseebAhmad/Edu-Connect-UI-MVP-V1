import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

const initialState = {
  loading: "idle",
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
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const SigninAdmin = createAsyncThunk(
  "admin/features/signin",
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
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const createSchoolInvite = createAsyncThunk(
  "admin/features/invite/create",
  async (schooldata) => {
    const csrfToken = Cookies.get("csrf_token");    
    try {
      const response = await axios.post(
        `${URL}/api/sysadmin/invite/create`,
        schooldata,
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

export const sendSchoolInvite = createAsyncThunk(
  "admin/features/invite/send",
  async ({token,link}) => {
    const csrfToken = Cookies.get("csrf_token");    
    try {
      const response = await axios.post(
        `${URL}/api/sysadmin/invite/send/${token}`,
        link,
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



export const getInviteAnalytics = createAsyncThunk(
  "admin/features/invite/analytics",
  async () => {
    const csrfToken = Cookies.get("csrf_token");    
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/invite/analytics`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      console.log(response.data)
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getInvites = createAsyncThunk(
  "admin/features/invite/applications",
  async ({limit,offlimit}) => {
    const csrfToken = Cookies.get("csrf_token");    
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/invite/applications?limit=${limit}&offlimit=${offlimit}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      console.log(response.data)
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const respondToInvite = createAsyncThunk(
  "admin/features/invite/applications",
  async ({appid,status}) => {
    const csrfToken = Cookies.get("csrf_token");    
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/invite/respond?appid=${appid}&status=${status}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );
      console.log(response.data)
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);