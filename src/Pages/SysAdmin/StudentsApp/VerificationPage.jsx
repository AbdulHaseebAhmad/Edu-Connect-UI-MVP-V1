import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetstudentsDocuments,
  GetStudentsRegistry,
  RespondToapplication,
} from "../../../Features/Admin_Features/adminSlice";
import {
  FaCheck,
  FaChevronRight,
  FaEye,
  FaFolderOpen,
  FaTimes,
  FaUserTag,
} from "react-icons/fa";

export function VerificationPage() {
  const dispatch = useDispatch();
  const [listofStudents, setListOfStudents] = useState([]);
  const [activeApplication, setActiveApplication] = useState(null);
  const [showPassport, setShowPassport] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    dispatch(GetStudentsRegistry("all"))
      .unwrap()
      .then((res) => {
        if (res) {
          setListOfStudents(res);
        }
      });
  }, []);

  const toggleApplication = (i) => {
    setActiveApplication(listofStudents[i]);
  };

  const RespondHandle = (action, slug) => {
    dispatch(RespondToapplication({ action, slug }))
      .unwrap()
      .then((res) => {
        if (res) {
          dispatch(GetStudentsRegistry("all"))
            .unwrap()
            .then((res) => {
              if (res) {
                setListOfStudents(res);
                setActiveApplication(null);
              }
            });
        }
      });
  };

  const fetchDocuments = (docname, docmime, slug) => {
    dispatch(GetstudentsDocuments({ docname, docmime, slug }));
  };

  const renderStatusBadge = (status) => {
    const base =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide";

    switch (status) {
      case "pending":
        return (
          <span className={`${base} bg-amber-200 text-amber-700`}>
            • Pending
          </span>
        );
      case "approved":
        return (
          <span className={`${base} bg-emerald-200 text-emerald-700`}>
            • Approved
          </span>
        );
      case "rejected":
        return (
          <span className={`${base} bg-red-200 text-red-700`}>• Rejected</span>
        );
      default:
        return (
          <span className={`${base} bg-slate-100 text-slate-600`}>
            • {status}
          </span>
        );
    }
  };

  const renderActions = (status, applicationId, index) => {
    if (status === "completed") {
      return (
        <div className="inline-flex gap-2 justify-center">
          <button
            onClick={() => onReject(applicationId)}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-[11px] font-bold flex items-center gap-1"
          >
            <FaTimes /> Reject
          </button>
          <button
            onClick={() => onApprove(applicationId)}
            className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[11px] font-bold flex items-center gap-1"
          >
            <FaCheck /> Approve
          </button>
          <button
            onClick={() => toggleApplication(index)}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1"
          >
            <FaEye /> View
          </button>
        </div>
      );
    }
    return (
      <div className="flex justify-center">
        <button
          onClick={() => toggleApplication(index)}
          className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1"
        >
          <FaEye /> View
        </button>
      </div>
    );
  };
  return (
    <div className="fade-in px-4 pt-4">
      {/* ===== Top Header Row (ADDED) ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Student Verification
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review and verify student applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Key */}
          <div className="hidden md:flex items-center gap-3 text-[11px] bg-white border border-slate-200 rounded-full px-4 py-1 shadow-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-amber-400 rounded-full" /> Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Approved
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full" /> Rejected
            </span>
          </div>

          {/* Search */}
          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
            <div className="relative w-56">
              <input
                placeholder="Search student or email..."
                className="w-full pl-3 pr-3 py-1.5 bg-slate-50 rounded-full text-[11px] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ===== END Header Row ===== */}

      {/* ===== EXISTING TABLE (UNCHANGED) ===== */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase text-center">
            <tr>
              <th className="px-6 py-3">Application ID</th>
              <th className="px-6 py-3 ">Student Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Applied On</th>
              <th className="px-6 py-3">Citizenship</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y text-xs">
            {listofStudents?.length > 0 ? (
              listofStudents.map((app, index) => (
                <tr key={index} className="hover:bg-slate-50 text-center">
                  <td className="px-6 py-4 font-bold text-center">
                    {app.slug}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-center">
                    {app.fname + " " + app?.lname}
                  </td>
                  <td className="px-6 py-4 font-mono text-center">
                    {app.slug}
                  </td>
                  <td className="px-6 py-4 text-center">{app.created_at}</td>
                  <td className="px-6 py-4 text-center">{app.citizenship}</td>
                  <td className="px-6 py-4">
                    {renderStatusBadge(app.status, app?.slug)}
                  </td>
                  <td className="px-6 py-4">
                    {renderActions(app.status, app?.slug, index)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {activeApplication && (
        <div
          className="
      fixed inset-y-0 right-0 w-[40%] bg-white border-l border-slate-200
      shadow-xl z-50 flex flex-col
      animate-slideInLeft pt-8
    "
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=12"
                className="w-12 h-12 rounded-full border shadow-sm"
                alt=""
              />
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {activeApplication?.fname} {activeApplication?.lname}
                </h2>
                <p className="text-[11px] text-slate-500 font-mono">
                  {activeApplication?.slug}
                </p>
              </div>
            </div>

            {activeApplication?.status === "pending" ? (
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    RespondHandle("approved", activeApplication?.slug)
                  }
                  className="px-3 py-1.5 text-[11px] font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    RespondHandle("rejected", activeApplication?.slug)
                  }
                  className="px-3 py-1.5 text-[11px] font-bold rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                >
                  Reject
                </button>
                <button
                  onClick={() => setActiveApplication(null)}
                  className="px-3 py-1.5 text-[11px] font-bold rounded-lg border border-red-200 text-white bg-red-500 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="flex justify-center gap-2">
                {renderStatusBadge(
                  activeApplication?.status,
                  activeApplication?.slug,
                  ""
                )}
                <button
                  onClick={() => setActiveApplication(null)}
                  className="px-3  py-1.5 text-[11px] font-bold rounded-lg border border-red-200 text-white bg-red-500 transition"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
            {/* Bio Data */}
            <section>
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase text-slate-400 mb-3">
                <FaUserTag className="text-slate-400" />
                Bio Data Information
              </h3>

              <div className="border border-slate-200 rounded-xl divide-y text-sm">
                {[
                  [
                    "Full Name",
                    `${activeApplication?.fname} ${activeApplication?.lname}`,
                  ],
                  ["Nationality", activeApplication?.citizenship],
                  ["Email", activeApplication?.email],
                  ["Applied On", activeApplication?.created_at],
                  // ["Location", "London, UK"],
                  // ["High School", "London Central High"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between px-4 py-3">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-bold text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Documents */}
            <section>
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase text-slate-400 mb-3">
                <FaFolderOpen className="text-slate-400" />
                Document Inspector
              </h3>

              <div className="bg-slate-100 p-1 rounded-xl flex gap-1 mb-4">
                <button
                  onClick={() => {
                    setShowPassport(!showPassport);
                    setShowTranscript(false);
                    fetchDocuments(
                      "passport",
                      "passport_mime_type",
                      activeApplication?.slug
                    );
                  }}
                  className={`flex-1 py-2 rounded-lg text-[11px] font-bold transition ${
                    showPassport ? "bg-white shadow" : ""
                  }`}
                >
                  Passport / ID
                </button>

                <button
                  onClick={() => {
                    setShowTranscript(!showTranscript);
                    setShowPassport(false);
                    fetchDocuments(
                      "transcript",
                      "transcript_mime_type",
                      activeApplication?.slug
                    );
                  }}
                  className={`flex-1 py-2 rounded-lg text-[11px] font-bold transition ${
                    showTranscript ? "bg-white shadow" : ""
                  }`}
                >
                  Transcript
                </button>
              </div>

              {(showPassport || showTranscript) && (
                <div className="border border-slate-200 rounded-xl h-80 flex items-center justify-center bg-slate-900 text-center">
                  <div>
                    <p className="text-slate-400 font-bold text-sm">
                      {showPassport ? "passport.pdf" : "transcript.pdf"}
                    </p>
                    <p className="text-slate-600 text-xs mt-1">
                      Click to open fullscreen
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
