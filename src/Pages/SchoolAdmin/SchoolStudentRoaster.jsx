import  { useEffect, useState } from "react";
import { SchoolStudentPanel } from "../../Components/SchoolAdmin/SchoolStudentPanel";
import { FaBan, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetProcessedStudents } from "../../Features/School_Features/SchoolSlice";

export function SchoolStudentRoaster() {
  const [studentPanelOpen, setStudentPanelOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filter, setFilter] = useState("verified");
  const [searchTerm, setSearchTerm] = useState("");
  const [studentsList, setStudents] = useState([]);

  const school_id = useSelector((state) => state.authReducer.user_id);
  const dispatch = useDispatch();


  const openStudentPanel = (student) => {
    setSelectedStudent(student);
    setStudentPanelOpen(true);
  };

  useEffect(() => {
    dispatch(GetProcessedStudents({school_id, status:filter}))
      .unwrap()
      .then((res) => {
        setStudents(res);
        
      });
  }, [filter]);

   const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("");
  };
  return (
    <>
      <div className="fade-in space-y-6">
        {/* Info banner */}
        {/* Filter and search bar */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("verified")}
              className={`px-4 py-2 text-xs font-bold rounded-lg shadow-md ${
                filter === "verified"
                  ? "bg-slate-800 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Active Students{" "}
            </button>{" "}
            <button
              onClick={() => setFilter("enrolled")}
              className={`px-4 py-2 text-xs font-bold rounded-lg ${
                filter === "enrolled"
                  ? "bg-slate-800 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Enrolled Alumni
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`px-2 py-2 text-xs font-bold rounded-lg gap-1 flex items-center ${
                filter === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-white border border-red-200 text-red-600 hover:bg-red-50"
              }`}
            >
              <FaBan className="mr-1" />
              Rejected Archives
            </button>
          </div>
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-3 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold outline-none"
            />
          </div>
        </div>

        {/* Verification table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Grad Year</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {studentsList?.length > 0 && studentsList.map((student,index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50 border-b border-slate-50 cursor-pointer"
                >
                  <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                       {student.img ? (
                      <img
                        src={student.img}
                        alt={student.name}
                        className="w-full h-full rounded-2xl object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.currentTarget.innerHTML = getInitials(student.first_name);
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl border border-slate-200 shadow-sm">
                        {getInitials(student.first_name)}
                      </div>
                    )}
                                        {student?.first_name}

                  </td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">{student.graduation_year}</td>
                  <td className="px-6 py-4">
                    <span className="status-badge status-pending">
                      {student.status || filter}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        className="px-4 py-1.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg hover:bg-orange-100 border border-orange-200"
                        onClick={() => openStudentPanel(student)}
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Panel */}
      {studentPanelOpen && selectedStudent && (
        <SchoolStudentPanel
          student={selectedStudent}
          open={studentPanelOpen}
          onClose={() => setStudentPanelOpen(false)}
        />
      )}
    </>
  );
}
