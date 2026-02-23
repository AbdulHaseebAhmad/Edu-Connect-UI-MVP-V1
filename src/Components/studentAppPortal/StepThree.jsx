import { FaCheckCircle, FaLock } from "react-icons/fa";
import SignupCompleteModal from "./SignupCompleteModal";

export default function StepThree({
  toggleScreen,
  submitDataHandle,
  showSignUpModal,
}) {
  return (
    <div className="flex-1 flex flex-col w-full space-y-4 text-center">
      {/* Icon */}
      {/* <SignupCompleteModal open={true}/> */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 text-2xl sm:text-3xl">
        <FaLock className="text-blue-600 text-2xl" />{" "}
      </div>

      {/* Heading + text */}
      <div>
        <h3 className="font-bold text-lg sm:text-xl text-slate-900 mb-2">
          Confirm &amp; Lock Data
        </h3>
        <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
          I confirm that the documents uploaded are authentic. I understand my
          profile will be locked for Admin Verification.
        </p>
      </div>

      {/* Summary card */}
      <div className="w-full bg-slate-50 p-4 sm:p-5 rounded-xl text-left text-sm space-y-3 border border-slate-100 max-w-md mx-auto">
        <div className=" flex items-center justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-500">Bio Data</span>
          <span className="text-green-600 font-bold flex items-center gap-1">
            <FaCheckCircle />
            Complete
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-500">Passport</span>
          <span className="text-green-600 font-bold flex items-center gap-1">
            <FaCheckCircle />
            Attached
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-500">Transcript</span>
          <span className="text-green-600 font-bold flex items-center gap-1">
            <FaCheckCircle />
            Attached
          </span>
        </div>
      </div>

      {/* Buttons row */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto pt-4 max-w-md mx-auto w-full">
        <button
          type="button"
          className="w-full sm:w-1/3 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl"
          onClick={() => toggleScreen(1)}
        >
          Back
        </button>
        <button
          type="button"
          className="w-full sm:w-2/3 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-xl transition"
          onClick={() => {
            submitDataHandle();
          }}
        >
          Submit to Admin
        </button>
      </div>
    </div>
  );
}
