import React from 'react'

export default function InviteStep({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center relative group">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
          active
            ? "bg-blue-600 border-blue-600 text-white shadow-lg"
            : "border-gray-300 text-gray-400 bg-white"
        }`}
      >
        {icon}
      </div>
      <span
        className={`mt-2 text-sm font-medium ${
          active ? "text-gray-800" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  )
}
