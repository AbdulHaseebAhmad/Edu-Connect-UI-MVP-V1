import { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaCheck,
  FaTimes,
  FaPlus,
  FaUndo,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  getSchoolApplications,
  respondToInvite,
} from "../../../Features/Admin_Features/AdminSlice";
import Modal from "../../../Modals/ModalContainer";
import ReviewAppForm from "../../../Components/SysAdmin/ReviewAppForm";
import toast from "react-hot-toast";

const SchoolApplicationsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [status, setStatus] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const id = toast.loading("Fetching School Applications");
    dispatch(getSchoolApplications({ limit: 50, offlimit: 0 }))
      .unwrap()
      .then((res) => {
        if (res) {
          setApplications(res);
          toast.success("School Applications Fetched Succesfully", { id });
        }
      })
      .catch((e) => toast.error("Fetching School Applications Failed", { id }));
  }, [refetch]);

  const showEditPanelHandle = () => {
    setOpenModal(!openModal);
  };

  const respondToApplication = (appId, status) => {
    let responseStatus = status == "approved" ? "Approving" : "Rejecting";
    const id = toast.loading(`${responseStatus} School Applications`);
    dispatch(respondToInvite({ appid: appId, status: status }))
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success(`School Application ${status}`,{id});
          setRefetch(!refetch);
        }
      })
      .catch((e) => {
        toast.error(`There was an error ${responseStatus} School Application`,{id});
      });
  };
 
  const renderStatusBadge = (status) => {
    const base =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide";

    switch (status) {
      case "completed":
        return (
          <span className={`${base} bg-amber-200 text-amber-700`}>
            • Pending
          </span>
        );
      case "approved":
        return (
          <span className={`${base} bg-emerald-200 text-emerald-700`}>
            • Approved
          </span>
        );
      case "rejected":
        return (
          <span className={`${base} bg-red-200 text-red-700`}>• Rejected</span>
        );
      case "urgent":
        return (
          <span className={`${base} bg-red-200 text-red-700`}>• Urgent</span>
        );
      default:
        return (
          <span className={`${base} bg-slate-100 text-slate-600`}>
            • {status}
          </span>
        );
    }
  };

  const renderActions = (status, applicationId) => {
    if (status === "completed") {
      return (
        <div className="inline-flex gap-2">
          <button
            onClick={() => respondToApplication(applicationId, "rejected")}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-[11px] font-bold flex items-center gap-1"
          >
            <FaTimes /> Reject
          </button>
          <button
            onClick={() => {
              respondToApplication(applicationId, "approved");
            }}
            className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[11px] font-bold flex items-center gap-1"
          >
            <FaCheck /> Approve
          </button>
          <button
            onClick={() => {
              setStatus(status);
              setApplicationId(applicationId);
              showEditPanelHandle();
            }}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1"
          >
            <FaEye /> View
          </button>
        </div>
      );
    }

    if (status === "approved") {
      return (
        <div className="inline-flex gap-2">
          {/* <button onClick={()=>unApproveHandle(applicationId)} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-[11px] font-bold flex items-center gap-1">
            <FaUndo /> Unapprove
          </button> */}
          <button
            onClick={() => {
              setStatus(status);
              setApplicationId(applicationId);
              showEditPanelHandle();
            }}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1"
          >
            <FaEye /> View
          </button>
        </div>
      );
    }

    return (
      <div className="flex justify-center pl-2 gap-2">
        <button
          onClick={() => {
            setStatus(status);
            setApplicationId(applicationId);
            showEditPanelHandle();
          }}
          className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1"
        >
          <FaEye /> View
        </button>
      </div>
    );
  };

  return (
    <div className="fade-in px-4 pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            School Applications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review applications submitted by schools.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Key */}
          <div className="hidden md:flex items-center gap-3 text-[11px] bg-white border border-slate-200 rounded-full px-4 py-1 shadow-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-amber-400 rounded-full" /> Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Approved
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full" /> Rejected
            </span>
          </div>

          {/* Search */}
          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
            <div className="relative w-56">
              <FaSearch className="absolute left-3 top-2.5 text-slate-400 text-xs" />
              <input
                placeholder="Search school or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 rounded-full text-[11px] outline-none"
              />
            </div>
          </div>

          {/* CTA */}
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700">
            <FaPlus />
            Add School Manually
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-6">
        <table className="w-full">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-3">School</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Application ID</th>
              <th className="px-6 py-3">Applied On</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Priority</th>

              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-xs">
            {applications?.length > 0 &&
              applications?.map((app) => (
                <tr
                  key={app.application_id}
                  className="hover:bg-slate-50 text-center"
                >
                  <td className="px-6 py-4 font-bold">{app.school_name}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {app.school_email}
                  </td>
                  <td className="px-6 py-4 font-mono">{app.application_id}</td>
                  <td className="px-6 py-4">{app.created_at}</td>
                  <td className="px-6 py-4">{renderStatusBadge(app.status)}</td>
                  <td className="px-6 py-4 ">
                    {renderStatusBadge(app.priority)}
                  </td>
                  <td className="px-6 py-4">
                    {renderActions(app.status, app?.application_id)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {openModal && (
        <Modal
          isOpen={open}
          onClose={showEditPanelHandle}
          title="Review Application"
        >
          <ReviewAppForm appId={applicationId} status={status} />
        </Modal>
      )}
    </div>
  );
};

export default SchoolApplicationsTable;
