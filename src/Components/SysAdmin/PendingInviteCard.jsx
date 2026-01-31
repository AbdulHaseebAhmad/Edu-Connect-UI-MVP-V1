import { FaCheckCircle, FaBan, FaSchool, FaBell } from "react-icons/fa";

export default function PendingInviteCard({ data }) {
  return (
    <div className="flex items-center gap-6 px-6 py-5 hover:bg-zinc-50 transition">
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-100 text-zinc-600">
        <FaSchool />
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-zinc-900">{data.name}</h3>
          <span className="text-xs uppercase tracking-wide text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
            {data.status}
          </span>
        </div>

        <div className="mt-1 text-sm text-zinc-500 flex gap-6">
          <span>Admin: {data.admin}</span>
          <span>Sent: {data.date}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 rounded-md border border-zinc-300
                     px-3 py-2 text-sm text-zinc-700
                     hover:bg-zinc-100 transition"
        >
          <FaBan className="text-red-500" />
          Cancel
        </button>

        <button
          className="flex items-center gap-2 rounded-md bg-zinc-900
                     px-3 py-2 text-sm text-white
                     hover:bg-zinc-800 transition"
        >
          <FaBell />
          Reminder
        </button>
      </div>
    </div>
  );
}
