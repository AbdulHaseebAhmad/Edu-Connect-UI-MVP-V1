import React, { useEffect, useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  GetStudentDetails,
  UpdateStudentDetails,
} from "../../Features/Students_Features/StudentAppSlice";

const profiledetails = [
  {
    name: "first_name",
    label: "First Name",
    placeHolder: "First Name",
  },
  {
    name: "middle_name",
    label: "Middle Name",
    placeHolder: "Middle Name",
  },
  {
    name: "last_name",
    label: "Last Name",
    placeHolder: "Last Name",
  },
  {
    name: "dob",
    label: "Date of Birth",
    placeHolder: "DD-MM-YY",
  },
  {
    name: "gender",
    label: "Gender",
    placeHolder: "Gender",
  },
  {
    name: "marrital_status",
    label: "Marital Status",
    placeHolder: "Marital Status",
  },
];

const citizenshipdetails = [
  { name: "nationality", label: "Nationality" ,placeHolder:"Nationality" },
  { name: "passport_number", label: "Passport Number"  ,placeHolder:"Passport Number"},
  { name: "passport_expiry", label: "Passport Expiry" ,placeHolder:"DD-MM-YY" },
  { name: "passport_issue", label: "Place of Issue" ,placeHolder:"Place of Issue" },
];

const contactDetails = [
  { label: "Email Address", name: "email" },
  { label: "Phone Number", name: "phone_number" },
  { label: "WhatsApp Number", name: "whatsapp_number" },
];

const permenantaddress = [
  { label: "Permenant Address", name: "permanent_address" },
  { label: "Street Address", name: "street_address" },
  { label: "City", name: "city" },
  { label: "State Province", name: "state_province" },
  { label: "Post Code", name: "zip_postal_code" },
];

const emergencyContact = [
  { label: "Emergency Contact Name", name: "emergency_contact_name" },
  { label: "Emergency Contact Relation", name: "emergency_relationship" },
  { label: "Emergency Contact Phone", name: "emergency_phone" },
];

const educationDetails = [
  { label: "School Name", name: "school_name" },
  { label: "Curriculum", name: "curriculum" },
  { label: "Graduation Year", name: "graduation_year" },
  { label: "Cummulative Score/Points", name: "cummulative_score" },
];

const languageSubScores = [
  { name: "language_reading", label: "Reading" },
  { name: "language_listening", label: "Listening" },
  { name: "language_writting", label: "Writing" },
  { name: "language_speaking", label: "Speaking" },
];

const prefsFields = [
  { name: "primary_career_interest", label: "Primary Career Interest" },
  { name: "degree_level", label: "Degree Level" },
  { name: "preferred_start_date", label: "Preferred Start Date" },
  { name: "annual_budget", label: "Annual Budget" },
  { name: "scholarship_interest", label: "Scholarship Interest" },
];

