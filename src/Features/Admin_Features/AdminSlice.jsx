import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

const initialState = {
  loading: "idle",
};

const URL = import.meta.env.VITE_BACKEND_URL;
console.log("BACKEND URL IS:", URL);
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
        `/api/sysadmin/signup`,
        credentials,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
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
        },
      );
      // console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const createSchoolInvite = createAsyncThunk(
  "admin/features/invite/create",
  async (schooldata, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
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
        },
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const sendSchoolInvite = createAsyncThunk(
  "admin/features/invite/send",
  async ({ token, link }, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
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
        },
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getInviteAnalytics = createAsyncThunk(
  "admin/features/invite/analytics",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(`${URL}/api/sysadmin/invite/analytics`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getAnalyticsList = createAsyncThunk(
  "admin/features/invite/list",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(`${URL}/api/sysadmin/invite/lists`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const getAllInvites = createAsyncThunk(
  "admin/features/get/invites",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/schools/get/invites`,
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

export const getSchoolApplications = createAsyncThunk(
  "admin/features/invite/applications",
  async ({ limit, offlimit }, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/invite/applications?limit=${limit}&offlimit=${offlimit}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
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
export const getSchoolApplicationDetail = createAsyncThunk(
  "admin/features/invite/applications/details",
  async (application_id, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/invite/application?application_id=${application_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
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

export const respondToInvite = createAsyncThunk(
  "admin/features/invite/applications",
  async ({ appid, status }, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/invite/respond?application_id=${appid}&status=${status}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
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

export const GetStudentsRegistry = createAsyncThunk(
  "sysadmin/features/students/registry",
  async (status, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/student/app/registry?status=${status}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );

      // console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(response.error);
    }
  },
);

export const RespondToapplication = createAsyncThunk(
  "sysadmin/features/students/respondtoapp",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/student/app/respond?action=${data.action}&id=${data.slug}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response.data);
      return response.data;
    } catch (e) {}
  },
);

export const GetstudentsDocuments = createAsyncThunk(
  "sysadmin/features/students/studentDocs",
  async (docData, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;

    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/student/documents?docname=${docData?.docname}&docmime=${docData?.docmime}&studentId=${docData?.slug}`,
        {
          withCredentials: true,
          responseType: "blob",
          headers: {
            Accept: docData.docmime,
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

export const GetReceipts = createAsyncThunk(
  "school/features/get/receipts",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(`${URL}/api/sysadmin/get/receipts`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });

      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const GetStudentReceipt = createAsyncThunk(
  "school/features/get/receipt/details",
  async (student_id, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/get/receipts?student_id=${student_id}`,
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

export const RespondToReceipt = createAsyncThunk(
  "school/features/update/receipt/status",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/update/receipt/status?receipt_id=${data?.receipt_id}&status=${data?.status}`,
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

export const getRegisteredStudents = createAsyncThunk(
  "school/features/get/registered/students",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/student/get/registered`,
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

export const FetchScholarships = createAsyncThunk(
  "school/features/get/scholarships",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(`${URL}/api/sysadmin/scholarships/get`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      // console.log(response?.data)
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const AddScholarships = createAsyncThunk(
  "school/features/add/scholarships",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.post(
        `${URL}/api/sysadmin/scholarships/add`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data)
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);
export const UpdateScholarship = createAsyncThunk(
  "school/features/update/scholarships",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.put(
        `${URL}/api/sysadmin/scholarships/update?scholarship_id=${data?.scholarship_id}`,
        data?.data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data)
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);
export const DeleteScholarship = createAsyncThunk(
  "school/features/delete/scholarships",
  async (scholarship_id, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.delete(
        `${URL}/api/sysadmin/scholarships/delete?scholarship_id=${scholarship_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        },
      );
      // console.log(response?.data)
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const CreateWebinar = createAsyncThunk(
  "student/features/webinars/add",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;

    try {
      const response = await axios.post(
        `${URL}/api/sysadmin/webinar/create`,
        data,
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

export const GetWebinars = createAsyncThunk(
  "student/features/webinars/get",
  async (_, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;

    try {
      const response = await axios.get(`${URL}/api/sysadmin/webinar/get`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const UpdateWebinar = createAsyncThunk(
  "student/features/webinars/update",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.put(
        `${URL}/api/sysadmin/webinar/update?webinar_id=${data?.webinar_code}`,
        data,
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

export const DeleteWebinar = createAsyncThunk(
  "student/features/webinars/delete",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.delete(
        `${URL}/api/sysadmin/webinar/delete?webinar_id=${data}`,
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

export const FetchUniversities = createAsyncThunk(
  "student/features/universities/get",
  async (_, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(`${URL}/api/sysadmin/universities/get`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      // console.log(response?.data);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const AddFeaturedPartners = createAsyncThunk(
  "student/features/featured-partners/add",
  async (data, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.post(
        `${URL}/api/sysadmin/featured-partners/add`,
        data,
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

export const GetfetchFeaturedPartners = createAsyncThunk(
  "student/features/featured-partners/get",
  async (_, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/featured-partners/get`,
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

export const DeleteFeaturedPartner = createAsyncThunk(
  "student/features/featured-partners/delete",
  async (partner_id, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.delete(
        `${URL}/api/sysadmin/featured-partners/delete?partner_id=${partner_id}`,
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

export const FetchUniversitiesCommisions = createAsyncThunk(
  "university/features/commisions/get",
  async (_, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.get(
        `${URL}/api/sysadmin/universities/commisions/get`,
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


export const AddUniversity = createAsyncThunk(
  "university/features/add/university",
  async (university, { getState }) => {
    const csrfToken = getState().authReducer.csrf_token;
    try {
      const response = await axios.post(
        `${URL}/api/university/add/university`,
        university,
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


