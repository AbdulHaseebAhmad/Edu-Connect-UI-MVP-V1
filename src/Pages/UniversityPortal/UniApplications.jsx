import { useEffect, useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { SchoolStudentPanel } from "../../Components/SchoolAdmin/SchoolStudentPanel";
import { useDispatch, useSelector } from "react-redux";
import { GetUniversityApplications } from "../../Features/University_Features/UniversityAppSlice";

const TABS = [
  { label: "All Applications", name: "all" },
  { label: "Pending", name: "pending" },
  { label: "Offered", name: "offered" },
  { name: "enrolled", label: "Enrolled" },
  { name: "rejected", label: "Rejected" },
];

export default function ApplicationsManager() {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedApp, setSelectedApp] = useState(null);
  const [applications, setApplications] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const university_id = useSelector((state) => state.authReducer.user_id);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedApp(false);
    setApplications([]);
    dispatch(GetUniversityApplications({ status: activeTab, university_id }))
      .unwrap()
      .then((res) => {
        setApplications(res);
      });
  }, [activeTab, refetch]);


  return (
    <div className="relative">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-extrabold text-slate-800">
          Applications Manager
        </h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search applicant..."
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold border border-slate-200 rounded-xl hover:bg-slate-50">
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      {/* TABS (MISSING PART – NOW ADDED) */}
      <div className="flex gap-6 border-b border-slate-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab?.name}
            onClick={() => setActiveTab(tab?.name)}
            className={`pb-3 text-sm font-bold transition
              ${
                activeTab === tab?.name
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-slate-400 hover:text-slate-600 border-b-2 border-transparent"
              }`}
          >
            {tab?.label}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4 text-left">Application ID</th>
              <th className="px-6 py-4 text-left">Applicant</th>
              <th className="px-6 py-4 text-left">Program</th>
              <th className="px-6 py-4 text-left">Intake</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {applications?.length > 0 &&
              applications?.map((app) => (
                <tr key={app.student_id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    {app?.application_id}
                  </td>
                  <td className="px-6 py-4">
                    {app?.first_name + " " + app?.last_name}
                  </td>
                  <td className="px-6 py-4">{app?.program_name}</td>
                  <td className="px-6 py-4">{app?.session_intake}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                      ${
                        app.decision_status === "pending"
                          ? "bg-orange-100 text-orange-700"
                          : app.decision_status === "offered"
                          ? "bg-purple-100 text-purple-700"
                          : app.decision_status === "enrolled"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app?.decision_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{app?.created_at}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                    >
                      {activeTab == "pending" ? "Manage" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* SIDE PANEL (already handled earlier) */}
      {selectedApp && (
        <SchoolStudentPanel
          open={selectedApp}
          student={selectedApp}
          onClose={() => setSelectedApp(null)}
          refetchData={() => setRefetch(!refetch)}
          universityTab={activeTab}
          portalType={"university"}
        />
      )}
    </div>
  );
}
