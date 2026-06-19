import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaFileAlt,
  FaGraduationCap,
  FaHeart,
  FaInfoCircle,
  FaUniversity,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  ApplyToUniversity,
  DeleteShortlistPrograms,
  GetFreeApplicationCount,
  GetProgramsList,
  GetShortlistPrograms,
  GetUniversityList,
  shortlistProgram,
  UploadApplicationReceipt,
  VerifyApplication,
} from "../../Features/Students_Features/StudentAppSlice";
import { PaymentProofModal } from "../../Components/studentAppPortal/ProofOfPaymentModal";
import { ApplyConfirmationModal } from "../../Components/studentAppPortal/ApplyConfirmationModal";
import { MissingDocumentsModal } from "../../Components/studentAppPortal/MissingdocsModal";
import { IncompleteProfileModal } from "../../Components/studentAppPortal/IncompleteProfileModal";
import { fileToBase64 } from "../../Utillities/helpFunctions";

export default function StdProgram() {
  const [selectedProg, setSelectedProg] = useState();
  const [selectedUni, setSelectedUni] = useState();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showMissingDocsModal, setShowMissingDocsModal] = useState(false);
  const [showIncompleteProfileModal, setIncompleteProfileModal] =
    useState(false);
  const student_id = useSelector((state) => state.authReducer.user_id);
  const [applied, setApplied] = useState(false);
  const [shortListed, setShortListed] = useState(false);
  const [shortListedId, setShortlistId] = useState(null);
  const navigate = useNavigate();

  const freeAppcount = useSelector(
    (state) => state.authReducer.free_application_count,
  );

  useEffect(() => {
    dispatch(GetFreeApplicationCount(student_id));
  }, [student_id]);

  const [receipt, setReceipt] = useState({
    data: "",
    name: "",
    type: "",
    status: "",
  });

  const school_verified = useSelector(
    (state) => state.authReducer.school_verified,
  );
  const studentDocuments = useSelector(
    (state) => state.profileReducer.documentList,
  );
  const [missingDocList, setMissingDocsList] = useState([]);

  const { university_id } = useParams();
  const { program_id } = useParams();
  const { country_id } = useParams();

  const dispatch = useDispatch();

  const fetchPrograms = (program_id) => {
    dispatch(GetProgramsList(program_id))
      .unwrap()
      .then((res) => {
        if (res) {
          let program = res.filter((prog) => prog.program_id == program_id);
          setSelectedProg(program[0] || []);
          dispatch(
            VerifyApplication({
              student_id: student_id,
              program_id: program[0]?.program_id,
              university_id: program[0]?.university_id,
            }),
          )
            .unwrap()
            .then((res) => {
              if (res?.HasReceipt || res?.HasApplication) {
                setApplied(true);
              }
            });
        }
      });
  };

  const fetchUniversities = (countryId) => {
    dispatch(GetUniversityList(countryId))
      .unwrap()
      .then((res) => {
        if (res) {
          let uni = res.filter((uni) => uni.university_id == university_id);
          setSelectedUni(uni[0] || []);
        }
      });
  };

  useEffect(() => {
    fetchPrograms(program_id);
    fetchUniversities(country_id);
  }, [university_id, program_id]);

  const applyToUniversity = () => {
    if (school_verified === "un-verified" || school_verified === "rejected") {
      setIncompleteProfileModal(true);
      return;
    }

    if (missingDocList?.length > 0) {
      setShowMissingDocsModal(true);
      return;
    }

    const isFreeApplication = selectedProg?.program_application_fee === "free";

    if (isFreeApplication) {
      if (freeAppcount >= 3) {
        alert(
          "You have already used your 3 free applications. Please pay the application fee to continue.",
        );
        return;
      }

      setShowApplyModal(true);
      return;
    }

    setShowPaymentModal(true);
  };
  const freeApplyhandle = () => {
    dispatch(
      ApplyToUniversity({
        student_id,
        university_id: selectedProg?.university_id,
        program_id: selectedProg?.program_id,
      }),
    )
      .unwrap()
      .then((res) => {
        if (res) {
          setApplied(true);
          setShowApplyModal(false);
        }
      });
  };

  const PaidApplyHandle = () => {
    // console.log(receipt)
    if (receipt.data == "") return;
    dispatch(
      UploadApplicationReceipt({
        receipt: receipt,
        student_id,
        university_id: selectedProg?.university_id,
        program_id: selectedProg?.program_id,
        paid_amount: selectedProg?.program_application_fee,
      }),
    )
      .unwrap()
      .then((res) => {
        if (res) {
          setApplied(true);
          setShowPaymentModal(false);
        }
      });
  };
  const handleFileUpload = async (e) => {
    const receipt = e.target.files[0];
    const receiptBase64 = await fileToBase64(receipt);
    const receitName = receipt?.name;
    const receiptType = receipt?.type;

    setReceipt({
      data: receiptBase64,
      type: receiptType,
      name: receitName,
      status: "pending",
    });
  };

  useEffect(() => {
    if (!selectedProg) return;

    const requiredDocs = selectedProg.program_required_documents || [];
    const allDocs = Object.keys(studentDocuments || {});

    const missing = requiredDocs.filter(
      (eachDoc) => !allDocs.includes(eachDoc),
    );

    setMissingDocsList(missing);
  }, [selectedProg, studentDocuments]);

  const shortlistprogram = () => {
    dispatch(shortlistProgram({ student_id, program_id, university_id }))
      .unwrap()
      .then((res) => {
        if (res) {
          setShortlistId(res);
          setShortListed(true);
        }
      });
  };

  const removeShortlistProgram = () => {
    dispatch(
      DeleteShortlistPrograms({ student_id, shortlist_id: shortListedId }),
    )
      .unwrap()
      .then((res) => {
        if (res) {
          setShortListed(false);
        }
      });
  };

  useEffect(() => {
    dispatch(GetShortlistPrograms({ student_id }))
      .unwrap()
      .then((res) => {
        if (res) {
          res.find((element) => {
            if (
              element.university_id == university_id &&
              element.program_id == program_id
            ) {
              setShortlistId(element.id);
              setShortListed(true);
            }
            return false;
          });
        }
      });
  }, [student_id, university_id, program_id, dispatch]);

  return (
    <div id="dd-lvl-4" className="space-y-8">
      {showPaymentModal && (
        <PaymentProofModal
          open={showPaymentModal}
          onClose={() => {
            setReceipt({});
            setShowPaymentModal(false);
          }}
          handleFileUpload={(e) => handleFileUpload(e)}
          submitHandle={PaidApplyHandle}
          uploadedFile={receipt?.name}
        />
      )}
      {showApplyModal && (
        <ApplyConfirmationModal
          open={showApplyModal}
          university={selectedUni?.university_name}
          program={selectedProg?.program_name}
          onClose={() => setShowApplyModal(false)}
          applyHandle={freeApplyhandle}
        />
      )}
      {showMissingDocsModal && (
        <MissingDocumentsModal
          open={showMissingDocsModal}
          missingDocuments={missingDocList}
          onClose={() => setShowMissingDocsModal(false)}
        />
      )}
      {showIncompleteProfileModal && (
        <IncompleteProfileModal
          open={showIncompleteProfileModal}
          onClose={() => setIncompleteProfileModal(false)}
        />
      )}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 bg-white px-3 py-2 rounded-lg border shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-200"
      >
        <FaArrowLeft className="w-4 h-4" />
        Back to Programs
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1
              className="text-3xl font-bold text-slate-900 mb-4 leading-tight"
              id="lvl4-name"
            >
              {selectedProg?.program_name}
            </h1>
            <div className="flex gap-6 text-sm text-slate-500 font-medium mb-8">
              <span className="flex items-center gap-2" id="lvl4-uni">
                <FaUniversity className="text-slate-400" />
                {selectedProg?.university_name}
              </span>
              <span className="flex items-center gap-2" id="lvl4-deg">
                <FaGraduationCap className="text-slate-400" />
                Undergraduate
              </span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm mb-6 text-slate-900 uppercase tracking-wide flex items-center gap-3">
              <FaInfoCircle className="text-blue-500" />
              About the Program
            </h3>
            <p
              className="text-slate-600 leading-relaxed text-base mb-6"
              id="lvl4-desc"
            >
              {selectedProg?.program_description}
            </p>

            {/* ✅ New Tags Section */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-200">
              <h4 className="font-bold text-sm text-slate-900 mb-3 w-full uppercase tracking-wide">
                Degree Tags
              </h4>
              {selectedProg?.related_tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 rounded-lg text-xs font-medium hover:from-blue-200 hover:to-indigo-200 transition-all cursor-default shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6 h-32">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 hover:shadow-md transition flex flex-col items-center justify-center h-full text-center">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-3">
                Duration
              </span>
              <div className="font-black text-2xl text-slate-900 whitespace-nowrap">
                {selectedProg?.program_duration}
              </div>
            </div>

            {/* <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 hover:shadow-md transition flex flex-col items-center justify-center h-full text-center">
              <span className="text-xs font-bold text-purple-500 uppercase tracking-wide mb-3">
                Intake
              </span>
              <div className="font-black text-2xl text-slate-900 whitespace-nowrap">
                {selectedProg?.session_intake}
              </div>
            </div> */}

            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 hover:shadow-md transition flex flex-col items-center justify-center h-full text-center">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wide mb-3">
                Tuition{" "}
              </span>
              <div className="font-black text-2xl text-slate-900 whitespace-nowrap">
                {(selectedProg?.university_currency ? selectedProg?.university_currency : "$") +
                  " " +
                  selectedProg?.program_fee}
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 hover:shadow-md transition flex flex-col items-center justify-center h-full text-center">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-wide mb-3">
                Acceptance
              </span>
              <div className="font-black text-2xl text-slate-900 whitespace-nowrap">
                18%
              </div>
            </div>
          </div>

          {/*Prospective Intakes  */}

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm mb-6 text-slate-900 uppercase tracking-wide flex items-center gap-3">
              <FaCalendarAlt className="text-emerald-500" />
              Prospective Intakes
            </h3>

            <div className="flex flex-wrap gap-3">
              {!selectedProg?.session_intake?.includes("," )? (
                <div
                  key={selectedProg?.session_intake}
                  className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-medium text-sm"
                >
                  {selectedProg?.session_intake}
                </div>
              ) : (
                selectedProg.session_intake.split(",").map((intake, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-medium text-sm"
                  >
                    {intake}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Career Outcomes */}
         <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
  <h3 className="font-bold text-sm mb-6 text-slate-900 uppercase tracking-wide flex items-center gap-3">
    <FaBriefcase className="text-emerald-500" />
    Career Outcomes
  </h3>

  <ul className="space-y-3 text-sm text-slate-600" id="lvl4-careers">
    {selectedProg?.possible_careers?.map((career, index) => (
      <li key={index} className="flex items-start gap-3">
        <FaCheckCircle className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" />
        <span>{career}</span>
      </li>
    ))}
  </ul>
</div>

          {/* Requirements */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm mb-6 text-slate-900 uppercase tracking-wide">
              Requirements
            </h3>
            <ul className="space-y-3 text-sm text-slate-600" id="lvl4-reqs">
              {selectedProg?.program_requirements?.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1 w-4 h-4 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Modules & Structure */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm mb-6 text-slate-900 uppercase tracking-wide">
              Required Documents
            </h3>
            <div className="flex flex-wrap gap-2" id="lvl4-struct">
              {selectedProg?.program_required_documents?.map((mod, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-200 transition cursor-default"
                >
                  {mod}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar - EXACT from HTML */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200 sticky top-24">
            <div className="mb-8 text-center bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-2 bg-white px-3 py-1 rounded-md inline-block shadow-sm">
                Application Fee
              </span>
              <div className="capitalize text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                {selectedProg?.program_application_fee !== "free" &&
                  selectedProg?.university_currency}
                {selectedProg?.program_application_fee}
              </div>
              {/* {selectedProg?.program_application_fee === "free" && (
                <p className="text-sm text-emerald-600 font-semibold mt-2 flex items-center justify-center gap-1">
                  <FaCheckCircle className="w-4 h-4" />
                  free Application!
                </p>
              )} */}
            </div>

            {/* Annual Tuition (secondary) */}
            <div className="mb-8 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Annual Tuition
              </span>
              <div
                className="text-3xl font-black text-slate-900"
                id="sidebar-fee"
              >
                {selectedProg?.university_currency} {selectedProg?.program_fee}
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {shortListed ? (
                <button
                  onClick={() => removeShortlistProgram()}
                  className="w-full h-14 rounded-2xl border-2 border-red-200 bg-red-50 flex items-center justify-center text-red-500  hover:bg-red-100 transition-all duration-200 group"
                >
                  <FaHeart className="w-5 h-5 text-xl mr-2 fill-red-500" />
                  Shortlisted
                </button>
              ) : (
                <button
                  onClick={() => shortlistprogram()}
                  className="w-full h-14 rounded-2xl border-2 border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-200 group"
                >
                  <FaHeart className="w-5 h-5 text-xl mr-2 group-hover:text-red-500 transition-colors" />
                  Shortlist Program
                </button>
              )}

              {applied ? (
                <div className="relative px-2 w-full h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl shadow-xl flex items-center justify-center gap-3 text-white font-bold text-lg ring-2 ring-emerald-400/50">
                  <div className="absolute inset-0 top-0 left-0 right-0 bottom-0 " />
                  <span>Already Applied</span>
                </div>
              ) : (
                // Apply button (your original)
                <button
                  onClick={() => applyToUniversity()}
                  className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg flex items-center justify-center gap-2"
                >
                  Start Application
                  <FaFileAlt className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Footer */}
            {/* <div className="text-center pt-8 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-4">
                Powered by UniGlobal OS
              </p>
              <div className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl p-3 text-sm font-bold shadow-lg">
                <FaCheckCircle className="w-4 h-4 inline mr-2" />
                UniGPT Match Score: 95%
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
