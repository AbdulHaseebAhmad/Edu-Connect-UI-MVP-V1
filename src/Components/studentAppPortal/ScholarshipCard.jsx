import React from "react";
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

function ScholarshipCard({ item, onOpenDetails }) {
  const isUpcoming = item.status === "Upcoming";
  const statusClass = isUpcoming ? "status-upcoming" : "status-open";
  const statusIcon = isUpcoming ? (
    <FaClock />
  ) : (
    <FaCheckCircle />
  );

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex flex-col p-6 h-full relative overflow-hidden group cursor-pointer"
      onClick={() => onOpenDetails()}
    >
      <div
        className={`absolute top-0 left-0 w-1 h-full ${
          isUpcoming ? "bg-orange-400" : "bg-green-500"
        }`}
      />
      <div className="flex justify-between items-start mb-4 pl-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FaMapMarkerAlt className="text-gray-300 text-xs" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {item.country}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-tight">
            {item.title}
          </h3>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition">
          <FaArrowRight className="text-xs transform -rotate-45 group-hover:rotate-0 transition" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 pl-3">
        <span
          className={`${statusClass} px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1`}
        >
          {statusIcon} {item.status}
        </span>
        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
          {item.level}
        </span>
        <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase border border-green-100">
          {item.funding}
        </span>
      </div>

      <p className="text-slate-500 text-sm mb-6 flex-1 pl-3 group-hover:text-slate-600 transition">
        {item.description}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between pl-3 group-hover:border-blue-50 transition">
        <div className="text-xs font-bold text-slate-400">
          <span className={isUpcoming ? "text-orange-500" : "text-green-600"}>
            {isUpcoming
              ? `Opens: ${item.opens}`
              : `Deadline: ${item.deadline}`}
          </span>
        </div>
        <span className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition transform translate-x-2 group-hover:translate-x-0">
          View Details
        </span>
      </div>
    </div>
  );
}

export default ScholarshipCard;