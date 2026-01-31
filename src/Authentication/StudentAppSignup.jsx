import StepOne from "../Components/studentAppPortal/StepOne";
import StepTwoDocs from "../Components/studentAppPortal/StepTwoDocs";
import StepThree from "../Components/studentAppPortal/StepThree";
import { FaCheckCircle, FaLayerGroup, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SignUpStudent } from "../Features/Students_Features/StudentAppSlice";
import { fileToBase64 } from "../Utillities/helpFunctions";

export default function StudentAppSignup() {

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    school_code:"",
    citizenship: "",
  });


  const [screen, setScreen] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "passport" || name === "transcript") {
      setFormData((prev) => {
        return { ...prev, [name]: e.target.files[0] };
      });
      return;
    }
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const removeFilesHandle = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const toggleScreen = (screenNumber) => {
    setScreen(screenNumber);
  };

  const submitDataHandle = async () => {
    formData.passport_mime_type = formData.passport.type;
    formData.transcript_mime_type = formData.transcript.type;
    formData.passport = await fileToBase64(formData?.passport);
    formData.transcript = await fileToBase64(formData?.transcript);    
    dispatch(SignUpStudent(formData)).unwrap().then((res)=>{
      if (res){
        
      }
    });
  };
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-600/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-purple-600/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-6xl bg-white rounded-none sm:rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden relative z-10 m-0 sm:m-4">
        <div className="w-full lg:w-1/3 bg-slate-50 flex flex-col justify-between p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white">
                <FaLayerGroup className="text-md" />
              </div>
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
                UniGlobal<span className="text-blue-500">.</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
              Secure Student Portal
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500" />
                <p className="text-sm text-slate-600">
                  <strong>Mandatory Verification:</strong> All profiles are
                  vetted by High School Admins.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <p className="text-sm text-slate-600">
                  <strong>Data Lock:</strong> Once submitted, your academic data
                  is read-only.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/5 p-4 sm:p-6 rounded-2xl border border-blue-100 mt-6 sm:mt-0">
            <div className="flex items-center gap-3 mb-2">
              <FaShieldAlt className="text-blue-600" />
              <span className="font-bold text-blue-900 text-xs sm:text-sm">
                Admissions Protocol
              </span>
            </div>
            <p className="text-xs text-blue-700">
              Please have your Passport and Official Transcript ready before
              starting registration.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full lg:w-2/3 flex flex-col px-4 sm:px-8 lg:px-12 py-8 lg:py-12 max-w-xl mx-auto">
          {/* Header row */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Create Profile
            </h2>
            <button
              type="button"
              className="text-xs sm:text-sm text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>

          {/* Wizard indicators */}
          <div className="flex justify-between items-center mb-8 sm:mb-10 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10" />
            <div className="flex flex-col items-center gap-2 bg-white px-1 sm:px-2">
              <div
                className={`${
                  screen === 0
                    ? `bg-blue-600 text-white border-blue-600`
                    : `bg-slate-100 text-slate-400 border-slate-200`
                } w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs sm:text-sm  `}
              >
                1
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-500">
                Bio Data
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-1 sm:px-2">
              <div
                className={`${
                  screen === 1
                    ? `bg-blue-600 text-white border-blue-600`
                    : `bg-slate-100 text-slate-400 border-slate-200`
                } w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs sm:text-sm  `}
              >
                2
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-500">
                Docs
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-1 sm:px-2">
              <div
                className={`${
                  screen === 2
                    ? `bg-blue-600 text-white border-blue-600`
                    : `bg-slate-100 text-slate-400 border-slate-200`
                } w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs sm:text-sm  `}
              >
                3
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-500">
                Confirm
              </span>
            </div>
          </div>

          {screen === 0 ? (
            <StepOne
              onChange={handleChange}
              toggleScreen={toggleScreen}
              formData={formData}
            />
          ) : screen === 1 ? (
            <StepTwoDocs
              removeFilesHandle={removeFilesHandle}
              onChange={handleChange}
              toggleScreen={toggleScreen}
              passportname={formData?.passport}
              transcriptname={formData?.transcript}
            />
          ) : (
            <StepThree
              toggleScreen={toggleScreen}
              submitDataHandle={submitDataHandle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
