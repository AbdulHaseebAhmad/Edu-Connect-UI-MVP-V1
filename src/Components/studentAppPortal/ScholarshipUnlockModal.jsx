import React from "react";
import { FaTimes, FaLock, FaUnlock, FaShieldAlt } from "react-icons/fa";

function ScholarshipUnlockModal({ scholarship, onClose }) {
  if (!scholarship) return null;

  function handleSubmit(e) {
    e.preventDefault();
    window.open(scholarship.link, "_blank");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-blue-900/90 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg mx-4 rounded-2xl shadow-2xl relative overflow-hidden max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
        >
          <FaTimes className="text-sm" />
        </button>

        <div className="text-center pt-6 pb-3 px-6">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
            <FaLock />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Unlock Application
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Get immediate access to the official portal & visa guide.
          </p>
        </div>

        <div className="px-6 pb-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Country
                </label>
                <select className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-600 text-sm">
                  <option>Malawi</option>
                  <option>Nigeria</option>
                  <option>Kenya</option>
                  <option>South Africa</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg mt-1.5 flex justify-center items-center gap-2 text-sm"
            >
              Get Instant Access <FaUnlock />
            </button>
          </form>
          <p className="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1">
            <FaShieldAlt /> Your data is secure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipUnlockModal;
