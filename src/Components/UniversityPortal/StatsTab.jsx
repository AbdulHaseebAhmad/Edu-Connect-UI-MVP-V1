import { FaCheckCircle, FaInfoCircle, FaPlusCircle, FaTrash, FaTrophy } from "react-icons/fa";

export default function StatsTab() {
  return (
    <div className="space-y-4 max-w-4xl">
      <div className="bg-indigo-50 p-4 rounded-xl flex items-center gap-2 text-xs text-indigo-800">
        <FaInfoCircle /> These appear on the university card
      </div>

      {[
        {
          l: "Global Ranking",
          v: "1",
          icon: <FaTrophy className="text-yellow-500" />,
        },
        {
          l: "Acceptance Rate",
          v: "14%",
          icon: <FaCheckCircle className="text-green-500" />,
        },
      ].map((s, i) => (
        <div key={i} className="stat-row">
          <input defaultValue={s.l} className="stat-input" />
          <input defaultValue={s.v} className="stat-input" />
          <div className="icon-box">{s.icon}</div>
          <button className="text-red-500">
            <FaTrash />
          </button>
        </div>
      ))}

      <button className="text-indigo-600 text-xs font-bold flex items-center gap-2">
        <FaPlusCircle /> Add Statistic
      </button>
      <div className="pt-6">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 active:scale-95 text-sm font-bold">
          Save Changes
        </button>
      </div>
    </div>
  );
}
