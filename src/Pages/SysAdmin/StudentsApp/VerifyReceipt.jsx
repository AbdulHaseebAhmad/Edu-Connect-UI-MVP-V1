import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaReceipt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ReceiptPanel from "../../../Components/SysAdmin/ReceiptPanel";
import { GetReceipts } from "../../../Features/Admin_Features/AdminSlice";
import toast from "react-hot-toast";
export function VerifyStudentReceipt() {
  const [receiptPanelOpen, setReceiptPanelOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [receiptsList, setReceipts] = useState([]);

  const dispatch = useDispatch();

  const openReceiptPanel = (receipt) => {
    setSelectedReceipt(receipt);
    setReceiptPanelOpen(true);
  };

  useEffect(() => {
    const id = toast.loading("Fetching Payment Receipts");
    dispatch(GetReceipts())
      .unwrap()
      .then((res) => {
        setReceipts(res);
        toast.success("Fetched Payments Receipts Succesfully", { id });
      })
      .catch((e) => {
        toast.error("Fetched Payments Receipts Succesfully", { id });
      });
  }, [dispatch, receiptPanelOpen]);

  const getInitials = (first_name, last_name) => {
    const parts = [first_name, last_name].filter(Boolean);
    if (!parts.length) return "?";
    return parts
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("");
  };

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const renderStatusBadge = (status) => {
    const base =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide";
    switch (status) {
      case "approved":
        return (
          <span
            className={`${base} bg-green-200 text-green-700 border border-emerald-200`}
          >
            • Approved
          </span>
        );
      case "pending":
        return (
          <span
            className={`${base} bg-amber-200 text-amber-700 border border-amber-200`}
          >
            • Pending
          </span>
        );
      case "flagged":
        return (
          <span
            className={`${base} bg-purple-200 text-purple-700 border border-red-200`}
          >
            • Flagged
          </span>
        );
      case "rejected":
        return (
          <span
            className={`${base} bg-red-200 text-red-700 border border-red-200`}
          >
            • Rejected
          </span>
        );
      default:
        return (
          <span
            className={`${base} bg-slate-50 text-slate-600 border border-slate-200`}
          >
            • {status}
          </span>
        );
    }
  };

  return (
    <div className="fade-in space-y-0 px-4 pt-4">
      {/* Header + Search */}
      <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Payment Receipts</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review uploaded receipts and confirm tuition payments from your
            partner universities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500 bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Paid
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Flagged
            </span>
          </div> */}

          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm flex items-center">
            <div className="relative w-52 md:w-64">
              <FaSearch className="absolute left-3 top-2.5 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search student, university, or receipt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[11px] font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500 bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Paid
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400" /> Pending
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" /> Flagged
        </span>
      </div>
      {/* Table Card */}
      <div className="mt-4 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-slate-50/60">
          <div className="text-[11px] text-slate-500 font-medium">
            {/* Showing <span className="font-bold text-slate-700">{filteredStudents.length}</span> receipts */}
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3.5">Student</th>
              <th className="px-6 py-3.5">University</th>
              <th className="px-6 py-3.5">Receipt</th>
              <th className="px-6 py-3.5">Amount</th>
              <th className="px-6 py-3.5">Date</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
            {/* {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-400 text-sm">
                  No receipts found. Try adjusting your search.
                </td>
              </tr>
            )} */}

            {receiptsList?.length > 0 &&
              receiptsList?.map((receipt) => (
                <tr
                  key={receipt.receipt_id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {/* Student */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {receipt.img ? (
                        <img
                          src={receipt.img}
                          alt={receipt.first_name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-[11px] border border-slate-200 shadow-sm">
                          {getInitials(receipt.first_name, receipt.last_name)}
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          {receipt.first_name} {receipt.last_name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {receipt.student_email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* University */}
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold text-slate-800">
                      {receipt.university_name}
                    </div>
                  </td>

                  {/* Receipt ID */}
                  <td className="px-6 py-4">
                    <div className="font-mono text-[11px] text-slate-700">
                      {receipt.receipt_id}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-slate-800">
                      {formatAmount(receipt.paid_amount)}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-600">
                      {receipt.created_date}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {renderStatusBadge(receipt.receipt_status)}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openReceiptPanel(receipt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-lg hover:bg-indigo-100 border border-indigo-200 shadow-sm"
                    >
                      <FaReceipt className="text-xs" />
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Receipt Panel */}
      {receiptPanelOpen && selectedReceipt && (
        <ReceiptPanel
          receipt={selectedReceipt}
          open={receiptPanelOpen}
          onClose={() => setReceiptPanelOpen(false)}
        />
      )}
    </div>
  );
}
