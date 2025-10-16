import { useDispatch, useSelector } from "react-redux";
import InvitePendingRow from "./InvitePendingRow";
import { setApplicationInReview } from "../../Features/Admin_Features/AnalyticsSlice";

export default function PenndinApprovalPanel() {
  const applications = useSelector(
    (state) => state.analyticsReducer.applications
  );
  const dispatch = useDispatch();

  const handleRevieApplication = (applicationData) => {
    dispatch(setApplicationInReview(applicationData));
    
  };
  return (
    <div className="bg-white rounded-2xl shadow max-h-[750px] overflow-auto">
      <div className="p-6 py-8 font-semibold text-lg border-b border-slate-200 sticky top-0 bg-[white]">
        Pending Verifications
      </div>
      <div className="p-6">
        {applications.map((item, index) => (
          <InvitePendingRow
            key={index}
            school={item.schoolName}
            subtitle={item.adminName}
            priority={item.priority}
            i={item.index}
            onClick={() => handleRevieApplication(item)}
          />
        ))}
        <div className="text-slate-400 mt-4 text-center">
          Showing 4 out of 24 pending verifications
        </div>
      </div>
    </div>
  );
}
