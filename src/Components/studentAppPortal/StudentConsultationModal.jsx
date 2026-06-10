import { FaTimes, FaCalendarAlt, FaClock, FaCommentDots } from "react-icons/fa";

export default function ConsultationModal({
  open,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Book Consultation
            </h2>
            <p className="text-xs text-slate-500">
              Choose your preferred time slot
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          {/* Date */}
          <div>
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-2">
              <FaCalendarAlt className="text-slate-400" />
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={formData?.date || ""}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
            />
          </div>

          {/* Time */}
          <div>
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-2">
              <FaClock className="text-slate-400" />
              Preferred Time
            </label>
            <input
              type="time"
              name="time"
              value={formData?.time || ""}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-2">
              <FaCommentDots className="text-slate-400" />
              Reason for Consultation
            </label>

            <textarea
              name="reason"
              value={formData?.reason || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us what you'd like help with..."
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold shadow-sm hover:shadow-md hover:scale-[1.02] transition"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}