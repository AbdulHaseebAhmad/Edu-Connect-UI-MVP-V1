import { useEffect, useMemo, useState } from "react";
import { FaChevronRight, FaFilter, FaPlus, FaSearch } from "react-icons/fa";
import { SchoolStudentPanel } from "../../../Components/SchoolAdmin/SchoolStudentPanel";
import { useDispatch, useSelector } from "react-redux";
import { GetUniversityApplications } from "../../../Features/University_Features/UniversityAppSlice";

const TABS = [
  { label: "All Applications", name: "all" },
  { label: "Pending", name: "pending" },
  { label: "Offered", name: "offered" },
  { label: "Enrolled", name: "enrolled" },
  { label: "Rejected", name: "rejected" },
];

export default function MasterApplicationsManager() {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedApp, setSelectedApp] = useState(null);
  const [applications, setApplications] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedApp(null);

    dispatch(
      GetUniversityApplications({ status: activeTab, university_id: "all" }),
    )
      .unwrap()
      .then((res) => {
        if (res || res == null) {
          setApplications(res);
        }
      });
  }, [activeTab, refetch, dispatch]);

  const filteredApplications = useMemo(() => {
    return applications?.filter((app) => {
      const fullName =
        `${app?.first_name || ""} ${app?.last_name || ""}`.toLowerCase();
      const applicationId = app?.application_id?.toLowerCase?.() || "";
      const programName = app?.program_name?.toLowerCase?.() || "";
      const intake = app?.session_intake?.toLowerCase?.() || "";
      const search = searchTerm.toLowerCase();

      return (
        fullName.includes(search) ||
        applicationId.includes(search) ||
        programName.includes(search) ||
        intake.includes(search)
      );
    });
  }, [applications, searchTerm]);

  const statusColor = (status) => {
    if (status === "pending") {
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-yellow-100 text-yellow-700";
    }
    if (status === "offered") {
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-purple-100 text-purple-700";
    }
    if (status === "enrolled") {
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-green-100 text-green-700";
    }
    return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-red-100 text-red-700";
  };

  return (
    <div className="fade-in px-6 py-6 relative min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Applications Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Overview of all student applications submitted to your university.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
            <div className="flex items-center">
              <FaSearch className="text-slate-400 text-[11px] ml-2 mr-2" />
              <input
                type="text"
                placeholder="Search by applicant, ID, intake..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-56 pl-1 pr-3 py-1.5 text-[11px] rounded-full bg-slate-50 outline-none"
              />
            </div>
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 shadow-sm">
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      {/* Status Key */}
      <div className="hidden md:flex items-center gap-3 text-[11px] bg-white border border-slate-200 rounded-full px-4 py-1 shadow-sm mb-4 w-fit">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-400 rounded-full" /> Pending
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-purple-500 rounded-full" /> Offered
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full" /> Enrolled
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full" /> Rejected
        </span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 rounded-full text-[11px] font-bold border transition ${
              activeTab === tab.name
                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-3 text-start">Application ID</th>
              <th className="px-6 py-3 text-start">Applicant</th>
              <th className="px-6 py-3 text-start">Program</th>
              <th className="px-6 py-3 text-start">Intake</th>
              <th className="px-6 py-3 text-start">Status</th>
              <th className="px-6 py-3 text-start">Date</th>
              <th className="px-6 py-3 text-start"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {applications?.length > 0 ? (
              applications?.map((app) => (
                <tr
                  key={app.application_id}
                  className="hover:bg-slate-50 transition cursor-pointer text-start"
                  onClick={() => setSelectedApp(app)}
                >
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                    {app?.application_id}
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://i.pravatar.cc/150?img=12"
                        className="w-8 h-8 rounded-full"
                        alt=""
                      />
                      <span>{app?.first_name + " " + app?.last_name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {app?.program_name}
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {app?.session_intake}
                  </td>

                  <td className="px-6 py-4">
                    <span className={statusColor(app?.decision_status)}>
                      {app?.decision_status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {app?.created_at}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedApp(app);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      {activeTab === "pending" ? "Manage" : "View"}
                      <FaChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-slate-400 text-sm"
                >
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Side Panel */}
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
