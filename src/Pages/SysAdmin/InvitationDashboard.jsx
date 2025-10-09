
import InviteAnalyticscard from "../../Components/SysAdmin/InviteAnalyticscard";
import InvitePendingRow from "../../Components/SysAdmin/InvitePendingRow";
import { Documents, Universities } from "./constants";
import DocReviewCard from "../../Components/SysAdmin/DocReviewCard";

export default function InvitationDashboard() {
  return (
    <div className="max-w-6xl mx-auto py-4 px-0 font-inter  text-slate-700 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <InviteAnalyticscard
          name="Pending Approvals"
          action="Schools requiring action"
          quantity="24"
          stats="7 High Priority"
        />
        <InviteAnalyticscard
          name="Document Status"
          action="Incomplete document sets"
          quantity="15"
          stats="5 Missing Documents"
        />
        <InviteAnalyticscard
          name="Approval Rate"
          action="Approved this month"
          quantity="87%"
          stats="12% from last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ">
        <div className="bg-white rounded-2xl shadow max-h-[750px] overflow-auto">
          <div className="p-6 py-8 font-semibold text-lg border-b border-slate-200 sticky top-0 bg-[white]">
            Pending Verifications
          </div>
          <div className="p-6">
            {Universities.map((item, index) => (
              <InvitePendingRow
                key={index}
                school={item.school}
                subtitle={item.subtitle}
                priority={item.priority}
                i={item.index}
              />
            ))}
            <div className="text-slate-400 mt-4 text-center">
              Showing 4 out of 24 pending verifications
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden max-h-[750px]">
          <div className="p-6 font-semibold text-lg border-b border-slate-200 flex items-center justify-between">
            <span>Document Review</span>
            <select className="bg-white rounded-lg px-4 py-2 font-medium border border-slate-200 min-w-[200px]">
              <option>Marine Coastal Academy</option>
              <option>Summit Preparatory</option>
              <option>Riverside High School</option>
            </select>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4 gap-2">
              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-medium">
                Pending
              </span>
              <span className="text-slate-400 ml-2">Deadline: Nov 5, 2023</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {Documents.map((doc, i) => (
                <DocReviewCard
                  key={i}
                  name={doc.name}
                  status={doc.status}
                  i={i}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-center  py-6 border-t border-slate-200 mt-2">
            <button className="bg-indigo-600 text-white rounded-lg px-4 py-2 font-medium flex items-center gap-3 cursor-pointer">
              <i className="fa fa-check-circle"></i>
              <span>Approve School</span>
            </button>
            <button className="bg-white border border-slate-200 text-slate-800 rounded-lg px-4 py-2 font-medium flex items-center gap-3 cursor-pointer hover:bg-gray-50 hover:border-indigo-600">
              <i className="fa fa-comment"></i>
              <span>Request Documents</span>
            </button>
            <button className="bg-gray-100 text-slate-600 rounded-lg px-4 py-2 font-medium flex items-center gap-3 cursor-pointer">
              <i className="fa fa-ban"></i>
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
