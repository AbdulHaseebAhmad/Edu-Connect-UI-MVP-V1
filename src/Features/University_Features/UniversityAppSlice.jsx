import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {};
const URL = import.meta.env.VITE_BACKEND_URL;

const universityAppslice = createSlice({
  name: "universityAppSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default universityAppslice.reducer;

export const LoginUniversity = createAsyncThunk(
  "university/app/login",
  async (loginData) => {
    try {
      const response = await axios.post(
        `${URL}/api/university/login`,
        loginData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
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

export const GetUniversityApplications = createAsyncThunk(
  "university/app/get/applications",
  async (data) => {
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(
        `${URL}/api/university/app/applications?university_id=${data?.university_id}&status=${data?.status}`,
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

export const RespondToApplication = createAsyncThunk(
  "university/app/update/application/status",
  async (data) => {
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(
        `${URL}/api/university/app/applications/respond?status=${data?.status}&application_id=${data?.application_id}`,
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

export const GetProgramsList = createAsyncThunk(
  "university/app/get/programs/list",
  async (university_id) => {
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(
        `${URL}/api/university/app/programs/list?university_id=${university_id}`,
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

export const GetProgramsDetails = createAsyncThunk(
  "university/app/get/programs/details",
  async (program_id) => {
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(
        `${URL}/api/university/app/program/details?program_id=${program_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const AddNewProgram = createAsyncThunk(  
  "university/app/add/program",
 async (formData) => {
  const csrfToken = Cookies.get("csrf_token");
  try {
    const response = await axios.post(`${URL}/api/university/app/program/add`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
    });
    console.log(response?.data);
    return response?.data;
  } catch (e) {
    console.log(e);
  }
});
export const UpdateProgram = createAsyncThunk(  
  "university/app/update/program",
 async (formData) => {
  const csrfToken = Cookies.get("csrf_token");
  try {
    const response = await axios.post(`${URL}/api/university/app/program/update?program_id=${formData?.program_id}`, formData?.data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
    });
    console.log(response?.data);
    return response?.data;
  } catch (e) {
    console.log(e);
  }
});
