import { FaEye, FaSchool } from "react-icons/fa";

export default function ApprovedApplicationCard({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      {/* Thumbnail and Title */}
      <div className="relative mb-4">
        <div className="bg-indigo-50 w-full h-32 rounded-xl flex items-center justify-center text-indigo-500 text-4xl">
          <FaSchool />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-slate-800">{data.name}</h3>
        <p className="text-slate-500 text-sm">Admin: {data.admin}</p>
        <p className="text-slate-500 text-sm">Applied: {data.date}</p>
        <p className="text-sm mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full w-fit font-medium">
          {data.status}
        </p>
      </div>

      {/* Single View Button */}
      <div className="flex justify-start mt-6">
        <button className="min-w-[300px] flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200">
          <FaEye /> View
        </button>
      </div>
    </div>
  );
}
