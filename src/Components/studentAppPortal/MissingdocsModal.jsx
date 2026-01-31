import {
  FaTimes,
  FaExclamationTriangle,
  FaFileAlt,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export function MissingDocumentsModal({ open, onClose, missingDocuments = [] }) {
  if (!open) return null;

  const hasMissing = missingDocuments && missingDocuments.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="w-6 h-6 text-amber-500" />
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Missing Documents
                </h3>
                <p className="text-sm text-slate-500">
                  Please upload the documents below
                </p>
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

        {/* Warning / Info */}
        <div className="px-6 py-6 bg-amber-50/80 border-b border-slate-100">
          <div className="flex items-start gap-3 text-sm text-amber-900">
            <FaFileAlt className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-2">
                Your application is not complete yet.
              </p>
              {hasMissing ? (
                <p className="text-xs leading-relaxed">
                  The following required documents are currently{" "}
                  <strong>missing</strong>. Please upload them so that your
                  application can be reviewed by the university.
                </p>
              ) : (
                <p className="text-xs leading-relaxed">
                  All required documents appear to be uploaded. If this is a
                  mistake, please refresh the page and try again.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Missing documents list */}
        {hasMissing && (
          <div className="px-6 py-5 bg-white">
            <h4 className="font-bold text-sm mb-3 text-slate-900 uppercase tracking-wide flex items-center gap-2">
              Missing Items
            </h4>
            <ul className="space-y-2 text-sm">
              {missingDocuments.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 bg-red-50 border border-red-100 rounded-xl"
                >
                  <span className="flex items-center gap-2 text-red-700 font-medium">
                    <FaTimesCircle className="w-4 h-4" />
                    {doc.label || doc} 
                    {/* doc can be a string like "CV" or an object { label: "CV" } */}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    Required
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 flex items-center gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition"
          >
            Close
          </button>
          <Link
            to="/student/documents"
            onClick={onClose}
            className="px-8 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
          >
            <FaFileAlt className="w-4 h-4" />
            Go to Documents
          </Link>
        </div>
      </div>
    </div>
  );
}
