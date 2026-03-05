import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationData } from "../../Features/Students_Features/StudentAppSlice";

export function ApplicationsPageP() {
  const [activeTab, setActiveTab] = useState("active");
  const student_id = useSelector((state) => state.authReducer.user_id);

  const [submittedApplications, setSubmittedApplications] = useState([]);
  const [offeredApplications, setOfferedApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApplicationData(student_id))
      .unwrap()
      .then((res) => {
        if (res) {
          let active = res?.filter(
            (each) =>
              each.decision_status == "pending" &&
              (each.decision_status != "offered" ||
                each.decision_status != "rejected")
          );
          let offered = res?.filter(
            (each) => each?.decision_status === "offered"
          );
          let rejected = res?.filter(
            (each) => each.decision_status == "rejected"
          );
          setSubmittedApplications(active);
          setOfferedApplications(offered);
          setRejectedApplications(rejected);
        }
      });
  }, []);

  return (
    <div className="fade-in space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
          <p className="text-slate-500 mt-1">
            Track your application journey from submission to enrollment
          </p>
        </div>
        {/* <div className="flex gap-3">
          <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 shadow-lg transition">
            New Application
          </button>
          <button className="px-6 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-50 shadow-sm transition">
            Export CSV
          </button>
        </div> */}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/50 mb-8">
        <button
          onClick={() => setActiveTab("active")}
          className={`tab-btn px-8 py-4 text-sm font-medium hover:bg-white transition ${
            activeTab === "active"
              ? "tab-btn active border-blue-500 text-blue-600 font-bold"
              : ""
          }`}
        >
          Active ({offeredApplications?.length + submittedApplications?.length})
        </button>
        <button
          onClick={() => setActiveTab("shortlist")}
          className={`tab-btn px-8 py-4 text-sm font-medium hover:bg-white transition ${
            activeTab === "shortlist"
              ? "tab-btn active border-blue-500 text-blue-600 font-bold"
              : ""
          }`}
        >
          Short Listed
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <div className="bg-amber-50 rounded-2xl p-6 flex flex-col border border-amber-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-amber-900 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
              Pending Review
            </h3>
            <span className="bg-white text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200">
              {submittedApplications?.length}
            </span>
          </div>

          <div className="pt-4 max-h-[500px] space-y-4 overflow-y-auto flex-1 scrollbar-hide">
            {submittedApplications?.map((app) => (
              <div
                key={app?.application_id}
                className="bg-white p-5 rounded-xl border-l-4 border-amber-500 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">
                    {app?.university_name}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                    Pending
                  </span>
                </div>

                <div className="text-xs text-slate-500 mb-3">
                  {app?.program_name}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400">
                    {app?.application_date}
                  </span>
                  <div className="px-2 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-lg">
                    Decision Pending
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-6 flex flex-col border border-emerald-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              Offer Received
            </h3>
            <span className="bg-white text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
              {offeredApplications?.length}
            </span>
          </div>

          <div className="pt-4 max-h-[500px] space-y-4 overflow-y-auto flex-1 scrollbar-hide">
            {offeredApplications?.map((app) => (
              <div
                key={app?.application_id}
                className="bg-white p-5 rounded-xl border-l-4 border-emerald-500 shadow-sm hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">
                    {app?.university_name}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Offered
                  </span>
                </div>

                <div className="text-xs text-slate-500 mb-3">
                  {app?.program_name}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {app?.application_date}
                  </span>
                  <button className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition">
                    View Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-50 rounded-2xl p-6 flex flex-col border border-red-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-red-900 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              Rejected
            </h3>
            <span className="bg-white text-red-700 text-xs font-bold px-3 py-1.5 rounded-full border border-red-200">
              {rejectedApplications?.length}
            </span>
          </div>

          <div className="pt-4 max-h-[500px] space-y-4 overflow-y-auto flex-1 scrollbar-hide">
            {rejectedApplications?.length > 0 ? (
              rejectedApplications.map((app) => (
                <div
                  key={app?.application_id}
                  className="bg-white p-5 rounded-xl border-l-4 border-red-500 shadow-sm opacity-90"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">
                      {app?.university_name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                      Rejected
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 mb-3">
                    {app?.program_name}
                  </div>

                  <div className="text-[10px] text-slate-400">
                    {app?.application_date}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-red-300">
                <p className="text-sm font-medium">No rejections 🎉</p>
                <p className="text-xs">Keep going strong</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-slate-200">

  {/* TOTAL APPLICATIONS */}
  <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition">
    <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">
      Total Applications
    </div>
    <div className="text-3xl font-bold text-slate-900">
      {offeredApplications?.length +
        submittedApplications?.length +
        rejectedApplications?.length}
    </div>
  </div>

  {/* REJECTED APPLICATIONS */}
  <div className="bg-red-50 p-6 rounded-2xl border border-red-200 text-center hover:shadow-lg transition">
    <div className="text-xs uppercase tracking-wide text-red-500 mb-2">
      Rejected Applications
    </div>
    <div className="text-3xl font-bold text-red-600">
      {rejectedApplications?.length}
    </div>
  </div>

  {/* OFFERS RECEIVED */}
  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center hover:shadow-lg transition">
    <div className="text-xs uppercase tracking-wide text-emerald-600 mb-2">
      Offers Received
    </div>
    <div className="text-3xl font-bold text-emerald-600">
      {offeredApplications?.length}
    </div>
  </div>

  {/* UNIVERSITY REQUESTS */}
  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200 text-center hover:shadow-lg transition">
    <div className="text-xs uppercase tracking-wide text-indigo-600 mb-2">
      University Requests
    </div>
    <div className="text-3xl font-bold text-indigo-700">
        0
    </div>
    <div className="text-[11px] text-indigo-500 mt-1">
      Info / documents requested
    </div>
  </div>

</div>

    </div>
  );
}
