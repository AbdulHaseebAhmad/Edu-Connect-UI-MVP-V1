import PendingApprovalCard from "../../../Components/SysAdmin/PendingApprovalCard";
import {useSelector} from "react-redux"

export default function PendingApprovals() {

 const applications = useSelector(
    (state) => state.analyticsReducer.applications
  );

  const isListValid = applications && applications.length  > 0 ? true : false;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 font-inter text-slate-700 min-h-screen">
      <div className="mb-8 text-left">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Pending Approvals</h1>
        <p className="text-slate-500">
          These are applications made by schools for you to be approved
        </p>
      </div>

      <div className="w-full mb-8">
        <input
          type="text"
          placeholder="Search schools, admins, or applications..."
          className="w-full border border-slate-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((approval) => (
          <PendingApprovalCard key={approval.id} data={approval} />
        ))}
      </div>
    </div>
  );
}
