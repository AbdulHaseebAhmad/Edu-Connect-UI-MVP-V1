import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { GetStudentDetails, GetStudentDocuments } from "./StudentAppSlice";

const initialState = {
  annual_budget: "",
  city: "",
  cummulative_score: "",
  curriculum: "",
  degree_level: "",
  dob: "",
  email: "",
  emergency_contact_name: "",
  emergency_phone: "",
  emergency_relationship: "",
  first_name: "",
  gender: "",
  graduation_year: "",
  language_listening: "",
  language_overall_score: "",
  language_reading: "",
  language_speaking: "",
  language_type: "",
  language_writting: "",
  last_name: "",
  marrital_status: "",
  middle_name: "",
  nationality: "",
  passport_expiry: "",
  passport_issue: "",
  passport_number: "",
  permanent_address: "",
  phone_number: "",
  preferred_start_date: "",
  primary_career_interest: "",
  scholarship_interest: "",
  school_name: "",
  state_province: "",
  street_address: "",
  whatsapp_number: "",
  zip_postal_code: "",
  documentList: {
    cover_letter: {},
    cv: {},
    high_school: {},
    identity: {},
    language_proefficiency: {},
    motivation_letter: {},
    passport: {},
  },
};

const URL = import.meta.env.VITE_BACKEND_URL;
const studentProfileSlice = createSlice({
  name: "student-profile-slice",
  initialState,
  reducers: {
    clearProfile(state) {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetStudentDetails.rejected, (state, action) => {})
      .addCase(GetStudentDetails.fulfilled, (state, action) => {
        for (let key in action.payload) {
          state[key] = action.payload[key];
        }
      })
      .addCase(GetStudentDetails.pending, (state, action) => {})
      .addCase(GetStudentDocuments.rejected, (state, action) => {})
      .addCase(GetStudentDocuments.fulfilled, (state, action) => {
        for (let key in action.payload) {
          state.documentList[key] = action.payload[key];
        }
      })
      .addCase(GetStudentDocuments.pending, (state, action) => {});
  },
});


export const { clearProfile } = studentProfileSlice.actions;
export default studentProfileSlice.reducer;
