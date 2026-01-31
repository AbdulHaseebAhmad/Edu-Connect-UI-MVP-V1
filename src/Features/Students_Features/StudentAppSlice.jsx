import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {};

const URL = import.meta.env.VITE_BACKEND_URL;
const studentAppslice = createSlice({
  name: "student-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default studentAppslice.reducer;

export const SignUpStudent = createAsyncThunk(
  "students/app/signup",
  async (formData) => {
    console.log(formData);
    try {
      const response = await axios.post(
        `${URL}/api/students/app/signup`,
        formData,
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

export const SigninStudent = createAsyncThunk(
  "students/app/login",
  async (formData) => {
    try {
      const response = await axios.post(
        `${URL}/api/students/app/login`,
        formData,
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

export const GetCountriesList = createAsyncThunk(
  "students/app/get/countries",
  async (countryId) => {
    // console.log("running 2");
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(
        `${URL}/api/students/app/countries?countryId=${countryId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
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
export const GetUniversityList = createAsyncThunk(
  "students/app/get/universities",
  async (countryId) => {
    const csrfToken = Cookies.get("csrf_token");
    console.log(csrfToken);
    try {
      const response = await axios.get(
        `${URL}/api/students/app/universities?countryId=${countryId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
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

export const GetUniversityProfile = createAsyncThunk(
  "students/app/get/university/profile",
  async (university_id) => {
    const csrfToken = Cookies.get("csrf_token");
    console.log(csrfToken);
    try {
      const response = await axios.get(
        `${URL}/api/students/app/university?university_id=${university_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
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
  "students/app/get/universities",
  async (program_id) => {
    console.log("running 4");
    const csrfToken = Cookies.get("csrf_token");
    console.log(csrfToken);
    try {
      const response = await axios.get(
        `${URL}/api/students/app/programs?program_id=${program_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
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

export const GetStudentDetails = createAsyncThunk(
  "students/app/get/student/details",
  async (student_id) => {
    console.log("running 5");
    const csrfToken = Cookies.get("csrf_token");
    console.log(csrfToken);
    try {
      const response = await axios.get(
        `${URL}/api/students/app/profile?student_id=${student_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
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

export const UpdateStudentDetails = createAsyncThunk(
  "students/app/update/student/details",
  async (data) => {
    console.log("running 5");
    const csrfToken = Cookies.get("csrf_token");
    console.log(csrfToken);
    try {
      const response = await axios.get(
        `${URL}/api/students/app/profile/update?detail_type=${data?.detail_type}&student_id=${data?.student_id}&field_name=${data?.field_name}&field_value=${data?.field_value}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
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

export const GetStudentDocuments = createAsyncThunk(
  "students/app/get/student/documents",
  async (student_id) => {
    console.log("running 6");
    const csrfToken = Cookies.get("csrf_token");
    console.log(csrfToken);
    try {
      const response = await axios.get(
        `${URL}/api/students/app/documents?student_id=${student_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
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

export const UploadStudentDocuments = createAsyncThunk(
  "students/app/upload/student/documents",
  async (data) => {
    console.log("running 6");
    const csrfToken = Cookies.get("csrf_token");
    console.log(csrfToken);
    try {
      const response = await axios.post(
        `${URL}/api/students/app/documents/upload?student_id=${data?.student_id}`,
        data?.data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
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

export const ViewStudentDocuments = createAsyncThunk(
  "students/app/view/student/documents",
  async (data) => {
    const csrfToken = Cookies.get("csrf_token");

    try {
      const response = await axios.get(
        `${URL}/api/students/app/documents/get?docname=${data?.docname}&student_id=${data?.student_id}`,
        {
          withCredentials: true,
          responseType: "blob",
          headers: {
            Accept: data?.mimetype,
            "X-CSRF-TOKEN": csrfToken,
          },
        }
      );

      const blobUrl = window.URL.createObjectURL(response.data);
      const newWindow = window.open(blobUrl, "_blank", "noopener,noreferrer");
      if (newWindow) {
        newWindow.onload = () => {
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        };
      }
      return blobUrl;
    } catch (e) {
      console.log(e);
    }
  }
);

export const UploadApplicationReceipt = createAsyncThunk(
  "students/app/upload/student/receipt",
  async (data) => {
    console.log(data);
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.post(
        `${URL}/api/students/app/receipt/upload?student_id=${data?.student_id}&university_id=${data?.university_id}&program_id=${data?.program_id}&paid_amount=${data?.paid_amount}`,
        data?.receipt,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
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

export const ApplyToUniversity = createAsyncThunk(
  "students/app/apply/student/university",
  async (data) => {
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(
        `${URL}/api/students/app/university/apply?student_id=${data?.student_id}&university_id=${data?.university_id}&program_id=${data?.program_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
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

export const getApplicationData = createAsyncThunk(
  "students/app/get/university/applications",
  async (student_id) => {
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(`${URL}/api/students/app/university/applications?student_id=${student_id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const VerifyApplication = createAsyncThunk(
  "students/app/get/university/applications",
  async (data) => {
    const csrfToken = Cookies.get("csrf_token");
    try {
      const response = await axios.get(`${URL}/api/students/app/application/check?student_id=${data?.student_id}&program_id=${data?.program_id}&university_id=${data?.university_id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
);
