
import { FaUserLock } from "react-icons/fa";
import {useNavigate} from "react-router";

const VerificationLocked = () => {
    const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-center px-4 sm:px-8 lg:px-12 text-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl sm:text-4xl animate-pulse ring-8 ring-yellow-50/50">
        <FaUserLock />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
        Verification in Progress
      </h2>

      <p className="text-slate-500 mb-6 sm:mb-8 max-w-sm mx-auto text-sm sm:text-base">
        Your profile is currently locked. Our Admissions Team is verifying your
        documents.
      </p>

      <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-slate-600 mx-auto">
        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
        Status: Awaiting Admin Action
      </div>

      <button
        type="button"
        className="mt-10 sm:mt-12 text-blue-600 font-bold hover:underline text-sm sm:text-base"
        onClick={() => navigate("/student/login")}
      >
        Return to Login Screen
      </button>
    </div>
  );
};

export default VerificationLocked;
