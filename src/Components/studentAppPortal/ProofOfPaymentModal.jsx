import {
  FaTimes,
  FaFileInvoiceDollar,
  FaUpload,
  FaUniversity,
} from "react-icons/fa";

export function PaymentProofModal({
  open,
  onClose,
  university,
  appFee,
  handleFileUpload,
  submitHandle,
  uploadedFile
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-20 flex pt-8 items-center justify-center px-4 bg-slate-900/70 backdrop-blur-md">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 pt-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaFileInvoiceDollar className="w-6 h-6 text-orange-500" />
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Proof of Payment Required
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
        <div className="px-6 py-5 border-b border-slate-100 bg-orange-50/80">
          <div className="flex items-start gap-2 text-sm text-orange-900">
            <FaUniversity className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">
                Official {university} Bank Account Only
              </p>
              <p className="text-xs leading-relaxed">
                Pay the <strong>{appFee}</strong> application fee directly to
                the university's official account. Do NOT pay agents or third
                parties. GEOS does not collect fees.
              </p>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="px-6 py-6 bg-slate-50">
          <h4 className="font-bold text-sm mb-4 text-slate-900 uppercase tracking-wide flex items-center gap-2">
            University Bank Details
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Bank Name:</span>
              <span className="font-bold text-slate-900">Barclays Bank UK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Account Name:</span>
              <span className="font-bold text-slate-900">
                {university} Admissions
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">
                Account Number:
              </span>
              <span className="font-bold text-slate-900">1234 5678 90</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Sort Code:</span>
              <span className="font-bold text-slate-900">20-47-68</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Reference:</span>
              <span className="font-bold text-orange-600">
                APP-{Date.now().toString().slice(-6)}
              </span>
            </div>
          </div>
        </div>

        {/* File Upload */}
        {/* File Upload */}
        <div className="px-6 py-4">
          <label className="block w-full text-center py-2 px-4 border-2 border-dashed border-slate-200 rounded-2xl hover:border-orange-400 hover:bg-orange-50/30 transition-all duration-200 cursor-pointer group">
            <FaUpload className="w-8 text-slate-400 mx-auto mb-3 group-hover:text-orange-500 transition" />

            <div className="space-y-1">
              {uploadedFile ? (
                <>
                  <p className="font-bold text-lg text-green-600">
                    ✓ Receipt Uploaded
                  </p>

                  <p className="text-sm text-slate-600 break-all">
                    {uploadedFile.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    Click here to replace the file
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition">
                    Upload Payment Receipt
                  </p>

                  <p className="text-sm text-slate-500">
                    PDF, JPG, PNG • Max 5MB
                  </p>
                </>
              )}
            </div>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 flex items-center gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={submitHandle}
            className="px-8 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:from-orange-700 hover:to-orange-800 hover:scale-[1.02] transition-all duration-200"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
