import React, { useState } from "react";
import {
  FaEnvelope,
  FaFilePdf,
  FaPhone,
  FaTimes,
  FaUser,
  FaPassport,
  FaWhatsapp,
  FaUniversity,
  FaMoneyBillWave,
  FaBriefcase,
  FaPhoneAlt,
  FaChartBar,
  FaFolderOpen,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { RespondToApplication } from "../../Features/University_Features/UniversityAppSlice";
import toast from "react-hot-toast";
import { ViewStudentDocuments } from "../../Features/Students_Features/StudentAppSlice";
export function SchoolStudentPanel({
  student,
  open,
  onClose,
  refetchData,
  universityTab,
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const dispatch = useDispatch();

  if (!open || !student) return null;

  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .slice(0, 2)
          .map((n) => n[0]?.toUpperCase())
          .join("")
      : "?";

  const responseHandle = (status) => {
    const studentStatus = status == "verified" ? "Verifying" : "Rejecting "
    const id = toast.loading(`${studentStatus} Student`);
    dispatch(
      RespondToApplication({
        status,
        application_id: student?.application_id,
      })
    )
      .unwrap()
      .then(() => {
        toast.success(`Student ${status} `)
        onClose();
        refetchData();
      }).catch((e)=> toast.error(`There was an error ${studentStatus} student`));
  };

  const InfoCard = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-5">
      <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
        <span className="text-indigo-500">{icon}</span>
        {title}
      </h4>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-start gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800 text-right">
        {value || "N/A"}
      </span>
    </div>
  );

  const MiniScore = ({ label, value, highlight }) => {
    return (
      <div
        className={`flex flex-col justify-center rounded-xl p-4 text-center transition
        ${
          highlight
            ? "bg-slate-900 text-white"
            : "bg-white text-slate-900 ring-1 ring-slate-200"
        }`}
      >
        <span
          className={`text-xs font-medium uppercase tracking-wide ${
            highlight ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {label}
        </span>

        <span className="mt-1 text-2xl font-bold">{value ?? "-"}</span>
      </div>
    );
  };

  const tabs = {
    overview: (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <InfoCard title="Emergency Contact" icon={<FaPhoneAlt />}>
            <InfoRow label="Name" value={student?.emergency_contact_name} />
            <InfoRow label="Phone" value={student?.emergency_phone} />
            <InfoRow
              label="Relationship"
              value={student?.emergency_relationship}
            />
          </InfoCard>

          <InfoCard title="Address" icon={<FaUser />}>
            <InfoRow label="Street" value={student?.street_address} />
            <InfoRow label="Permanent" value={student?.permanent_address} />
            <InfoRow label="City" value={student?.city} />
            <InfoRow label="State" value={student?.state_province} />
            <InfoRow label="Zip" value={student?.zip_postal_code} />
          </InfoCard>
        </div>

        {universityTab === "pending" && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex gap-4">
            <button
              onClick={() => responseHandle("offered")}
              className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
            >
              Approve & Verify
            </button>
            <button
              onClick={() => responseHandle("rejected")}
              className="flex-1 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    ),

    academic: (
      <div className="space-y-8">
        {/* Primary Scores */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Academic Overview
          </h4>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MiniScore
              label="GPA"
              value={student?.cummulative_score}
              highlight
            />
            <MiniScore
              label={student?.language_type || "Language"}
              value={student?.language_overall_score}
              highlight
            />
            <MiniScore
              label="Graduation Year"
              value={student?.graduation_year}
              highlight
            />
          </div>
        </div>

        {/* Language Breakdown */}
        <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Language Breakdown
          </h4>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <MiniScore
              highlight
              label="Reading"
              value={student?.language_reading}
            />
            <MiniScore
              highlight
              label="Writing"
              value={student?.language_writting}
            />
            <MiniScore
              highlight
              label="Listening"
              value={student?.language_listening}
            />
            <MiniScore
              highlight
              label="Speaking"
              value={student?.language_speaking}
            />
          </div>
        </div>
      </div>
    ),

    personal: (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <InfoCard title="Personal Details" icon={<FaUser />}>
            <InfoRow label="First Name" value={student?.first_name} />
            <InfoRow label="Middle Name" value={student?.middle_name} />
            <InfoRow label="Last Name" value={student?.last_name} />
            <InfoRow label="DOB" value={student?.dob} />
            <InfoRow label="Gender" value={student?.gender} />
            <InfoRow label="Marital Status" value={student?.marrital_status} />
            <InfoRow label="Nationality" value={student?.nationality} />
          </InfoCard>

          <InfoCard title="Passport" icon={<FaPassport />}>
            <InfoRow label="Number" value={student?.passport_number} />
            <InfoRow label="Issued" value={student?.passport_issue} />
            <InfoRow label="Expiry" value={student?.passport_expiry} />
          </InfoCard>
        </div>

        <InfoCard title="Contact Channels" icon={<FaWhatsapp />}>
          <InfoRow label="Phone" value={student?.phone_number} />
          <InfoRow label="WhatsApp" value={student?.whatsapp_number} />
          <InfoRow label="Email" value={student?.email} />
        </InfoCard>
      </div>
    ),

    preferences: (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <MiniScore label="Degree Level" value={student?.degree_level} />
          <MiniScore label="Curriculum" value={student?.curriculum} />
          <MiniScore label="School" value={student?.school_name} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <InfoCard title="Career & Intake" icon={<FaBriefcase />}>
            <InfoRow
              label="Career Interest"
              value={student?.primary_career_interest}
            />
            <InfoRow
              label="Preferred Start"
              value={student?.preferred_start_date}
            />
            <InfoRow
              label="Scholarship Interest"
              value={student?.scholarship_interest}
            />
          </InfoCard>

          <InfoCard title="Finance" icon={<FaMoneyBillWave />}>
            <InfoRow
              label="Annual Budget"
              value={
                student?.annual_budget ? `£${student.annual_budget}` : "N/A"
              }
            />
          </InfoCard>
        </div>
      </div>
    ),

    documents: (
      <div className="space-y-4">
        {student?.Documents?.map((doc, index) => (
          <div
            key={index}
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <FaFilePdf className="text-lg text-red-600" />
              </div>

              {/* Meta */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">
                  {doc?.document_name || "Untitled document"}
                </span>

                <span className="text-xs text-slate-500">
                  {doc?.type || "Unknown type"}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Status */}
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium
        ${
          doc?.status === "uploaded"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-500"
        }`}
              >
                {doc?.status || "missing"}
              </span>

              {/* Action */}
              {true? (
                <button
                  // href={doc.url}
                  // target="_blank"
                  // rel="noreferrer"
                  onClick={()=>dispatch(ViewStudentDocuments({document_id:doc?.document_id,student_id:student?.student_id}))}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  View
                </button>
              ) : (
                <span className="text-sm text-slate-400">Not available</span>
              )}
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[720px] bg-slate-50 shadow-2xl z-[80] flex flex-col border-l border-slate-200">
      <div className="h-20 bg-white border-b border-slate-200 flex justify-between items-center px-8">
        <div>
          <h2 className="font-extrabold text-slate-900 text-lg">
            Student 360° Profile
          </h2>
          <p className="text-[10px] text-slate-400 uppercase font-bold">
            Comprehensive Record
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full"
        >
          <FaTimes />
        </button>
      </div>

      {/* Student header */}
      <div className="p-8 bg-white border-b border-slate-200">
        <div className="flex gap-6 items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow">
            {getInitials(student?.first_name)}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-slate-900">
              {student?.first_name} {student?.last_name}
            </h1>
            <div className="text-xs text-slate-500 font-bold uppercase">
              ID: #{student?.student_id}
            </div>

            <div className="flex gap-6 mt-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <FaEnvelope /> {student?.email}
              </div>
              <div className="flex items-center gap-2">
                <FaPhone /> {student?.phone_number}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-slate-200 px-4">
        {[
          ["overview", "Overview", <FaUser />],
          ["academic", "Academic", <FaChartBar />],
          ["personal", "Personal", <FaUser />],
          ["preferences", "Preferences", <FaUniversity />],
          ["documents", "Documents", <FaFolderOpen />],
        ].map(([key, label, icon]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold rounded-t-xl transition ${
              activeTab === key
                ? "text-indigo-600 bg-indigo-50"
                : "text-slate-500 hover:text-indigo-600"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">{tabs[activeTab]}</div>
    </div>
  );
}
