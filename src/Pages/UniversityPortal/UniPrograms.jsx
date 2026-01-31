import { useEffect, useState } from "react";
import {
  FaPlus,
  FaBookOpen,
  FaEdit,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProgramsDetails,
  GetProgramsList,
} from "../../Features/University_Features/UniversityAppSlice";
import { ProgramModal } from "../../Components/UniversityPortal/AddNewProgram";

export function ProgramsPage() {
  const [programModalOpen, setProgramModalOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const university_id = useSelector((state) => state.authReducer.user_id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProgramsList(university_id)).unwrap().then(setPrograms);
  }, [university_id,refetch]);

  const editProgramHandle = (program_id) => {
    dispatch(GetProgramsDetails(program_id))
      .unwrap()
      .then((res) => {
        if (res) {
          setProgram(res);
          setTimeout(() => {
            setProgramModalOpen(true);
          }, 500);
        }
      });
  };

  return (
    <div className="space-y-8 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Academic Programs
          </h2>
          <p className="text-sm text-slate-500">
            Manage degrees, intakes, and availability
          </p>
        </div>

        <button
          onClick={() => {
            setProgram(null);
            setProgramModalOpen(true);
          }}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <FaPlus />
          Add Program
        </button>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {programs?.map((program) => (
          <div
            key={program.program_id}
            className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            {/* Hover Edit */}
            <button
              onClick={() => editProgramHandle(program?.program_id)}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-indigo-600"
              title="Edit Program"
            >
              <FaEdit />
            </button>

            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <FaBookOpen className="text-indigo-600 text-xl" />
                </div>

                <div className="flex-1">
                  <h3 className="truncate  max-w-[300px]  text-lg font-bold text-slate-800 leading-tight">
                    {program.program_name}
                  </h3>

                  {/* Status */}
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        program.program_status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          program.program_status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      {program.program_status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Footer */}
            <div className="p-6 pt-4 grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <FaUsers className="text-slate-400" />
                <span>
                  <strong className="text-slate-800">
                    {program.program_capacity}
                  </strong>{" "}
                  seats
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-slate-400" />
                <span>{program.session_intake}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {programModalOpen && (
        <ProgramModal
          open={programModalOpen}
          onClose={() => {
            setProgramModalOpen(false);
            setProgram(null);
          }}
          program={program}
          reFetch={()=>setRefetch(!refetch)}
        />
      )}
    </div>
  );
}
