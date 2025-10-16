import { useDispatch, useSelector } from "react-redux";
import DocReviewCard from "./DocReviewCard";
import { Documents } from "./Constants";
import { useEffect, useState } from "react";
import Modal from "../../Modals/test";
import ReviewAppForm from "./ReviewAppForm";

export default function ApprovalReviewPanel() {
    const [openModal, setOpenModal] = useState(false);

  const applications = useSelector(
    (state) => state.analyticsReducer.applications
  );
  const applications1 = useSelector(
    (state) => state.analyticsReducer.applicationinreview
  );
  const isEmptyApplication = (obj) => {
    return (
      obj &&
      typeof obj === "object" &&
      !Array.isArray(obj) &&
      Object.keys(obj).length === 0
    );
  };

  const showEditPanelHandle = () =>{
    setOpenModal(!openModal)
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden h-[750px]">
      <div className="p-6 font-semibold text-lg border-b border-slate-200 flex items-center justify-between">
        <span>Document Review</span>
        <select className="bg-white rounded-lg px-4 py-2 font-medium border border-slate-200 min-w-[200px]">
          {applications.map((eachApplication, index) => {
            return <option key={index}>{applications1.schoolName || eachApplication.schoolName}</option>;
          })}
        </select>
      </div>
      {isEmptyApplication(applications1) ? (
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
            <div className="w-56">
              <h2 className="font-medium">Select a School</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div>
            <div className="flex items-center mb-4 gap-2">
              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-medium">
                Pending
              </span>
              <span className="text-slate-400 ml-2">Deadline: Nov 5, 2023</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
              {Documents.map((doc, i) => (
                <DocReviewCard
                  key={i}
                  name={doc.name}
                  status={doc.status}
                  i={i}
                  onClick={showEditPanelHandle}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-center  py-6 border-t border-slate-200 mt-[45%]">
            <button className="bg-indigo-600 text-white rounded-lg px-4 py-2 font-medium flex items-center gap-3 cursor-pointer">
              <i className="fa fa-check-circle"></i>
              <span>Approve School</span>
            </button>
            <button className="bg-white border border-slate-200 text-slate-800 rounded-lg px-4 py-2 font-medium flex items-center gap-3 cursor-pointer hover:bg-gray-50 hover:border-indigo-600">
              <i className="fa fa-comment"></i>
              <span>Request Documents</span>
            </button>
            <button className="bg-gray-100 text-slate-600 rounded-lg px-4 py-2 font-medium flex items-center gap-3 cursor-pointer">
              <i className="fa fa-ban"></i>
              <span>Reject</span>
            </button>
          </div>
        </div>
      )}
       {openModal && <Modal isOpen={open} onClose={showEditPanelHandle} title="Review Application">
        <ReviewAppForm/>
        </Modal>}
    </div>
  );
}
