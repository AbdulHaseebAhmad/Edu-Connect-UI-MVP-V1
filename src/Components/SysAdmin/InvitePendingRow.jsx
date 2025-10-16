import { FaExclamationCircle, FaClock } from "react-icons/fa";

export default function InvitePendingRow({school,subtitle,priority,onClick}) {

  const badge =  priority === 'urgent' ? 'High Priority' : priority == 'medium' ? 'Medium Priority' : 'Low Priortiy';
  const icon = priority != "urgent" ? priority != "medium" ? <FaClock className="text-indigo-600" /> : <FaClock className="text-yellow-500" /> :<FaExclamationCircle className="text-pink-500" />
  const badgeBackground = priority == "urgent" ? "bg-pink-100 text-pink-500" : priority == "medium" ? "bg-yellow-100 text-yellow-600" : "bg-indigo-100 text-indigo-600"
          
  return (
    <div
      className={`flex py-5 border-b border-slate-200 gap-5 items-center transition hover:bg-gray-50`}>
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-semibold">{school}</div>
        <div className="text-sm text-slate-500 mb-1">{subtitle}</div>
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${badgeBackground}`}>
          {badge}
        </div>
      </div>
      <div>
        <button onClick={onClick} className="bg-indigo-600 text-white rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-2 cursor-pointer">
          <i className="fa fa-eye"></i>
          <span>Review</span>
        </button>
      </div>
    </div>
  );
}
