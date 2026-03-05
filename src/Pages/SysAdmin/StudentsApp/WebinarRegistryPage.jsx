import { useState } from "react";
import {
  FaPlus,
  FaVideo,
  FaMicrophone,
  FaGlobe,
  FaFlag,
  FaSchool,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

const initialMockEvents = [
  {
    id: 101,
    title: "Ivy League Strategy Session",
    speaker: "Dr. Emily Stone",
    platform: "Zoom",
    date: "2026-02-15",
    time: "14:00",
    targetType: "global",
    targetValue: "All Students",
    registered: 450,
  },
  {
    id: 102,
    title: "Visa Application Workshop",
    speaker: "Consulate Officer",
    platform: "Teams",
    date: "2026-02-20",
    time: "10:00",
    targetType: "country",
    targetValue: "Malawi",
    registered: 85,
  },
];

export function WebinarRegistryPage() {
  const [list, setList] = useState(initialMockEvents);
  const [searchTerm, setSearchTerm] = useState("");

  const [openFormModal, setOpenFormModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTarget, setCurrentTarget] = useState("global");

  const [activeWebinar, setActiveWebinar] = useState({
    id: "",
    title: "",
    speaker: "",
    platform: "Zoom",
    date: "",
    time: "",
    targetType: "global",
    targetValue: "All Students",
    registered: 0,
  });

  const today = new Date().toISOString().split("T")[0];

  const openAddModal = () => {
    const todayDate = new Date().toISOString().split("T")[0];
    setIsEdit(false);
    setCurrentTarget("global");
    setActiveWebinar({
      id: "",
      title: "",
      speaker: "",
      platform: "Zoom",
      date: todayDate,
      time: "",
      targetType: "global",
      targetValue: "All Students",
      registered: 0,
    });
    setOpenFormModal(true);
  };

  const openEditModal = (webinar) => {
    setIsEdit(true);
    setCurrentTarget(webinar.targetType || "global");
    setActiveWebinar(webinar);
    setOpenFormModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to cancel this webinar?")) {
      setList((prev) => prev.filter((w) => w.id !== id));
    }
  };

  const handleTargetChange = (type) => {
    setCurrentTarget(type);
    let defaultVal = "All Students";
    if (type === "country") defaultVal = "Malawi";
    if (type === "school") defaultVal = "Kamuzu Academy (Malawi)";
    setActiveWebinar((prev) => ({
      ...prev,
      targetType: type,
      targetValue: prev.targetType === type ? prev.targetValue : defaultVal,
    }));
  };

  const handleChange = (field, value) => {
    setActiveWebinar((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit && activeWebinar.id) {
      setList((prev) =>
        prev.map((w) => (w.id === activeWebinar.id ? activeWebinar : w))
      );
    } else {
      const newWebinar = {
        ...activeWebinar,
        id: Date.now(),
      };
      setList((prev) => [newWebinar, ...prev]);
    }
    setOpenFormModal(false);
  };

  const filteredList = list.filter((w) =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 py-6 min-h-screen fade-in relative bg-slate-50">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <FaVideo />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Webinars Registry
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Schedule and manage upcoming webinars
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
            <input
              placeholder="Search webinar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-56 px-3 py-1.5 text-[11px] rounded-full bg-slate-50 outline-none"
            />
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
          >
            <FaPlus /> Schedule Webinar
          </button>
        </div>
      </div>

      {/* STATUS LEGEND */}
      <div className="hidden md:flex items-center gap-3 text-[11px] bg-white border border-slate-200 rounded-full px-4 py-1 shadow-sm mb-4">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full" /> Scheduled
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full" /> Live Today
        </span>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-3 text-center">Title</th>
              <th className="px-6 py-3 text-center">Speaker</th>
              <th className="px-6 py-3 text-center">Date</th>
              <th className="px-6 py-3 text-center">Time</th>
              <th className="px-6 py-3 text-center">Platform</th>
              <th className="px-6 py-3 text-center">Target</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Registrations</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredList.length > 0 ? (
              filteredList.map((w) => {
                const isToday = w.date === today;
                const TargetIcon =
                  w.targetType === "country"
                    ? FaFlag
                    : w.targetType === "school"
                    ? FaSchool
                    : FaGlobe;
                const targetClass =
                  w.targetType === "country"
                    ? "bg-orange-100 text-orange-700"
                    : w.targetType === "school"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-slate-100 text-slate-600";

                return (
                  <tr
                    key={w.id}
                    className="hover:bg-slate-50 cursor-pointer transition text-center"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {w.title}
                    </td>

                    <td className="px-6 py-4 text-slate-500 flex items-center justify-center gap-1">
                      <FaMicrophone className="text-slate-400" />
                      {w.speaker}
                    </td>

                    <td className="px-6 py-4 text-slate-500">{w.date}</td>
                    <td className="px-6 py-4 text-slate-500">{w.time}</td>

                    <td className="px-6 py-4 text-slate-500 flex items-center justify-center gap-1">
                      <FaVideo className="text-indigo-500" />
                      {w.platform}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${targetClass}`}
                      >
                        <TargetIcon />
                        {w.targetValue}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                          isToday
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {isToday ? "Live Today" : "Scheduled"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {w.registered ?? 0}
                    </td>

                    <td className="px-6 py-4 text-right flex gap-2 justify-center">
                      <FaEdit
                        className="text-blue-500 cursor-pointer"
                        onClick={() => openEditModal(w)}
                      />
                      <FaTrash
                        onClick={() => handleDelete(w.id)}
                        className="text-red-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-8 text-center text-slate-400 text-sm"
                >
                  No webinars found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {openFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {isEdit ? "Edit Webinar" : "Schedule Webinar"}
                </h2>
                <p className="text-xs text-slate-500">
                  Configure details and target audience.
                </p>
              </div>
              <button
                onClick={() => setOpenFormModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-500"
              >
                <FaTimes />
              </button>
            </div>

            {/* MODAL BODY */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
              {/* Event Basics */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                  Event Basics
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Webinar Title
                  </label>
                  <input
                    type="text"
                    required
                    value={activeWebinar.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="e.g. Ivy League Admissions 101"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Speaker
                    </label>
                    <input
                      type="text"
                      required
                      value={activeWebinar.speaker}
                      onChange={(e) => handleChange("speaker", e.target.value)}
                      placeholder="Dr. Smith"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Platform
                    </label>
                    <select
                      value={activeWebinar.platform}
                      onChange={(e) => handleChange("platform", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option>Zoom</option>
                      <option>Google Meet</option>
                      <option>Teams</option>
                      <option>Youtube Live</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={activeWebinar.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Time (Local)
                    </label>
                    <input
                      type="time"
                      required
                      value={activeWebinar.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Audience Targeting */}
              <div className="space-y-4 pt-2">
                <h3 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest border-b border-indigo-100 pb-2 flex items-center gap-2">
                  <FaGlobe /> Audience Targeting
                </h3>

                <div className="bg-indigo-50 p-1 rounded-xl flex">
                  <button
                    type="button"
                    onClick={() => handleTargetChange("global")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                      currentTarget === "global"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:bg-white/50"
                    }`}
                  >
                    Global
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTargetChange("country")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                      currentTarget === "country"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:bg-white/50"
                    }`}
                  >
                    Country
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTargetChange("school")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                      currentTarget === "school"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:bg-white/50"
                    }`}
                  >
                    School
                  </button>
                </div>

                {currentTarget === "global" && (
                  <div className="text-xs text-slate-500 text-center italic py-2 flex flex-col items-center">
                    <FaGlobe className="text-2xl mb-2 text-indigo-200" />
                    Visible to all 120,000+ students worldwide.
                  </div>
                )}

                {currentTarget === "country" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Select Country
                    </label>
                    <select
                      value={activeWebinar.targetValue}
                      onChange={(e) =>
                        handleChange("targetValue", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none"
                    >
                      <option>Malawi</option>
                      <option>South Africa</option>
                      <option>Kenya</option>
                      <option>Nigeria</option>
                      <option>China</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                )}

                {currentTarget === "school" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Select Partner School
                    </label>
                    <select
                      value={activeWebinar.targetValue}
                      onChange={(e) =>
                        handleChange("targetValue", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none"
                    >
                      <option>Kamuzu Academy (Malawi)</option>
                      <option>Bishop Mackenzie (Malawi)</option>
                      <option>St. Andrews Int. (Malawi)</option>
                      <option>Eton College (UK)</option>
                      <option>Hilton College (SA)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* FOOTER */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenFormModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/30"
                >
                  {isEdit ? "Save Changes" : "Publish Webinar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
