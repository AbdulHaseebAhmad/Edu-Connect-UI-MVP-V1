import {
  FaGraduationCap,
  FaUniversity,
  FaInfoCircle,
  FaBriefcase,
  FaHeart,
  FaCheckCircle,
  FaSearch,
  FaFileAlt,
  FaBook,
  FaArrowLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { GetProgramsList } from "../../Features/Students_Features/StudentAppSlice";
import { useEffect, useState } from "react";

export default function StdPrograms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [programsList, setProgramsList] = useState();
  const { university_id } = useParams();

  const fetchPrograms = (universityCode) => {
    console.log(universityCode);
    dispatch(GetProgramsList(universityCode))
      .unwrap()
      .then((res) => {
        if (res) {
          setProgramsList(res || []);
        }
      });
  };

    useEffect(() => {
      fetchPrograms(university_id);
    }, [university_id]);

  return (
    <div id="dd-lvl-3" className="space-y-6">
      <button
        onClick={() => navLevel(2)}
        className="mb-6 text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 bg-white px-3 py-2 rounded-lg border shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-200"
      >
        <FaArrowLeft className="w-4 h-4" />
        Back to Universities
      </button>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg mb-6">
        <div className="h-48 bg-slate-800 relative">
          <img
            // src={selectedUni?.university_image}
            className="w-full h-full object-cover opacity-70"
            // alt={selectedUni?.university_image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-3xl font-bold mb-1 drop-shadow-2xl">
              {/* {selectedUni?.university_name} */}
            </h1>
            <p className="text-blue-300 text-lg font-medium drop-shadow-lg">
              {programsList?.length} World-Class Programs
            </p>
          </div>
        </div>
        <div className="p-8">
          <h3 className="font-bold text-lg mb-6 text-slate-900 flex items-center gap-3">
            <FaBook className="text-blue-600" />
            Available Programs
          </h3>
          <div className="grid gap-4" id="prog-grid">
            {programsList?.length > 0 &&
              programsList?.map((prog) => (
                <div
                  key={prog.program_code}
                  onClick={() => navigate(`programs/${prog.program_id}`)}
                  className="group flex justify-between items-center p-5 border border-slate-100 rounded-xl hover:bg-slate-50 hover:border-blue-200 hover:shadow-md cursor-pointer transition-all duration-300"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {prog.program_name}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      {prog.program_duration} • {prog.session_intake}
                    </p>
                    <p className="text-base font-bold text-emerald-600 mt-1">
                      {prog.program_fee}/year
                    </p>
                  </div>
                  <FaChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
