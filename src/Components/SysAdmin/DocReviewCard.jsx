import {
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";

export default function DocReviewCard({ name, status }) {
    const badgeBackground = status === "missing" ? "text-pink-500 bg-pink-100" : status === "verified" ? "text-green-500 bg-green-50" : "text-yellow-600 bg-yellow-100 "
    const badgeIcon = status === "missing" ? <FaExclamationCircle /> : status === "verified" ?  <FaCheckCircle /> : <FaClock />
    const badge = status === "missing" ? "Missing" : status === "verified" ? "Verified" : "Pending"
          
  return (
    <div className="border border-slate-200 rounded-xl cursor-pointer transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-600 overflow-hidden">
      <div className="h-36 bg-gray-50 flex items-center justify-center text-4xl text-indigo-600">
        <FaFileAlt />
      </div>
      <div className="p-4 border-t border-slate-200">
        <div className="text-sm font-medium mb-1 truncate">{name}</div>
        <div
          className={`flex items-center justify-center gap-1 text-xs w-fit px-2 py-1 ${badgeBackground}`}>
          {badgeIcon}
          {badge}
        </div>
      </div>
    </div>
  );
}
