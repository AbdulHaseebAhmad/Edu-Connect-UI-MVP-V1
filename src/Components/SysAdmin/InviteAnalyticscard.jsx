import {
  FaClock,
  FaExclamationCircle,
  FaFileAlt,
  FaExclamationTriangle,
  FaChartLine,
  FaArrowUp,
  
} from "react-icons/fa";
export default function InviteAnalyticscard({name,quantity,action,stats}) {
  
  const cardIcon = name === 'Pending Approvals'? <FaClock className="text-[#4361ee]"/> : name === "Document Status" ? <FaFileAlt className="text-[#e6b400]"/>:<FaChartLine className="text-[#06b288]"/>
  const iconBackground = name === 'Pending Approvals'? 'bg-[#4361ee26]' : name === "Document Status" ? "bg-[#ffd16626]":"bg-[#06d6a026]"

  const actionIcon =  name === 'Pending Approvals'? <FaExclamationCircle className="text-[#4361ee]"/> : name === "Document Status" ? <FaExclamationTriangle className="text-[#e6b400]"/>:<FaArrowUp className="text-[#06b288]"/>
  const actionIconbgcolor =  name === 'Pending Approvals'? "bg-[#e0e7ff] text-[#4361ee]" : name === "Document Status" ? "bg-[#fef9c3] text-[#e6b400]" : "bg-[#f3f4f6] text-[#06b288]"
 
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <div className="flex justify-between mb-4">
        <div className="font-semibold text-slate-800">{name}</div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${iconBackground}`}>
          {cardIcon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-2">{quantity}</div>
      <div className="text-base text-slate-500">{action}</div>
      <div className={`inline-block flex items-center gap-2 pl-2 pr-6 w-fit py-2 rounded-full text-sm font-medium mt-4 ${actionIconbgcolor}`} >
        {actionIcon}{stats}
      </div>
    </div>
  );
}
