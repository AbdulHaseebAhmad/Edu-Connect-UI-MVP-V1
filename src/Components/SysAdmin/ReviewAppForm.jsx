import { useEffect, useState } from "react";
import { FaCheckCircle, FaComment, FaBan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { reviewSchoolFormFields } from "./Constants";
import { reviewFormFieldGenerator } from "../../Utillities/helpFunctions";
import {
  getSchoolApplicationDetail,
  respondToInvite,
} from "../../Features/Admin_Features/AdminSlice";

export default function ReviewAppForm({ appId,status }) {
  const fields = [
    {label:"Application Id",name:"application_id"},
    {label:"Registration Code", name:"registration_code"},
    {label:"School Id", name:"school_id"},
    {label:"School Name", name:"school_name"},
    {label:"Admin Name",name:"admin_name"},
    {label:"Email", name:"school_email"},
    {label:"Phone", name:"school_phone"},
    {label:"Branch", name:"school_branch"},
    {label:"City", name:"school_city"},
    {label:"Country", name:"school_country"},
    {label:"Curriculum Type", name:"school_curriculum"},
  ];

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getSchoolApplicationDetail(appId))
      .unwrap()
      .then((res) => {
        if (res) {
          setData(res);
        }
      });
  }, []);

  const approveHandle = () => {
    dispatch(
      respondToInvite({ appid: appId, status: "approved" })
    );
  };

  const rejectHandle = () => {
    dispatch(
      respondToInvite({ appid: appId, status: "rejected" })
    );
  };

  return (
    <div className=" mx-auto bg-white rounded-xl shadow-lg flex overflow-hidden">
      <form className="flex-1 p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fields.map((field,index) => (
              <div key={index} className="w-[240px]">
                <label
                  htmlFor={field.name}
                  className="block mb-2 font-semibold text-gray-900"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={data?.[field?.name]}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
            ))}
        </div>
        {status == "completed" && <div className="flex gap-6 justify-end items-end h-[15%] border-t border-slate-200 mt-[10%]">
          <button
            type="button"
            onClick={approveHandle}
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 min-h-[50px] font-medium flex items-center gap-3 cursor-pointer"
          >
            <FaCheckCircle className="text-white" />
            <span>Approve School</span>
          </button>
          {/* <button className="bg-white border border-slate-200 text-slate-800 rounded-lg px-4 py-2 min-h-[50px] font-medium flex items-center gap-3 cursor-pointer hover:bg-gray-50 hover:border-indigo-600">
            <FaComment className="text-blue-600" />
            <span>Request Documents</span>
          </button> */}
          <button
            type="button"
            onClick={rejectHandle}
            className="bg-red-200 text-slate-600 rounded-lg px-4 py-2 min-h-[50px] font-medium flex items-center gap-3 cursor-pointer"
          >
            <FaBan className="text-red-600" />
            <span className="text-red-700">Reject</span>
          </button>
        </div>}
      </form>
    </div>
  );
}
