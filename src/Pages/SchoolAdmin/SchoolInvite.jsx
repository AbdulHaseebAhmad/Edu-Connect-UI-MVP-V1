import {
  FaGraduationCap,
  FaEnvelope,
  FaPen,
  FaCheckCircle,
  FaUsers,
  FaCheck,
  FaInfoCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
} from "react-icons/fa";
import InviteStep from "../../Components/SysAdmin/InviteStep";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { validateSchoolInviteLink } from "../../Features/School_Features/SchoolSlice";
import InviteForm from "./InviteForm";

export default function SchoolInvite() {
  const location = useLocation();
  const [code, setCode] = useState();
  const [email, setEmail] = useState();
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(null);
  const [status, setStatus] = useState();

  useEffect(() => {
    const token = location.pathname.split("/").filter(Boolean)[1] || "";
    dispatch(validateSchoolInviteLink(token))
      .unwrap()
      .then((res) => {
        if (res) {
          setIsValid(true);
          setStatus(res);
        } else {
          setIsValid(false);
          setStatus(null);
        }
      });
  }, [code]);

  useEffect(() => {
    // check for the validity of the link
    setCode(location.pathname.split("/").filter(Boolean)[1] || "");
    setEmail(location.pathname.split("/").filter(Boolean)[2] || "");
  });
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a
            href="/sysadmin"
            className="flex items-center gap-2 text-blue-600 font-bold text-2xl"
          >
            <FaGraduationCap className="text-purple-500 text-3xl" />
            EduAI
          </a>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-center py-10 px-6">
              <h1 className="text-2xl font-bold mb-2">
                School Onboarding Process
              </h1>
              {status != "pending" ? (
                <p className="max-w-2lg mx-auto text-white/90 ">
                  Complete these steps to get your school fully set up with our
                  AI-powered platform
                </p>
              ) : (
                <p className="max-w-2xl mx-auto text-white/90">
                  Step Completed
                </p>
              )}
            </div>

            <div className="flex justify-center bg-gray-50 border-b border-gray-200 py-6">
              <div className="flex flex-wrap justify-center gap-8">
                <InviteStep icon={<FaEnvelope />} label="Invitation" active />
                <InviteStep icon={<FaPen />} label="Registration" active />
                <InviteStep icon={<FaCheckCircle />} label="Verification" />
                <InviteStep icon={<FaUsers />} label="Enrollment" />
                <InviteStep icon={<FaCheck />} label="Complete" />
              </div>
            </div>

            <div className="p-10">
              <h2 className="text-2xl font-semibold mb-8 pb-2 border-b-4 border-blue-600 inline-block">
                School Details
              </h2>

              <div className="flex items-start bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-8">
                <FaInfoCircle className="text-blue-600 text-2xl mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Your {code} Invitation Code
                  </h3>
                  {status != "completed" && (
                    <p className="text-gray-500 text-sm ">
                      This link was sent to{" "}
                      <span className="text-blue-600">{email}</span> - Fields
                      marked with * are required
                    </p>
                  )}
                </div>
              </div>

              {isValid ? (
                status == "completed" ? (
                  <div className="flex items-center justify-center gap-2 text-yellow-600 font-semibold text-lg ">
                    <FaHourglassHalf className="animate-spin text-2xl" />
                    <span>Pending Application</span>
                  </div>
                ) : (
                  <InviteForm token={code} statusChange={()=>setStatus('completed')}/>
                )
              ) : (
                <div className="flex items-center justify-center gap-2 text-red-600 font-semibold text-lg ">
                  <FaExclamationTriangle className="text-2xl" />
                  <span>Invalid Application</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
