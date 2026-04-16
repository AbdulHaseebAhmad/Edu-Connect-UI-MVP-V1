import React, { useEffect, useState } from "react";
import {
  FaTimes,
  FaUniversity,
  FaInfoCircle,
  FaClipboardCheck,
  FaCheckCircle,
  FaBell,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  ScholarshipReminderCheck,
  SetScholarshipReminder,
} from "../../Features/Students_Features/StudentAppSlice";

function ScholarshipDetailsModal({ scholarship, onClose, onUnlock, isadmin }) {
  if (!scholarship) return null;
  const [isReminderSet, setIsReminder] = useState(false);

  const dispatch = useDispatch();
  const student_id = useSelector((state) => state.authReducer?.user_id);

  const scholarshipReminderHandle = (scholarship_id) => {
    dispatch(SetScholarshipReminder({ scholarship_id, student_id }))
      .unwrap()
      .then((res) => {
        if (res) {
          alert("Reminder Set Succesfully");
          setIsReminder(true);
        } else {
          alert("Reminder already Set!");
        }
      });
  };

  useEffect(() => {
    dispatch(ScholarshipReminderCheck({scholarship_id:scholarship?.scholarship_id, student_id }))
      .unwrap()
      .then((res) => {
        if (res) {
          setIsReminder(res);
        }
      });
  },[]);

  const isUpcoming = scholarship.status === "Upcoming";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg mx-4 rounded-2xl shadow-2xl relative overflow-hidden max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="h-24 bg-blue-600 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900" />
          <div className="relative z-10 text-center px-4">
            <span className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1 block">
              {isUpcoming ? "Application Opens" : "Application Deadline"}
            </span>
            <h3 className="text-white text-2xl font-extrabold tracking-tight">
              {isUpcoming ? scholarship.opens : scholarship.deadline}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-8 -mt-6 relative">
          <div className="bg-white p-1.5 rounded-2xl shadow-lg inline-block mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl text-blue-600">
              <FaUniversity />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
            {scholarship.title}
          </h2>
          <div className="flex flex-wrap gap-2 mb-6 text-xs">
            <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full border border-green-200">
              {scholarship.funding}
            </span>
            <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full border border-slate-200">
              {scholarship.country}
            </span>
            <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full border border-slate-200">
              {scholarship.level}
            </span>
          </div>
          <div className="space-y-6 text-sm">
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <FaInfoCircle className="text-blue-500" /> Description
              </h4>
              <p className="text-slate-600 leading-relaxed">
                {scholarship.desc || scholarship?.description}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-3 text-xs uppercase flex items-center gap-2">
                <FaClipboardCheck /> Application Requirements
              </h4>
              <ul className="space-y-2 text-slate-700">
                {(scholarship.reqs || scholarship?.requirements || []).map(
                  (req) => (
                    <li key={req} className="flex items-start gap-2">
                      <FaCheckCircle className="text-blue-500 mt-0.5 text-xs" />
                      <span>{req}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          {/* Actions */}
          {!isadmin && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
              {isUpcoming ? (
                !isReminderSet ? (
                  <button
                    onClick={() =>
                      scholarshipReminderHandle(scholarship?.scholarship_id)
                    }
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 
      hover:from-orange-600 hover:to-red-600 text-white text-center py-3 
      rounded-xl font-bold transition shadow-lg flex items-center 
      justify-center gap-2 transform hover:-translate-y-0.5 text-sm"
                  >
                    <FaBell />
                    Notify Me When Open
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 bg-gray-200 text-gray-500 cursor-not-allowed 
      text-center py-3 rounded-xl font-semibold flex items-center 
      justify-center gap-2 text-sm border border-gray-300"
                  >
                    <FaBell />
                    Reminder Set
                  </button>
                )
              ) : (
                <button
                  // onClick={onUnlock}
                  onClick={() =>
                    (window.location.href = `${scholarship?.link}`)
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-bold transition shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
                >
                  View Scholarship
                </button>
              )}
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default ScholarshipDetailsModal;
