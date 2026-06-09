import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaTimes,
  FaUniversity,
  FaImage,
  FaSave,
  FaPen,
  FaPlus,
  FaTrash,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaHashtag,
  FaCalendarAlt,
  FaUserGraduate,
  FaChartLine,
  FaLink,
  FaBuilding,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import {
  GetProgramsList,
  GetUniversityProfiile,
} from "../../Features/University_Features/UniversityAppSlice";
import { ConfirmProgramUploadModal } from "./ConfirmProgramUploadModal";
import { hexToString } from "../../Utillities/helpFunctions";

const defaultForm = {
  university_name: "",
  university_id: "",
  university_admission_email: "",
  university_website: "",
  university_city: "",
  universitycountry: "",
  university_address: "",
  about_university: "",
  founded_date: "",
  type: "",
  calendar: "",
  students_count: "",
  acceptance_rate: "",
  graduation_rate: "",
  employability: "",
  qs_ranking: "",
  theworldranking: "",
  universitylogo: "",
  uniprofileimage: "",
  facebooklink: "",
  university_instagram: "",
  university_linkedin: "",
  university_x: "",
  university_youtube: "",
  Programs: [],
  Media: [],
};

export default function UniversityProfilePortal({
  openPortal,
  closeUniversityPortal,
  activeUniversity,
  universityId,
  onSave,
  saving = false,
}) {
  const [activeTab, setActiveTab] = useState("data");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState({ fileName: "", fileData: [] });

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!universityId) return;

    const fetchData = async () => {
      try {
        const universityData = await dispatch(
          GetUniversityProfiile(universityId),
        ).unwrap();

        const programs = await dispatch(GetProgramsList(universityId)).unwrap();

        setFormData({
          ...universityData,
          Programs: programs || [],
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [universityId, dispatch]);

  useEffect(() => {
    if (formData) {
      // console.log(formData);
    }
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProgramChange = (index, value) => {
    const updated = [...formData.Programs];
    updated[index] = value;
    setFormData((prev) => ({
      ...prev,
      Programs: updated,
    }));
  };

  const addProgram = () => {
    setFormData((prev) => ({
      ...prev,
      Programs: [...prev.Programs, ""],
    }));
  };

  const removeProgram = (index) => {
    setFormData((prev) => ({
      ...prev,
      Programs: prev.Programs.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    if (onSave) console.log(formData);
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
      // console.log(parsedData);

      // setData(parsedData);
    };
  };
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeUniversityPortal}
        className={`relative fixed inset-0 bg-slate-900/20 backdrop-blur-[1px] z-40 transition-all duration-300 ${
          openPortal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {showUploadModal && (
        <div className="absolute left-0 ">
          <ConfirmProgramUploadModal
            file={file}
            onCancel={() => setShowUploadModal(false)}
          />
        </div>
      )}
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[440px] lg:w-[520px] bg-white border-r border-slate-200 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          openPortal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white overflow-hidden flex items-center justify-center">
                  {formData.uniprofileimage ? (
                    <img
                      src={formData.uniprofileimage}
                      alt={formData.university_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUniversity className="text-slate-400 text-lg" />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-slate-900 truncate">
                    {formData.university_name || "University Profile"}
                  </h2>
                  <p className="text-[11px] text-slate-500 font-mono mt-1">
                    {formData.university_id || "N/A"}
                  </p>
                </div>
              </div>

              <button
                onClick={closeUniversityPortal}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setEditMode((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                  editMode
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <FaPen className="text-[11px]" />
                {editMode ? "Editing Enabled" : "Enable Editing"}
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                <FaSave className="text-[11px]" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-4 flex items-center gap-2 border-b border-slate-200">
              <button
                onClick={() => setActiveTab("data")}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition ${
                  activeTab === "data"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Data
              </button>

              <button
                onClick={() => setActiveTab("media")}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition ${
                  activeTab === "media"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Media
              </button>

              <button
                onClick={() => setActiveTab("programs")}
                className={`px-4 py-2 text-xs font-bold border-b-2 transition ${
                  activeTab === "programs"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                Programs
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            {activeTab === "data" && (
              <>
                <Section title="Basic Information" icon={<FaBuilding />}>
                  <div className="grid grid-cols-1 gap-4">
                    <Field
                      label="University Name"
                      value={formData.university_name}
                      onChange={(e) =>
                        handleChange("university_name", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="University ID"
                      value={formData.university_id}
                      onChange={(e) =>
                        handleChange("university_id", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="Type"
                      value={formData.type}
                      onChange={(e) => handleChange("type", e.target.value)}
                      disabled={!editMode}
                    />
                    <Field
                      label="Founded Date"
                      value={formData.founded_date}
                      onChange={(e) =>
                        handleChange("founded_date", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="Academic Calendar"
                      value={formData.calendar}
                      onChange={(e) => handleChange("calendar", e.target.value)}
                      disabled={!editMode}
                    />
                  </div>
                </Section>

                <Section title="Contact Details" icon={<FaEnvelope />}>
                  <div className="grid grid-cols-1 gap-4">
                    <Field
                      label="Email"
                      value={formData.university_admission_email}
                      onChange={(e) =>
                        handleChange(
                          "university_admission_email",
                          e.target.value,
                        )
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="Website"
                      value={formData.university_website}
                      onChange={(e) =>
                        handleChange("university_website", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="City"
                      value={formData.university_city}
                      onChange={(e) =>
                        handleChange("university_city", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="Country"
                      value={formData.universitycountry}
                      onChange={(e) =>
                        handleChange("universitycountry", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="Address"
                      value={formData.university_address}
                      onChange={(e) =>
                        handleChange("university_address", e.target.value)
                      }
                      disabled={!editMode}
                    />
                  </div>
                </Section>

                <Section title="About University" icon={<FaUniversity />}>
                  <TextAreaField
                    label="Description"
                    value={formData.about_university}
                    onChange={(e) =>
                      handleChange("about_university", e.target.value)
                    }
                    disabled={!editMode}
                    rows={6}
                  />
                </Section>

                <Section title="Statistics & Rankings" icon={<FaChartLine />}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      label="Students Count"
                      value={formData.students_count}
                      onChange={(e) =>
                        handleChange("students_count", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="Acceptance Rate"
                      value={formData.acceptance_rate}
                      onChange={(e) =>
                        handleChange("acceptance_rate", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="Graduation Rate"
                      value={formData.graduation_rate}
                      onChange={(e) =>
                        handleChange("graduation_rate", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="Employability"
                      value={formData.employability}
                      onChange={(e) =>
                        handleChange("employability", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="QS Ranking"
                      value={formData.qs_ranking}
                      onChange={(e) =>
                        handleChange("qs_ranking", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="World Ranking"
                      value={formData.theworldranking}
                      onChange={(e) =>
                        handleChange("theworldranking", e.target.value)
                      }
                      disabled={!editMode}
                    />
                  </div>
                </Section>

                <Section title="Social Links" icon={<FaLink />}>
                  <div className="grid grid-cols-1 gap-4">
                    <Field
                      label="Facebook"
                      value={formData.facebooklink}
                      onChange={(e) =>
                        handleChange("facebooklink", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="Instagram"
                      value={formData.university_instagram}
                      onChange={(e) =>
                        handleChange("university_instagram", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="LinkedIn"
                      value={formData.university_linkedin}
                      onChange={(e) =>
                        handleChange("university_linkedin", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="Twitter / X"
                      value={formData.university_x}
                      onChange={(e) =>
                        handleChange("university_x", e.target.value)
                      }
                      disabled={!editMode}
                    />
                    <Field
                      label="YouTube Video"
                      value={formData.university_youtube}
                      onChange={(e) =>
                        handleChange("university_youtube", e.target.value)
                      }
                      disabled={!editMode}
                    />
                  </div>
                </Section>
              </>
            )}

            {activeTab === "media" && (
              <>
                {/* <Section title="Primary Media" icon={<FaImage />}>
                  {/* <div className="space-y-4">
                    <MediaInputCard
                      label="University Logo"
                      value={formData.universitylogo}
                      preview={formData.universitylogo}
                      onChange={(e) =>
                        handleChange("universitylogo", e.target.value)
                      }
                      disabled={!editMode}
                    /> 

                    <MediaInputCard
                      label="Profile Image"
                      value={formData.uniprofileimage}
                      preview={formData.uniprofileimage}
                      onChange={(e) =>
                        handleChange("uniprofileimage", e.target.value)
                      }
                      disabled={!editMode}
                    />
                  </div>
                </Section> */}

                <Section title="All Media" icon={<FaImage />}>
                  {formData?.Media?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {formData?.Media?.map((item, index) => {
                        return (
                          <div
                            key={item?.id || index}
                            className="rounded-2xl border border-slate-200 overflow-hidden bg-white"
                          >
                            <div className="h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
                              {item?.media ? (
                                <div className="flex flex-col items-start justify-start gap-4 ">
                                  <p className="">{item?.media_file_name}</p>
                                  <img
                                    src={hexToString(item?.media)}
                                    alt={item?.media_tag_name}
                                    className="w-full h-full  object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="text-slate-400 text-sm">
                                  No preview available
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-400">
                      No media found
                    </div>
                  )}
                </Section>
              </>
            )}

            {activeTab === "programs" && (
              <>
                <Section title="Programs" icon={<FaUserGraduate />}>
                  <div className="space-y-3">
                    {formData.Programs?.length > 0 ? (
                      formData.Programs.map((program, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={program?.program_name}
                            onChange={(e) =>
                              handleProgramChange(index, e.target.value)
                            }
                            disabled={!editMode}
                            placeholder={`Program ${index + 1}`}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:text-slate-500"
                          />
                          {editMode && (
                            <button
                              type="button"
                              onClick={() => removeProgram(program?.program_id)}
                              className="w-10 h-10 rounded-xl border border-red-200 bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-400">
                        No Programs added yet
                      </div>
                    )}

                    {editMode && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
                      >
                        <FaPlus className="text-[10px]" />
                        Add Programs
                        <input
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileUpload}
                          label="Add Programs"
                        />
                      </button>
                    )}
                  </div>
                </Section>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Section({ title, icon, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <span className="text-slate-400 text-xs">{icon}</span>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {title}
        </h3>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange, disabled = false }) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:text-slate-500"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, disabled = false, rows = 5 }) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none resize-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:text-slate-500"
      />
    </div>
  );
}

function MediaInputCard({ label, value, preview, onChange, disabled }) {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
      <div className="h-44 bg-slate-100 overflow-hidden flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-slate-400 text-sm">No preview</div>
        )}
      </div>
      <div className="p-4">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          {label}
        </label>
        <input
          type="text"
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          placeholder={`Paste ${label.toLowerCase()} URL`}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-100 disabled:text-slate-500"
        />
      </div>
    </div>
  );
}
