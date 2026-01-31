import {
  FaTimes,
  FaGraduationCap,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";

export function ApplyConfirmationModal({ open, onClose, university, program,applyHandle }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaGraduationCap className="w-6 h-6 text-emerald-500" />
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Confirm Application
                </h3>
                <p className="text-sm text-slate-500">{university}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-6 py-6 bg-emerald-50/80 border-b border-slate-100">
          <div className="flex items-start gap-3 text-sm text-emerald-900">
            <FaUniversity className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-2">
                Ready to apply for {program}?
              </p>
              <p className="text-xs leading-relaxed">
                This program has <strong>no application fee</strong>. Clicking
                "Submit Application" will create your official application and
                take you to the next steps (documents + personal statement).
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Details */}
        <div className="px-6 py-6 bg-slate-50">
          <h4 className="font-bold text-sm mb-4 text-slate-900 uppercase tracking-wide flex items-center gap-2">
            Application Details
          </h4>
          <div className="space-y-3 text-sm divide-y divide-slate-200">
            <div className="flex justify-between py-2">
              <span className="text-slate-600 font-medium">Program:</span>
              <span className="font-bold text-slate-900">{program}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600 font-medium">University:</span>
              <span className="font-bold text-slate-900">{university}</span>
            </div>
            <div className="flex justify-between py-2 pt-3">
              <span className="text-slate-600 font-medium">
                Application Fee:
              </span>
              <span className="font-bold text-emerald-600">FREE</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 flex items-center gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition"
          >
            Close
          </button>
          <button onClick={applyHandle} className="px-8 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-emerald-800 hover:scale-[1.02] transition-all duration-200 flex items-center gap-2">
            <FaCheckCircle className="w-4 h-4" />
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
