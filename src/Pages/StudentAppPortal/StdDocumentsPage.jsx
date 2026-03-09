import { useEffect, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaCross,
  FaDownload,
  FaEnvelope,
  FaFileAlt,
  FaFileInvoice,
  FaIdCard,
  FaPassport,
  FaRegCheckCircle,
  FaTasks,
  FaTicketAlt,
  FaTimesCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  GetStudentDocuments,
  UploadStudentDocuments,
  ViewStudentDocuments,
} from "../../Features/Students_Features/StudentAppSlice";
import { fileToBase64 } from "../../Utillities/helpFunctions";

const documentsList = [
  {
    name: "cv",
    labelname: "cv",
    requirement: "Recommended",
    icon: <FaPassport className="text-blue-500 text-lg" />,
    label: "Cv",
  },
  {
    name: "passport",
    labelname: "passport",
    requirement: "Mandatory",
    icon: <FaFileInvoice className="text-green-500 text-lg" />,
    label: "Passport",
  },
  {
    name: "identity",
    labelname: "identity",
    requirement: "Mandatory",
    icon: <FaIdCard className="text-orange-500 text-lg" />,
    label: "Identity",
  },
  {
    name: "language_proefficiency",
    labelname: "language_proefficiency",
    requirement: "Mandatory",
    icon: <FaFileInvoice className="text-yellow-500 text-lg" />,
    label: "English language",
  },
  {
    name: "high_school",
    labelname: "high_school",
    requirement: "Mandatory",
    icon: <FaFileAlt className="text-purple-500 text-lg" />,
    label: "High School Diploma",
  },
  {
    name: "cover_letter",
    labelname: "cover_letter",
    requirement: "Recommended",
    icon: <FaEnvelope className="text-red-500 text-lg" />,
    label: "Cover Letter",
  },
  {
    name: "motivation_letter",
    labelname: "motivation_letter",
    requirement: "Recommended",
    icon: <FaEnvelope className="text-pink-500 text-lg" />,
    label: "Motivation Letter",
  },
];

