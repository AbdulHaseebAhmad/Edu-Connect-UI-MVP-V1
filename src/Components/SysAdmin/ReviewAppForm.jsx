import React from 'react'

export default function ReviewAppForm() {
  return (
    <div className=" mx-auto bg-white rounded-xl shadow-lg flex overflow-hidden">
      <form className="flex-1 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="schoolName" className="block mb-2 font-semibold text-gray-900">
              School Name <span className="text-red-500">*</span>
            </label>
            <input
              id="schoolName"
              type="text"
              placeholder="Enter school name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mt-10 flex justify-end gap-4">
          <button
            type="button"
            className="px-7 py-3 rounded-lg font-semibold border border-blue-600 text-blue-600 hover:bg-blue-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-7 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <i className="fas fa-plus-circle"></i>
            Create School Account
          </button>
        </div>
      </form>
    </div>
  )
}
