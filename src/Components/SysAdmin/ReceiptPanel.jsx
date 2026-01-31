import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  GetStudentReceipt,
  RespondToReceipt,
} from "../../Features/Admin_Features/adminSlice";
import { ApplyToUniversity } from "../../Features/Students_Features/StudentAppSlice";

export default function ReceiptPanel({ receipt, open, onClose }) {
  const dispatch = useDispatch();

  const [receiptUrl, setReceiptUrl] = useState(null);

  useEffect(() => {
    const fileUrl = `data:${receipt?.mime_type};base64,${receipt?.receipt}`;
    setReceiptUrl(fileUrl);
  }, []);
  const respondReceiptHandle = (status) => {
    dispatch(
      RespondToReceipt({ receipt_id: receipt?.receipt_id, status: status })
    )
      .unwrap()
      .then((res) => {
        if (res) {
          dispatch(
            ApplyToUniversity({
              student_id: receipt?.student_id,
              program_id: receipt?.program_id,
              university_id: receipt?.university_id,
            })
          )
            .unwrap()
            .then((res) => {
              if (res) {
                onClose();
              }
            });
        }
      });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-end z-50">
      <div className="w-full md:w-[420px] bg-white min-h-screen p-6 relative overflow-y-auto rounded-l-3xl shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
            Receipt Verification
          </p>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Receipt Details
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Cross-check the uploaded receipt before marking this payment as
            verified.
          </p>
        </div>

        {receipt ? (
          <>
            <div className="mt-6 flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase">
                Receipt Status:
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold capitalize
              ${
                receipt?.receipt_status === "approved"
                  ? "bg-green-100 text-green-700"
                  : receipt?.receipt_status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : receipt?.receipt_status === "pending"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-purple-100 text-purple-700"
              }`}
              >
                {receipt?.receipt_status}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-5 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-600">Receipt ID</span>
                <span className="font-mono text-slate-800">
                  {receipt.receipt_id}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-600">University</span>
                <span className="text-slate-800">
                  {receipt.university_name}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-600">Amount</span>
                <span className="text-slate-800 font-bold">
                  ${receipt.paid_amount || "0.00"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-600">
                  Payment Date
                </span>
                <span className="text-slate-800">{receipt.created_date}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-600">Method</span>
                <span className="text-slate-800">{receipt.method}</span>
              </div>
            </div>
            {/* Image */}
            {!receipt.receipt_image && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Uploaded Receipt
                </h3>
                <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <iframe
                    src={receiptUrl}
                    alt="Receipt"
                    className="w-full min-h-[480px] object-cover"
                  />
                </div>
              </div>
            )}
            {/* Student Info */}
            <div className="border-t border-slate-200 pt-4 mt-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Student Information
              </h3>
              <p className="text-xs text-slate-700">
                <span className="font-semibold">
                  {receipt.first_name} {receipt.last_name}
                </span>{" "}
                — {receipt.email}
              </p>
              <p className="text-[11px] text-slate-500">
                University:{" "}
                <span className="font-medium">{receipt.university_name}</span>
              </p>
            </div>
            {/* Actions (UI only, no logic changed) */}
            {receipt?.receipt_status === "pending" && (
              <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <p className="text-xs font-bold uppercase text-slate-500 mb-3">
                  Review Action
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => respondReceiptHandle("rejected")}
                    className="py-3 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-sm transition"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => respondReceiptHandle("approved")}
                    className="py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => respondReceiptHandle("flagged")}
                    className="py-3 rounded-xl bg-orange-600 border border-orange-200 text-white text-xs font-bold hover:bg-orange-700 transition"
                  >
                    Flag for Review
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-slate-400 text-sm">Loading receipt...</p>
        )}
      </div>
    </div>
  );
}
