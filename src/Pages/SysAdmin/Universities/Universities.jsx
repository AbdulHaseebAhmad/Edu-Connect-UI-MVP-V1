import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FetchUniversities } from "../../../Features/Admin_Features/adminSlice";
import { FaChevronRight, FaPlus } from "react-icons/fa";
import UniProfile from "../../../Components/SysAdmin/UniProfile";
import AddUniversityModal from "../../../Components/SysAdmin/AddUniversityPortal";
import * as XLSX from "xlsx";
import { ConfirmUniversityUploadModal } from "../../../Components/SysAdmin/ConfirmUniversityUploadModal";

export function UniversityRegistryPage() {
  const dispatch = useDispatch();
  const [listOfUniversities, setListOfUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openPortal, setOpenPortal] = useState(false);
  const [activeUniversity, setActiveUniversity] = useState(null);
  const [showUniHandle, setShowUniHandle] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState({ fileName: "", fileData: [] });

  const inputfileRef = useRef();

  useEffect(() => {
    dispatch(FetchUniversities())
      .unwrap()
      .then((res) => {
        if (res) setListOfUniversities(res);
      });
  }, [dispatch]);

  const filteredUniversities = listOfUniversities.filter(
    (uni) =>
      uni.university_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.university_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showUniversityPortal = (uni) => {
    setActiveUniversity(uni);
    setOpenPortal(true);
  };

  const closeUniversityPortal = () => {
    setOpenPortal(false);
    setTimeout(() => setActiveUniversity(null), 250);
  };

  const addUniversityHandle = () => {
    setShowUniHandle(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
      const buffer = event.target.result;

      const workbook = XLSX.read(buffer, { type: "buffer" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setFile({ fileName: file.name, fileData: parsedData });
      setShowUploadModal(true);
    };
  };

  return (
    <div className="fade-in px-6 py-6 relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            All Universities
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Overview of all registered universities in the system.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
            <input
              type="text"
              placeholder="Search by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-56 pl-3 pr-3 py-1.5 text-[11px] rounded-full bg-slate-50 outline-none"
            />
          </div>
          <input
            type="file"
            ref={inputfileRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <button
            onClick={() => inputfileRef.current.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
          >
            <FaPlus /> Bulk University Upload
          </button>
          <button
            onClick={addUniversityHandle}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
          >
            <FaPlus /> Add University
          </button>
        </div>
      </div>

      {/* Status Key */}
      <div className="hidden md:flex items-center gap-3 text-[11px] bg-white border border-slate-200 rounded-full px-4 py-1 shadow-sm mb-4 w-fit">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full" /> Universities
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-slate-400 rounded-full" /> Registry
        </span>
      </div>

      {showUniHandle && (
        <AddUniversityModal
          isOpen={showUniHandle}
          onClose={() => setShowUniHandle(false)}
        />
      )}

      {showUploadModal && (
        <ConfirmUniversityUploadModal
          file={file}
          onCancel={() => setShowUploadModal(false)}
        />
      )}
      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-3 text-start">University Name</th>
              <th className="px-6 py-3 text-start">University ID</th>
              <th className="px-6 py-3 text-start">QS Ranking</th>
              <th className="px-6 py-3 text-start">Country</th>
              <th className="px-6 py-3 text-start"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((uni) => (
                <tr
                  key={uni.university_id}
                  className="hover:bg-slate-50 transition cursor-pointer text-start"
                  onClick={() => showUniversityPortal(uni)}
                >
                  <td className="px-6 py-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <img
                        src={uni?.university_image}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        alt={uni?.university_name}
                      />
                      <span>{uni.university_name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                    {uni.university_id}
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {uni.qs_ranking || "n/a"}
                  </td>

                  <td className="px-6 py-4 text-slate-500">
                    {uni.university_country || "n/a"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <FaChevronRight className="w-4 h-4 text-slate-300 ml-auto" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-slate-400 text-sm"
                >
                  No universities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-[1px] z-40 transition-all duration-300 ${
          openPortal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeUniversityPortal}
      />

      {/* Left Slide Portal */}
      <UniProfile
        openPortal={openPortal}
        // activeUniversity={activeUniversity}
        universityId={activeUniversity?.university_id}
        closeUniversityPortal={closeUniversityPortal}
      />
    </div>
  );
}
