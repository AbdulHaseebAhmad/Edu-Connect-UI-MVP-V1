import { useEffect, useState } from "react";
import { FaCheckCircle, FaComment, FaBan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { reviewSchoolFormFields } from "./Constants";
import { reviewFormFieldGenerator } from "../../Utillities/helpFunctions";
import { respondToInvite } from "../../Features/Admin_Features/AdminSlice";

export default function ReviewAppForm({ onClose }) {
  const application = useSelector(
    (state) => state.analyticsReducer.applicationinreview
  );
  const dispatch = useDispatch();

  const applicationinreview = useSelector(
    (state) => state.analyticsReducer.applicationinreview
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    const formatedFields = reviewFormFieldGenerator(
      reviewSchoolFormFields,
      application
    );
    console.log(formatedFields);
    setData(formatedFields);
  }, [application]);

  const applicationExist = data.length > 0;

  const approveHandle = () => {
    dispatch(
      respondToInvite({ appid: applicationinreview.token, status: "approved" })
    );
  };

  const rejectHandle = () => {
    dispatch(
      respondToInvite({ appid: applicationinreview.token, status: "rejected" })
    );
  };

  return (
    <div className=" mx-auto bg-white rounded-xl shadow-lg flex overflow-hidden">
      <form className="flex-1 p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {applicationExist &&
            data.map((field, index) => (
              <div key={index} className="w-[240px]">
                <label
                  htmlFor="schoolName"
                  className="block mb-2 font-semibold text-gray-900"
                >
                  {field[0][0]}
                </label>
                <input
                  id="schoolName"
                  value={field[0][1]}
                  type="text"
                  placeholder="Enter school name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
            ))}
        </div>
        <div className="flex gap-2 justify-center items-end h-[15%] border-t border-slate-200 mt-[10%]">
          <button
          type="button"
            onClick={approveHandle}
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 min-h-[50px] font-medium flex items-center gap-3 cursor-pointer"
          >
            <FaCheckCircle className="text-white" />
            <span>Approve School</span>
          </button>
          <button className="bg-white border border-slate-200 text-slate-800 rounded-lg px-4 py-2 min-h-[50px] font-medium flex items-center gap-3 cursor-pointer hover:bg-gray-50 hover:border-indigo-600">
            <FaComment className="text-blue-600" />
            <span>Request Documents</span>
          </button>
          <button
            type="button"
            onClick={rejectHandle}
            className="bg-gray-100 text-slate-600 rounded-lg px-4 py-2 min-h-[50px] font-medium flex items-center gap-3 cursor-pointer"
          >
            <FaBan className="text-red-600" />
            <span>Reject</span>
          </button>
        </div>
      </form>
    </div>
  );
}
