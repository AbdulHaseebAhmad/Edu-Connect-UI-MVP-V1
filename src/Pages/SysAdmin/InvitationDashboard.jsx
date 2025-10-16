
import InviteAnalyticscard from "../../Components/SysAdmin/InviteAnalyticscard";
import InvitePendingRow from "../../Components/SysAdmin/InvitePendingRow";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getInviteAnalytics, getInvites } from "../../Features/Admin_Features/AdminSlice";
import ApprovalReviewPanel from "../../Components/SysAdmin/ApprovalReviewPanel";
import PenndinApprovalPanel from "../../Components/SysAdmin/PenndinApprovalPanel";


export default function InvitationDashboard() {
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getInviteAnalytics());
    dispatch(getInvites({limit:10,offlimit:0}));
  },[])


  const pendingInvitations = useSelector((state)=> state.analyticsReducer.pendingInvitations);
  const pendingApprovals = useSelector((state)=> state.analyticsReducer.pendingApprovals);
  const approvedInvitations = useSelector((state)=> state.analyticsReducer.approvedInvitations);
  const approvalRate = useSelector((state)=> state.analyticsReducer.approvalRate);
  const acceptanceRate = useSelector((state)=> state.analyticsReducer.acceptanceRate);
  const totalInvitations = useSelector((state)=> state.analyticsReducer.totalInvitations);

  return (
    <div className="max-w-6xl mx-auto py-4 px-0 font-inter  text-slate-700 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <InviteAnalyticscard
          name="Pending Verifications"
          action="Schools requiring action"
          quantity={pendingApprovals}
          stats="7 High Priority"
        />
          <InviteAnalyticscard
            name="Verification Approval Rate"
            action="Approved this month"
            quantity={`${approvalRate}%`}
            stats="12% from last month"
          />
        <InviteAnalyticscard
          name="Pending Invitations"
          action="Schools requiring action"
          quantity={pendingInvitations}
          stats="7 High Priority"
        />
          <InviteAnalyticscard
            name="Invitation Acceptance Rate"
            action="Approved this month"
            quantity={`${acceptanceRate}%`}
            stats="12% from last month"
          />
        <InviteAnalyticscard
          name="Document Status"
          action="Incomplete document sets"
          quantity="15"
          stats="5 Missing Documents"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ">
        <PenndinApprovalPanel/>
        <ApprovalReviewPanel/>
      </div>
    </div>
  );
}
