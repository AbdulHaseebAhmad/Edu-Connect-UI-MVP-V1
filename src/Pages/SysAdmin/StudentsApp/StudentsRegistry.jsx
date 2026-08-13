import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRegisteredStudents } from "../../../Features/Admin_Features/AdminSlice";
import {
  FaChevronRight,
  FaPlus,
  FaUserTag,
  FaFolderOpen,
} from "react-icons/fa";
import { SchoolStudentPanel } from "../../../Components/SchoolAdmin/SchoolStudentPanel";
import { GetProcessedStudents } from "../../../Features/School_Features/SchoolSlice";
import toast from "react-hot-toast";


export function StudentRegistryPage() {
  const dispatch = useDispatch();
  const [listofStudents, setListOfStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStudent, setActiveStudent] = useState(null);
  const [openModal, setOpenMoal] = useState(false);

  useEffect(() => {
    const id = toast.loading("Fetching All Students");
    dispatch(getRegisteredStudents())
      .unwrap()
      .then((res) => {
        toast.success("Fetched All Students Succesfully", {id})
        if (res) setListOfStudents(res);
      }).catch((e)=>toast.error("Fetching Students Failed", {id}));
  }, []);


  const showDetailModal = (school_id, student_id) => {
    
    dispatch(GetProcessedStudents({ school_id: school_id, status: "verified" }))
      .unwrap()
      .then((res) => {
        if (res) {
          let studentData = res.filter((each) => each.student_id == student_id)
          setActiveStudent(studentData?.[0]);
          setOpenMoal(true);
        }
      });
  };

  const statusColor = (status) => {
    if (status === "active")
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-green-100 text-green-700";
    if (status === "pending")
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-yellow-100 text-yellow-700";
    return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-red-100 text-red-700";
  };

  return (
    <div className="fade-in px-6 py-6 relative min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            All Students in the System
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Overview of all students in the system.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-56 pl-3 pr-3 py-1.5 text-[11px] rounded-full bg-slate-50 outline-none"
            />
          </div>

          {/* Add Student Button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700">
            <FaPlus /> Add Student
          </button>
        </div>
      </div>

      {/* Status Key */}
      <div className="hidden md:flex items-center gap-3 text-[11px] bg-white border border-slate-200 rounded-full px-4 py-1 shadow-sm mb-4">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-400 rounded-full" /> Pending
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full" /> Approved
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full" /> Rejected
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-3 text-center">Name</th>
              <th className="px-6 py-3 text-center">ID</th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">School Id</th>
              <th className="px-6 py-3 text-center">School Verified</th>
              <th className="px-6 py-3 text-center">Registered On</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {listofStudents.length > 0 ? (
              listofStudents.map((s) => (
                <tr
                  key={s.student_id}
                  className="hover:bg-slate-50 transition cursor-pointer text-center"
                  onClick={() => showDetailModal(s?.school_id, s?.student_id)}
                >
                  <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/150?img=11"
                      className="w-8 h-8 rounded-full"
                      alt=""
                    />
                    {s.first_name + " " + s.last_name}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                    {s.student_id}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {s.student_email}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{s.school_id}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize ${
                        s.school_verified === "verified"
                          ? "bg-green-100 text-green-700"
                          : s.school_verified === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {s.school_verified}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{s.created_at}</td>
                  <td className="px-6 py-4">
                    <span className={statusColor(s.status)}>{s.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <FaChevronRight className="w-4 h-4 text-slate-300" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-slate-400 text-sm"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openModal && (
        <SchoolStudentPanel
          open={openModal}
          student={activeStudent}
          onClose={() => setOpenMoal(false)}
        />
      )}
      {/* Details Panel */}
      {false && (
        <div
          className="
            fixed inset-y-0 right-0 w-[40%] bg-white border-l border-slate-200
            shadow-xl z-50 flex flex-col animate-slideInLeft
          "
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=12"
                className="w-12 h-12 rounded-full border shadow-sm"
                alt=""
              />
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {activeStudent?.first_name} {activeStudent?.last_name}
                </h2>
                <p className="text-[11px] text-slate-500 font-mono">
                  {activeStudent?.slug}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <section>
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase text-slate-400 mb-3">
                <FaUserTag className="text-slate-400" /> Bio Data
              </h3>
              <div className="border border-slate-200 rounded-xl divide-y text-sm">
                {[
                  [
                    "Full Name",
                    `${activeStudent?.first_name} ${activeStudent?.last_name}`,
                  ],
                  ["Nationality", activeStudent?.citizenship],
                  ["Email", activeStudent?.email],
                  ["School Verified", activeStudent?.school_verified],
                  ["Status", activeStudent?.status],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between px-4 py-3">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-bold text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
