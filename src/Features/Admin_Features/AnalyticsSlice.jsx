import { createSlice } from "@reduxjs/toolkit";
import { getInviteAnalytics, getInvites } from "./AdminSlice";

const initialState = {
  pendingInvitations: 0,
  pendingApprovals: 0,
  totalInvitations: 0,
  approvedInvitations: 0,
  approvalRate: 0,
  acceptanceRate: 0,
  applications:[],
  applicationinreview:{}
};

const analyticsSlice = createSlice({
  name: "analyticsSlice",
  initialState: initialState,
  reducers: {

    setApplicationInReview (state,action) {
      state.applicationinreview = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getInviteAnalytics.fulfilled, (state, action) => {
        state.pendingInvitations = action.payload.pending;
        state.pendingApprovals = action.payload.completed;
        state.totalInvitations = action.payload.total;
        state.approvedInvitations = action.payload.approved;
        state.approvalRate = action.payload.approvalRate;
        state.acceptanceRate = action.payload.acceptanceRate;
      })
      .addCase(getInviteAnalytics.rejected, (state) => {
        state.pendingInvitations = 0;
        state.pendingApprovals = 0;
        state.totalInvitations = 0;
        state.approvedInvitations = 0;
        state.approvalRate = 0;
        state.acceptanceRate = 0;
      })
      .addCase(getInvites.pending, (state) =>{
        state = {...state}
      })
      .addCase(getInvites.fulfilled, (state,action) =>{
        state.applications = action.payload
      })
  },
});

export const { setApplicationInReview } = analyticsSlice.actions;

export default analyticsSlice.reducer;
