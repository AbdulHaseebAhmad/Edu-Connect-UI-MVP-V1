import { useEffect, useState } from "react";
import { FaPlus, FaChevronRight, FaEdit, FaTrash, FaBell } from "react-icons/fa";
import { ScholarshipAddModal } from "../../../Components/SysAdmin/ScholarshipAddModal";
import { useDispatch } from "react-redux";
import { DeleteScholarship, FetchScholarships } from "../../../Features/Admin_Features/AdminSlice";
import ScholarshipDetailsModal from "../../../Components/studentAppPortal/ScholarshipDetailModal";

export function ScholarshipRegistryPage() {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [activeScholarship, setActiveScholarship] = useState({
    title: "",
    country: "",
    region: "",
    level: "",
    funding: "",
    status: "Upcoming",
    opens: "",
    deadline: "",
    description: "",
    link: "",
    requirements: "",
  });

  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEdit,setIsEdit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchScholarships())
      .unwrap()
      .then((res) => setList(res || []))
      .catch(() => setList([]));
  }, [dispatch]);

  const openDetail = (scholarship) => {
    setActiveScholarship(scholarship);
    setOpenDetailModal(true);
  };

  const filteredList = list.filter((s) =>
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const deleteScholarship = (scholarship_id) => {
    dispatch(DeleteScholarship(scholarship_id)).unwrap().then((res)=>{
      if (res){
        dispatch(FetchScholarships())
      .unwrap()
      .then((res) => setList(res || []))
      .catch(() => setList([]));
      }
    })
  }

  const sendRemindersToStudent = (scholarship_id) => {

  }
  return (
    <div className="px-6 py-6 min-h-screen fade-in relative">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Scholarships Registry
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage all scholarship opportunities
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
            <input
              placeholder="Search scholarship..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-56 px-3 py-1.5 text-[11px] rounded-full bg-slate-50 outline-none"
            />
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => setOpenAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
          >
            <FaPlus /> Add Scholarship
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3 text-[11px] bg-white border border-slate-200 rounded-full px-4 py-1 shadow-sm mb-4">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-400 rounded-full" /> Upcoming
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full" /> Open
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full" /> Closed
        </span>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-3 text-center">Title</th>
              <th className="px-6 py-3 text-center">Country</th>
              <th className="px-6 py-3 text-center">Level</th>
              <th className="px-6 py-3 text-center">Funding</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredList.length > 0 ? (
              filteredList.map((s) => (
                <tr
                  key={s.scholarship_id}
                  className="hover:bg-slate-50 cursor-pointer transition text-center z-20"
                >
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {s.title}
                  </td>

                  <td className="px-6 py-4 text-slate-500">{s.country}</td>
                  <td className="px-6 py-4 text-slate-500">{s.level}</td>

                  <td className="px-6 py-4 text-slate-500">{s.funding}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                        s.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : s.status === "Upcoming"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex gap-2 justify-center z-50">
                    <FaEdit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {
                        setActiveScholarship(s);
                        setIsEdit(true);
                        setOpenAddModal(true);
                      }}
                    />
                    <FaTrash onClick={()=>deleteScholarship(s.scholarship_id)} className="text-red-500 cursor-pointer" />
                  <FaBell className="w-4 h-4 text-yellow-400" onClick={()=>sendRemindersToStudent(s.scholarship_id)} />
                  </td>
                  
                  <td
                    className="px-6 py-4 text-right"
                    onClick={() => openDetail(s)}
                  >
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
                  No scholarships found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL */}
      {openDetailModal && activeScholarship && (
        <ScholarshipDetailsModal
          open={openDetailModal}
          scholarship={activeScholarship}
          onClose={() => {setIsEdit(false);setActiveScholarship({});setOpenDetailModal(false)}}
          isadmin={true}
        />
      )}

      {/* ADD MODAL */}
      {openAddModal && (
        <ScholarshipAddModal
          open={openAddModal}
          onClose={() => {setIsEdit(false);setActiveScholarship({});setOpenAddModal(false)}}
          scholarship={activeScholarship}
          isEdit={isEdit}
        />
      )}
    </div>
  );
}
