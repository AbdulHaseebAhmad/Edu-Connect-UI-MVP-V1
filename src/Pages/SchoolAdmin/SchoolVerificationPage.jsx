import React, { useEffect, useState } from "react";
import { SchoolStudentPanel } from "../../Components/SchoolAdmin/SchoolStudentPanel";
import { FaShieldAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetUnProcessedStudents, VerifyStudentAccount } from "../../Features/School_Features/SchoolSlice";

export function SchoolVerificationPage() {
  const [studentPanelOpen, setStudentPanelOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [unverifiedStudents, setUnverifiedStudents] = useState([]);

  const school_id = useSelector((state) => state.authReducer.user_id);
  const dispatch = useDispatch();

  const verificationHandle = (school_id, student_id, status) => {
    dispatch(VerifyStudentAccount({school_id,student_id,status})).unwrap().then((res)=>{
      if(res){
        setUnverifiedStudents((prev)=>prev.filter((each)=> each?.student_id !== student_id))
      }
    })
  };
  const openStudentPanel = (student) => {
    setSelectedStudent(student);
    setStudentPanelOpen(true);
  };

  useEffect(() => {
    dispatch(GetUnProcessedStudents(school_id))
      .unwrap()
      .then((res) => {
        if (res) {
          setUnverifiedStudents(res);
        }
      });
  }, []);

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
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3 px-4">
          <FaShieldAlt className="text-orange-500 mt-0.5 text-lg" />
          <div>
            <h3 className="text-sm font-bold text-orange-800">
              Gatekeeper Protocol
            </h3>
            <p className="text-xs text-orange-700 mt-1">
              You are responsible for verifying student identity and academic
              standing. Only verified students can apply to universities.
            </p>
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
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {unverifiedStudents.map((student,index) => (
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
                  <td className="px-6 py-4">{student?.graduation_year}</td>
                  <td className="px-6 py-4">
                    <span className="status-badge status-pending">pending</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        className="px-4 py-1.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg hover:bg-orange-100 border border-orange-200"
                        onClick={() => openStudentPanel(student)}
                      >
                        Review
                      </button>
                      <button
                        onClick={() =>
                          verificationHandle(
                            school_id,
                            student?.student_id,
                            "verified"
                          )
                        }
                        className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 shadow-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          verificationHandle(
                            school_id,
                            student?.student_id,
                            "rejected"
                          )
                        }
                        className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 hover:border-red-400 hover:text-red-700 shadow-sm transition-colors"
                      >
                        Reject
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