export function DocumentsPage() {
  const [documentListFromDb, setdocumentListfromDb] = useState([]);
  const fileInputRef = useRef(null); // Hidden file input ref
  const [documentname, setDocumentname] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [readiness, setReadiness] = useState("0%");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.authReducer.user_id);

  useEffect(() => {
    setLoading(true);
    dispatch(GetStudentDocuments(user_id))
      .unwrap()
      .then((res) => {
        if (res) {
          setdocumentListfromDb(res);
          setLoading(false);
        }
      });
  }, [refetch]);

  useEffect(() => {
    const uploadedList =
      documentListFromDb?.length > 0 &&
      documentListFromDb?.filter(
        (eachDoc) => eachDoc?.document_status !== "uploaded",
      );
    setReadiness(`${Math.round((uploadedList.length / 7) * 100)}%`);
  }, [documentListFromDb]);

  const uploadDocuments = (e) => {
    e.stopPropagation();
    console.log("hi");
    setDocumentname(e.target.name);
    fileInputRef.current.value = "";
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    setLoading(true);

    const file = e.target.files?.[0];
    if (!file) return;
    const documentData = await fileToBase64(file);
    const document = {
      data: {
        name: file?.name,
        type: file?.type,
        status: "uploaded",
        data: documentData,
        document_name: documentname,
      },
      student_id: user_id,
    };
    dispatch(UploadStudentDocuments(document))
      .unwrap()
      .then((res) => {
        if (res) {
          setRefetch(!refetch);
          setLoading(false);
        }
      });
  };

  const viewStudentDoc = (document_id, mimetype) => {
    dispatch(
      ViewStudentDocuments({
        student_id: user_id,
        document_id: document_id,
        mimetype: mimetype,
      }),
    );
  };

  return (
    <div className="relative fade-in space-y-6">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-600">
              Loading documents...
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Document Vault</h1>
        <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm shadow hover:bg-blue-700 transition">
          Upload New
        </button>
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
          <FaTasks className="text-blue-600" />
          Application Readiness
        </h3>
        <div className="flex gap-2 mb-2">
          <div className="flex-1 h-2 bg-blue-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full shadow-sm"
              style={{ width: readiness }}
            />
          </div>
          <span className="text-xs font-bold text-blue-700">{readiness}</span>
        </div>
        <div className="flex gap-4 text-xs flex-wrap">
          {documentsList?.map((doc) => {
            const dbDoc = documentListFromDb?.find(
              (eachDoc) => eachDoc?.name === doc.labelname,
            );
            const status = dbDoc?.status || "missing";
            return (
              <span
                key={doc?.name}
                className={`flex items-center gap-1 font-bold ${
                  status === "missing"
                    ? "text-red-700 "
                    : status === "uploaded"
                      ? "text-green-700"
                      : "text-orange-700"
                }`}
              >
                {doc?.icon}
                {doc?.label}
                {status === "missing" ? <FaTimesCircle /> : <FaCheckCircle />}
              </span>
            );
          })}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-xs">
            <tr>
              <th className="px-8 py-5">Document</th>
              <th className="px-8 py-5">Requirement</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-center">Size</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documentsList.map((doc, index) => {
              const dbDoc = documentListFromDb?.find(
                (eachDoc) => eachDoc?.name === doc.labelname,
              );
              const status = dbDoc?.status || "missing";

              return (
                <tr
                  key={index}
                  className={`transition hover:bg-slate-50 ${
                    status === "missing"
                      ? "bg-red-50/30 hover:bg-red-50/50"
                      : ""
                  }`}
                >
                  {/* Document Column */}
                  <td className="px-8 py-5 font-bold text-slate-700 flex items-center gap-2">
                    {doc.icon}
                    {doc.label}
                  </td>

                  {/* Requirement Column */}
                  <td className="px-8 py-5">
                    {doc.requirement === "Mandatory" ? (
                      <span className="bg-red-100 text-red-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Mandatory
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Recommended
                      </span>
                    )}
                  </td>

                  {/* Status Column */}
                  <td className="px-8 py-5 text-center">
                    {status === "uploaded" && (
                      <span className="text-green-600 font-bold flex items-center gap-1 justify-center">
                        <FaCheckCircle />
                        Verified
                      </span>
                    )}
                    {status === "pending" && (
                      <span className="text-orange-600 font-bold flex items-center gap-1 justify-center">
                        <FaClock />
                        Pending Review
                      </span>
                    )}
                    {status === "missing" && (
                      <span className="text-red-500 font-bold flex items-center gap-1 justify-center">
                        <FaTimesCircle />
                        Missing
                      </span>
                    )}
                  </td>

                  {/* Size Column */}
                  <td className="px-8 py-5 text-center text-xs text-slate-500">
                    {dbDoc ? "2.1 MB" : "—"}
                  </td>

                  {/* Action Column */}
                  <td className="px-8 py-5 text-right">
                    {status === "missing" ? (
                      /* Missing: Upload button */
                      <button
                        name={doc.name}
                        onClick={(e) => uploadDocuments(e)}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm transition"
                      >
                        Upload
                      </button>
                    ) : (
                      /* Uploaded/Pending: View + Download buttons */
                      <>
                        <button
                          onClick={() =>
                            viewStudentDoc(
                              dbDoc.document_id, // ✅ doc.name (cv, passport, etc.)
                              dbDoc?.type, // ✅ dbDoc.type (application/pdf)
                            )
                          }
                          className="text-blue-600 hover:text-blue-800 font-bold text-sm mr-3 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            viewStudentDoc(
                              doc.name, // ✅ doc.name
                              dbDoc?.type, // ✅ dbDoc.type
                            )
                          }
                          className="text-slate-400 hover:text-slate-600 text-sm p-1 hover:bg-slate-100 rounded transition-all"
                          title="Download"
                        >
                          <FaDownload />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept="application/pdf,image/jpeg,image/png,application/msword" // Adjust for your docs
        />
      </div>
    </div>
  );
}
