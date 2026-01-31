import { FaEye, FaCheckCircle, FaBan, FaSchool } from "react-icons/fa";

export default function PendingApprovalCard({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      <div className="relative mb-4">
        <div className="bg-indigo-50 w-full h-32 rounded-xl flex items-center justify-center text-indigo-500 text-4xl">
          <FaSchool />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-slate-800">{data.schoolName}</h3>
        <p className="text-slate-500 text-sm">Admin: {data.adminName}</p>
        <p className="text-slate-500 text-sm">Applied: {data.date}</p>
        <p className="text-sm mt-2 inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full w-fit font-medium">
          {/* {data.status} */} Pending Approval
        </p>
      </div>

      <div className="flex  gap-2 justify-between mt-6">
        <button className="flex min-w-[100px] items-center justify-center gap-2 bg-gray-100 text-red-600 px-4 py-2 rounded-lg hover:bg-gray-200">
          <FaBan /> Reject
        </button>
        <button className="flex min-w-[100px] items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200">
          <FaEye /> View
        </button>
        <button className="flex min-w-[100px] items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          <FaCheckCircle /> Approve
        </button>
      </div>
    </div>
  );
}