export default function StdProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState();
  const [updateFields, setUpdatedFields] = useState();
  const [refetch, setRefetch] = useState(false);

  const dispatch = useDispatch();

  const user_id = useSelector((state) => state.authReducer.user_id);

  const tabs = [
    { id: "personal", label: "Personal" },
    { id: "contact", label: "Contact" },
    { id: "education", label: "Education" },
    { id: "prefs", label: "Preferences" },
  ];

  useEffect(() => {
    dispatch(GetStudentDetails(user_id))
      .unwrap()
      .then((res) => {
        if (res) {
          setProfileData(res);
        }
      });
  }, [refetch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onHandleBlur = (detail_type, student_id, e) => {
    const { name, value } = e?.target;
    dispatch(
      UpdateStudentDetails({
        detail_type: detail_type,
        student_id: student_id,
        field_name: name,
        field_value: value,
      })
    )
      .unwrap()
      .then((res) => {
        if (res) {
          setRefetch(!refetch);
        }
      });
  };

  useEffect(() => {
    console.log(updateFields);
  }, [updateFields]);
  return (
    <div className="fade-in space-y-6">
      {/* Verified banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <i className="fas fa-shield-alt text-green-500 text-lg" />
            <span className="text-base font-bold text-slate-900">
              Verified Identity
            </span>
          </div>
          <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
            100% Complete
          </span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div className="bg-green-500 h-3 rounded-full w-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        </div>
      </div>

      {/* Main profile card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
        {/* Tab headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn px-8 py-4 text-sm font-medium hover:bg-white transition ${
                activeTab === tab.id
                  ? "tab-btn active border-blue-500 text-blue-600 font-bold"
                  : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-10">
          {/* PERSONAL TAB */}
          {activeTab === "personal" && (
            <div className="space-y-8">
              {/* Identity Details */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Identity Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {profiledetails?.map((eachinput, index) => {
                    const value = profileData?.[eachinput.name];
                    const isEmpty = value === "" || value == null;
                    const isDob = eachinput.name === "dob";
                    const displayValue =
                      isDob && value?.Time ? value.Time : value ?? "";
                    return (
                      <div
                        key={index}
                        className={isEmpty ? "opacity-100" : "opacity-60"}
                      >
                        <label className="field-label flex items-center gap-2">
                          {eachinput.label}
                          {isEmpty ? (
                            <FaUnlock className="text-[8px] text-blue-400 ml-1" />
                          ) : (
                            <FaLock className="text-[8px] text-slate-400 ml-1" />
                          )}
                        </label>
                        <input
                          name={eachinput?.name}
                          type="text"
                          value={
                            !isEmpty
                              ? displayValue
                              : updateFields?.[eachinput?.name]
                          }
                          disabled={!isEmpty}
                          className={
                            "w-full p-3 rounded-xl text-sm font-bold " +
                            (isEmpty
                              ? "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100 mt-2"
                              : "input-locked bg-slate-50 border-2 border-slate-300 mt-2")
                          }
                          placeholder={`Enter ${eachinput?.placeHolder}`}
                          onChange={handleInputChange}
                          onBlur={(e) => onHandleBlur("profile", user_id, e)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Citizenship */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Citizenship
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {citizenshipdetails?.map((eachinput, index) => {
                    const value = profileData?.[eachinput.name];
                    const isEmpty = value === "" || value == null;
                    const displayValue = value;
                    return (
                      <div
                        key={index}
                        className={isEmpty ? "opacity-100" : "opacity-60"}
                      >
                        <label className="field-label flex items-center gap-2">
                          {eachinput.label}
                          {isEmpty ? (
                            <FaUnlock className="text-[8px] text-blue-400 ml-1" />
                          ) : (
                            <FaLock className="text-[8px] text-slate-400 ml-1" />
                          )}
                        </label>

                        <input
                          name={eachinput?.name}
                          type="text"
                          value={
                            !isEmpty
                              ? displayValue
                              : updateFields?.[eachinput?.name]
                          }
                          disabled={!isEmpty}
                          className={
                            "w-full p-3 rounded-xl text-sm font-bold " +
                            (isEmpty
                              ? "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100 mt-2"
                              : "input-locked bg-slate-50 border-2 border-slate-300 mt-2")
                          }
                          placeholder={`Enter ${eachinput?.placeHolder}`}
                          onChange={(e) => handleInputChange(e)}
                          onBlur={(e) => onHandleBlur("profile", user_id, e)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <div className="space-y-8">
              {/* Student Contact */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Student Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contactDetails?.map((eachinput, index) => {
                    const value = profileData?.[eachinput.name];
                    const isEmpty = value === "" || value == null;
                    const displayValue = value;
                    return (
                      <div
                        key={index}
                        className={isEmpty ? "opacity-100" : "opacity-60"}
                      >
                        <label className="field-label flex items-center gap-2">
                          {eachinput.label}
                          {isEmpty ? (
                            <FaUnlock className="text-[8px] text-blue-400 ml-1" />
                          ) : (
                            <FaLock className="text-[8px] text-slate-400 ml-1" />
                          )}
                        </label>

                        <input
                          name={eachinput?.name}
                          type="text"
                          value={
                            !isEmpty
                              ? displayValue
                              : updateFields?.[eachinput?.name]
                          }
                          disabled={!isEmpty}
                          className={
                            "w-full p-3 rounded-xl text-sm font-bold " +
                            (isEmpty
                              ? "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100 mt-2"
                              : "input-locked bg-slate-50 border-2 border-slate-300 mt-2")
                          }
                          placeholder={`Enter ${eachinput?.label}`}
                          onChange={(e) => handleInputChange(e)}
                          onBlur={(e) => onHandleBlur("contact", user_id, e)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Permanent Address */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Permanent Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {permenantaddress?.map((eachinput, index) => {
                    const value = profileData?.[eachinput.name];
                    const isEmpty = value === "" || value == null;
                    const displayValue = value;
                    return (
                      <div
                        key={index}
                        className={isEmpty ? "opacity-100" : "opacity-60"}
                      >
                        <label className="field-label flex items-center gap-2">
                          {eachinput.label}
                          {isEmpty ? (
                            <FaUnlock className="text-[8px] text-blue-400 ml-1" />
                          ) : (
                            <FaLock className="text-[8px] text-slate-400 ml-1" />
                          )}
                        </label>

                        <input
                          name={eachinput?.name}
                          type="text"
                          value={
                            !isEmpty
                              ? displayValue
                              : updateFields?.[eachinput?.name]
                          }
                          disabled={!isEmpty}
                          className={
                            "w-full p-3 rounded-xl text-sm font-bold " +
                            (isEmpty
                              ? "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100 mt-2"
                              : "input-locked bg-slate-50 border-2 border-slate-300 mt-2")
                          }
                          placeholder={`Enter ${eachinput?.label}`}
                          onChange={(e) => handleInputChange(e)}
                          onBlur={(e) => onHandleBlur("contact", user_id, e)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Emergency Contact (Next of Kin)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {emergencyContact?.map((eachinput, index) => {
                    const value = profileData?.[eachinput.name];
                    const isEmpty = value === "" || value == null;
                    const displayValue = value;
                    return (
                      <div
                        key={index}
                        className={isEmpty ? "opacity-100" : "opacity-60"}
                      >
                        <label className="field-label flex items-center gap-2">
                          {eachinput.label}
                          {isEmpty ? (
                            <FaUnlock className="text-[8px] text-blue-400 ml-1" />
                          ) : (
                            <FaLock className="text-[8px] text-slate-400 ml-1" />
                          )}
                        </label>

                        <input
                          name={eachinput?.name}
                          type="text"
                          value={
                            !isEmpty
                              ? displayValue
                              : updateFields?.[eachinput?.name]
                          }
                          disabled={!isEmpty}
                          className={
                            "w-full p-3 rounded-xl text-sm font-bold " +
                            (isEmpty
                              ? "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100 mt-2"
                              : "input-locked bg-slate-50 border-2 border-slate-300 mt-2")
                          }
                          placeholder={`Enter ${eachinput?.label}`}
                          onChange={(e) => handleInputChange(e)}
                          onBlur={(e) => onHandleBlur("contact", user_id, e)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === "education" && (
            <div className="space-y-8">
              {/* High School Details */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  High School Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {educationDetails?.map((eachinput, index) => {
                    const value = profileData?.[eachinput.name];
                    const isEmpty = value === "" || value == null;
                    const displayValue = value;
                    return (
                      <div
                        key={index}
                        className={isEmpty ? "opacity-100" : "opacity-60"}
                      >
                        <label className="field-label flex items-center gap-2">
                          {eachinput.label}
                          {isEmpty ? (
                            <FaUnlock className="text-[8px] text-blue-400 ml-1" />
                          ) : (
                            <FaLock className="text-[8px] text-slate-400 ml-1" />
                          )}
                        </label>

                        <input
                          name={eachinput?.name}
                          type="text"
                          value={
                            !isEmpty
                              ? displayValue
                              : updateFields?.[eachinput?.name]
                          }
                          disabled={!isEmpty}
                          className={
                            "w-full p-3 rounded-xl text-sm font-bold " +
                            (isEmpty
                              ? "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100 mt-2"
                              : "input-locked bg-slate-50 border-2 border-slate-300 mt-2")
                          }
                          placeholder={`Enter ${eachinput?.label}`}
                          onChange={(e) => handleInputChange(e)}
                          onBlur={(e) => onHandleBlur("education", user_id, e)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Subject Grades Table */}
              {/* <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Subject Grade Breakdown
                </h3>
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="px-4 py-3">Subject</th>
                        <th className="px-4 py-3">Level</th>
                        <th className="px-4 py-3">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-2 font-bold">Mathematics</td>
                        <td className="px-4 py-2 text-slate-500">A-Level</td>
                        <td className="px-4 py-2 font-bold text-green-600">
                          A
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold">Physics</td>
                        <td className="px-4 py-2 text-slate-500">A-Level</td>
                        <td className="px-4 py-2 font-bold text-green-600">
                          A
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold">
                          Computer Science
                        </td>
                        <td className="px-4 py-2 text-slate-500">A-Level</td>
                        <td className="px-4 py-2 font-bold text-green-600">
                          A
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-bold">
                          English Language
                        </td>
                        <td className="px-4 py-2 text-slate-500">IGCSE</td>
                        <td className="px-4 py-2 font-bold text-blue-600">
                          A*
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}

              {(() => {
                const valueType = profileData?.["language_type"];
                const isEmptyType = valueType === "" || valueType == null;

                const valueScore = profileData?.["language_overall_score"];
                const isEmptyScore = valueScore === "" || valueScore == null;

                // Sub-scores array (like your educationDetails)

                return (
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                      Language Proficiency
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Test Type */}
                      <div
                        className={isEmptyType ? "opacity-100" : "opacity-60"}
                      >
                        <label className="field-label flex items-center gap-2">
                          Test Type
                          {isEmptyType ? (
                            <FaUnlock className="text-[8px] text-blue-400 ml-1" />
                          ) : (
                            <FaLock className="text-[8px] text-slate-400 ml-1" />
                          )}
                        </label>
                        {isEmptyType ? (
                          <select
                            className={
                              "w-full p-3 rounded-xl text-sm font-bold mt-2 " +
                              "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100"
                            }
                            defaultValue="IELTS"
                            value={updateFields?.["language_type"]}
                            name="language_type"
                            onChange={(e) => handleInputChange(e)}
                            onBlur={(e) =>
                              onHandleBlur("education", user_id, e)
                            }
                          >
                            <option value="IELTS">IELTS</option>
                            <option value="TOEFL">TOEFL</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={valueType}
                            disabled
                            className="w-full p-3 rounded-xl text-sm font-bold input-locked bg-slate-50 border-2 border-slate-300 mt-2"
                          />
                        )}
                      </div>

                      {/* Overall Band Score */}
                      <div
                        className={isEmptyScore ? "opacity-100" : "opacity-60"}
                      >
                        <label className="field-label flex items-center gap-2">
                          Overall Band Score
                          {isEmptyScore ? (
                            <FaUnlock className="text-[8px] text-blue-400 ml-1" />
                          ) : (
                            <FaLock className="text-[8px] text-slate-400 ml-1" />
                          )}
                        </label>
                        {isEmptyScore ? (
                          <input
                            name="language_overall_score"
                            type="text"
                            value={updateFields?.["language_overall_score"]}
                            className={
                              "w-full p-3 rounded-xl text-sm font-bold mt-2 " +
                              "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100"
                            }
                            placeholder="Enter Overall Band Score"
                            onChange={(e) => handleInputChange(e)}
                            onBlur={(e) =>
                              onHandleBlur("education", user_id, e)
                            }
                          />
                        ) : (
                          <input
                            disabled
                            value={valueScore}
                            className="w-full p-3 rounded-xl text-sm font-bold input-locked bg-slate-50 border-2 border-slate-300 mt-2"
                          />
                        )}
                      </div>

                      <div className="md:col-span-2 space-y-3 mt-6">
                        {languageSubScores.map((eachinput, index) => {
                          const value = profileData?.[eachinput.name];
                          const isEmpty = value === "" || value == null;

                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200"
                            >
                              <span className="text-sm font-medium text-slate-700">
                                {eachinput.label}
                              </span>

                              <div
                                className={
                                  isEmpty
                                    ? "opacity-100 flex items-center gap-1"
                                    : "opacity-60 flex items-center gap-1"
                                }
                              >
                                <FaLock className="text-[8px] text-slate-400" />
                                <input
                                  name={eachinput.name}
                                  type="text"
                                  value={
                                    !isEmpty
                                      ? value
                                      : updateFields?.[eachinput.name] || ""
                                  }
                                  disabled={!isEmpty}
                                  className={
                                    "w-20 p-1.5 text-xs font-bold rounded-lg text-right " +
                                    (isEmpty
                                      ? "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100"
                                      : "input-locked bg-slate-100 border-2 border-slate-300")
                                  }
                                  placeholder="0.0"
                                  onChange={(e) => handleInputChange(e)}
                                  onBlur={(e) =>
                                    onHandleBlur("education", user_id, e)
                                  }
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Uploaded Documents */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                  Uploaded Documents
                </h3>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <i className="fas fa-file-pdf text-green-600" />
                    <span className="text-xs font-bold text-green-800">
                      Transcript.pdf
                    </span>
                    <i className="fas fa-check-circle text-green-500 text-[10px] ml-2" />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <i className="fas fa-file-pdf text-green-600" />
                    <span className="text-xs font-bold text-green-800">
                      Diploma.pdf
                    </span>
                    <i className="fas fa-check-circle text-green-500 text-[10px] ml-2" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === "prefs" &&
            (() => {
            

              return (
                <div className="space-y-8">
                  {/* Study Goals */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                      Study Goals
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {prefsFields.slice(0, 3).map((eachinput, index) => {
                        // First 3 fields
                        const value = profileData?.[eachinput.name];
                        const isEmpty = value === "" || value == null;

                        return (
                          <div
                            key={index}
                            className={
                              isEmpty
                                ? "opacity-100 md:col-span-1"
                                : "opacity-60 md:col-span-1"
                            }
                          >
                            <label className="field-label flex items-center gap-2">
                              {eachinput.label}
                              {isEmpty ? (
                                <FaUnlock className="text-[8px] text-blue-400 ml-1" />
                              ) : (
                                <FaLock className="text-[8px] text-slate-400 ml-1" />
                              )}
                            </label>
                            <input
                              name={eachinput.name}
                              type="text"
                              value={
                                !isEmpty
                                  ? value
                                  : updateFields?.[eachinput.name] || ""
                              }
                              disabled={!isEmpty}
                              className={
                                "w-full p-3 rounded-xl text-sm font-bold mt-2 " +
                                (isEmpty
                                  ? "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100"
                                  : "input-locked bg-slate-50 border-2 border-slate-300")
                              }
                              placeholder={`Enter ${eachinput.label}`}
                              onChange={(e) => handleInputChange(e)}
                              onBlur={(e) =>
                                onHandleBlur("preferences", user_id, e)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Financial Profile */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                      Financial Profile
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {prefsFields.slice(3, 5).map((eachinput, index) => {
                        // Last 2 fields
                        const value = profileData?.[eachinput.name];
                        const isEmpty = value === "" || value == null;

                        return (
                          <div
                            key={index + 3}
                            className={isEmpty ? "opacity-100" : "opacity-60"}
                          >
                            <label className="field-label flex items-center gap-2">
                              {eachinput.label}
                              {isEmpty ? (
                                <FaUnlock className="text-[8px] text-blue-400 ml-1" />
                              ) : (
                                <FaLock className="text-[8px] text-slate-400 ml-1" />
                              )}
                            </label>
                            <input
                              name={eachinput.name}
                              type="text"
                              value={
                                !isEmpty
                                  ? value
                                  : updateFields?.[eachinput.name] || ""
                              }
                              disabled={!isEmpty}
                              className={
                                "w-full p-3 rounded-xl text-sm font-bold mt-2 " +
                                (isEmpty
                                  ? "border-2 border-blue-300 bg-white ring-1 ring-inset ring-blue-100"
                                  : "input-locked bg-slate-50 border-2 border-slate-300")
                              }
                              placeholder={`Enter ${eachinput.label}`}
                              onChange={(e) => handleInputChange(e)}
                              onBlur={(e) =>
                                onHandleBlur("preferences", user_id, e)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
        </div>
      </div>
    </div>
  );
}
