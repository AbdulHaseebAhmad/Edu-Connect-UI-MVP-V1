import { useEffect, useState } from "react";
import {
  FaExclamationTriangle,
  FaGraduationCap,
  FaIdCard,
} from "react-icons/fa";

export default function StepTwoDocs({
  onChange,
  toggleScreen,
  passportname,
  transcriptname,
  removeFilesHandle,
}) {
  const [passportUploaded, setPassportUploded] = useState(false);
  const [transcriptUploaded, setTranscriptUploaded] = useState(false);

  const handleChange = (e) => {
    const { name } = e.target;
    if (name === "passport") {
      setPassportUploded(true);
    } else if (name === "transcript") {
      setTranscriptUploaded(true);
    }
    onChange(e);
  };

  useEffect(() => {
    if (passportname) {
      setPassportUploded(true);
    }
    if (transcriptname) {
      setTranscriptUploaded(true);
    }
  }, []);

  const changeDocHandle = (e) => {
    const { name } = e.target;
    if (name === "passport") {
      setPassportUploded(false);
      removeFilesHandle(e);
    }
    if (name === "transcript") {
      setTranscriptUploaded(false);
      removeFilesHandle(e);
    }
  };
  return (
    <div className="flex-1 flex flex-col w-full space-y-4">
      <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-start gap-3">
        <FaExclamationTriangle className="text-red-500 mt-1" />
        <p className="text-xs sm:text-sm text-red-700">
          <strong>Mandatory:</strong> These documents verify your eligibility.
          They will be locked after submission.
        </p>
      </div>

      {passportUploaded ? (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-green-50 border border-green-200 px-3 py-2">
          <div className="flex items-center gap-2">
            <FaIdCard className="text-green-500" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-green-700">
                File uploaded
              </span>
              <span className="text-xs text-green-600">{passportname?.name}</span>
            </div>
          </div>
          <button
            name="passport"
            value={null}
            type="button"
            className="text-[10px] font-medium text-green-700 hover:text-green-800 underline underline-offset-2"
            onClick={(e) => changeDocHandle(e)}
          >
            Change
          </button>
        </div>
      ) : (
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
            1. Passport / National ID
          </label>
          <div className="rounded-xl p-4 text-center cursor-pointer relative group border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition">
            <input
              name="passport"
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={(e) => handleChange(e)}
            />
            <div className="flex flex-col items-center justify-center">
              <FaIdCard className="text-2xl text-slate-300 mb-2 group-hover:text-slate-400" />
              <div className="text-sm font-bold text-slate-600">
                Click to Upload
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Supported: JPG, PNG, PDF
              </p>
            </div>
          </div>
        </div>
      )}

      {transcriptUploaded ? (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-green-50 border border-green-200 px-3 py-2">
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-green-500" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-green-700">
                File uploaded
              </span>
              <span className="text-xs text-green-600">{transcriptname?.name}</span>
            </div>
          </div>
          <button
            name="transcript"
            value={null}
            type="button"
            className="text-[10px] font-medium text-green-700 hover:text-green-800 underline underline-offset-2"
            onClick={(e) => changeDocHandle(e)}
          >
            Change
          </button>
        </div>
      ) : (
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
            2. Academic Transcript
          </label>
          <div className="rounded-xl p-4 text-center cursor-pointer relative group border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition">
            {/* Hidden file input (visual only) */}
            <input
              name="transcript"
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={(e) => handleChange(e)}
            />
            <div className="flex flex-col items-center justify-center">
              <FaGraduationCap className="text-2xl text-slate-300 mb-2 group-hover:text-slate-400" />
              <div className="text-sm font-bold text-slate-600">
                Click to Upload
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Supported: JPG, PNG, PDF
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto pt-4">
        <button
          type="button"
          className="w-full sm:w-1/3 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl"
          onClick={() => toggleScreen(0)}
        >
          Back
        </button>
        <button
          type="button"
          className="w-full sm:w-2/3 py-3 bg-blue-600 text-white font-bold rounded-xl 
             hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:bg-slate-400 transition"
          onClick={() => toggleScreen(2)}
          disabled={!transcriptname || !passportUploaded}
        >
          Review
        </button>
      </div>
    </div>
  );
}
