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
  const [documentListFromDb, setdocumentListfromDb] = useState({});
  const fileInputRef = useRef(null); // Hidden file input ref
  const [documentname, setDocumentname] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [readiness, setReadiness] = useState("0%");

  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.authReducer.user_id);

  useEffect(() => {
    dispatch(GetStudentDocuments(user_id))
      .unwrap()
      .then((res) => {
        if (res) {
          setdocumentListfromDb(res);
        }
      });
  }, [refetch]);

  useEffect(() => {
    const uploadedList = Object.values(documentListFromDb).filter(
      (eachDoc) => eachDoc?.Status === "uploaded"
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
        }
      });
  };

  const viewStudentDoc = (docname, mimetype) => {
    dispatch(
      ViewStudentDocuments({
        student_id: user_id,
        docname: docname,
        mimetype: mimetype,
      })
    );
  };

  return (
    <div className="fade-in space-y-6">
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
            return (
              <span
                className={`flex items-center gap-1 font-bold ${
                  documentListFromDb?.[doc?.labelname]?.Status === "missing"
                    ? "text-red-700 "
                    : documentListFromDb?.[doc?.labelname]?.Status ===
                      "uploaded"
                    ? "text-green-700"
                    : "text-orange-700"
                }`}
              >
                {doc?.icon}
                {doc?.label}
                {documentListFromDb?.[doc?.labelname]?.Status === "missing" ? (
                  <FaTimesCircle />
                ) : (
                  <FaCheckCircle />
                )}
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
            {documentsList?.map((eachDocument, index) => {
              return documentListFromDb?.[eachDocument?.labelname]?.Status !==
                "missing" ? (
                <tr className="hover:bg-slate-50 transition" key={index}>
                  <td className="px-8 py-5 font-bold text-slate-700 flex items-center gap-2">
                    {eachDocument?.icon}
                    {eachDocument?.label}
                  </td>
                  <td className="px-8 py-5">
                    {eachDocument?.requirement === "Mandatory" ? (
                      <span className="bg-red-100 text-red-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Mandatory
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Recommended
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-center">
                    {documentListFromDb?.[eachDocument?.labelname]?.Status !==
                      "missing" && (
                      <span className="text-green-600 font-bold flex items-center gap-1 justify-center">
                        <>
                          <FaCheckCircle />
                          Verified
                        </>
                      </span>
                    )}
                    {documentListFromDb?.[eachDocument?.labelname]?.Status ===
                      "pending" && (
                      <span className="text-orange-600 font-bold flex items-center gap-1 justify-center">
                        <FaClock />
                        Pending Review
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-center text-xs text-slate-500">
                    2.1 MB
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() =>
                        viewStudentDoc(
                          eachDocument?.name,
                          documentListFromDb?.[eachDocument?.labelname]
                            ?.MimeType
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 font-bold text-sm mr-3"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        viewStudentDoc(
                          eachDocument?.name,
                          documentListFromDb?.[eachDocument?.labelname]
                            ?.MimeType
                        )
                      }
                      className="text-slate-400 hover:text-slate-600 text-sm"
                    >
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr
                  className="hover:bg-red-50/50 transition bg-red-50/20"
                  key={index}
                >
                  <td className="px-8 py-5 font-bold text-slate-400 italic flex items-center gap-3">
                    <i className="fas fa-file-upload text-red-400 text-lg" />
                    {eachDocument?.label}
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {eachDocument?.requirement}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-red-500 font-bold flex items-center gap-1 justify-center">
                      <FaTimesCircle />
                      {documentListFromDb?.[eachDocument?.labelname]?.Status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center text-xs text-slate-400">
                    —
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      name={eachDocument?.name}
                      onClick={(e) => uploadDocuments(e)}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm transition"
                    >
                      Upload
                    </button>
                  </td>
                  {/* <td>
                    
                  </td> */}
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
