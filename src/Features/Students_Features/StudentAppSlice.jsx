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
        `${URL}/students/app/signup`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      // console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const SigninStudent = createAsyncThunk(
  "students/app/login",
  async (formData) => {
    try {
      const response = await axios.post(
        `${URL}/students/app/login`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const GetCountriesList = createAsyncThunk(
  "students/app/get/countries",
  async (countryId, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/countries?countryId=${countryId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);
export const GetUniversityList = createAsyncThunk(
  "students/app/get/universities",
  async (countryId, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/universities?countryId=${countryId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const GetUniversityProfile = createAsyncThunk(
  "students/app/get/university/profile",
  async (university_id, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/university?university_id=${university_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const GetProgramsList = createAsyncThunk(
  "students/app/get/universities",
  async (program_id, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/programs?program_id=${program_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const GetStudentDetails = createAsyncThunk(
  "students/app/get/student/details",
  async (student_id, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/profile?student_id=${student_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const UpdateStudentDetails = createAsyncThunk(
  "students/app/update/student/details",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/profile/update?detail_type=${data?.detail_type}&student_id=${data?.student_id}&field_name=${data?.field_name}&field_value=${data?.field_value}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const GetStudentDocuments = createAsyncThunk(
  "students/app/get/student/documents",
  async (student_id, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/documents?student_id=${student_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const UploadStudentDocuments = createAsyncThunk(
  "students/app/upload/student/documents",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.post(
        `${URL}/students/app/documents/upload?student_id=${data?.student_id}`,
        data?.data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const ViewStudentDocuments = createAsyncThunk(
  "students/app/view/student/documents",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/documents/get?document_id=${data?.document_id}&student_id=${data?.student_id}`,
        {
          withCredentials: true,
          responseType: "blob",
          headers: {
            Accept: data?.mimetype,
            "X-CSRF-TOKEN": csrfToken,
          },
        },
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
  },
);

export const UploadApplicationReceipt = createAsyncThunk(
  "students/app/upload/student/receipt",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.post(
        `${URL}/students/app/receipt/upload?student_id=${data?.student_id}&university_id=${data?.university_id}&program_id=${data?.program_id}&paid_amount=${data?.paid_amount}`,
        data?.receipt,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const ApplyToUniversity = createAsyncThunk(
  "students/app/apply/student/university",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/university/apply?student_id=${data?.student_id}&university_id=${data?.university_id}&program_id=${data?.program_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getApplicationData = createAsyncThunk(
  "students/app/get/university/applications",
  async (student_id, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/university/applications?student_id=${student_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);
export const VerifyApplication = createAsyncThunk(
  "students/app/get/university/applications",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/application/check?student_id=${data?.student_id}&program_id=${data?.program_id}&university_id=${data?.university_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const shortlistProgram = createAsyncThunk(
  "students/app/shortlist/program",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/programs/shortlist/add?student_id=${data?.student_id}&university_id=${data?.university_id}&program_id=${data?.program_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const GetShortlistPrograms = createAsyncThunk(
  "students/app/shortlist/program",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/programs/shortlist/list?student_id=${data?.student_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const DeleteShortlistPrograms = createAsyncThunk(
  "students/app/shortlist/program",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/programs/shortlist/delete?student_id=${data?.student_id}&shortlist_id=${data?.shortlist_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const RegisterForEvent = createAsyncThunk(
  "students/app/events/register",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/events/register?student_id=${data?.student_id}&webinar_code=${data?.webinar_code}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const EventRegisterationCheck = createAsyncThunk(
  "students/app/events/register/check",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/events/registered?student_id=${data?.student_id}&webinar_code=${data?.webinar_code}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const SetScholarshipReminder = createAsyncThunk(
  "students/app/scholarship/register/reminder",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/scholarship/reminder?student_id=${data?.student_id}&scholarship_id=${data?.scholarship_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const ScholarshipReminderCheck = createAsyncThunk(
  "students/app/events/register/check",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/scholarship/reminder/set?student_id=${data?.student_id}&scholarship_id=${data?.scholarship_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const GetFreeApplicationCount = createAsyncThunk(
  "students/app/freeapp/count",
  async (student_id, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/freeapplication/check?student_id=${student_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const SearchPrograms = createAsyncThunk(
  "students/app/freeapp/count",
  async (search, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/students/app/programs/search?search_term=${search.search_term}&country_id=${search.country_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);
