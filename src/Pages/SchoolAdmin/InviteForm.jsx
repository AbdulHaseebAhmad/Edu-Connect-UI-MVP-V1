import { useState } from "react";
import { InviteFormInputs } from "../SysAdmin/constants";

export default function InviteForm() {
      const [formData, setFormData] = useState({});
    
  const onChangeandle = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmitHandle = (e) => {
    e.preventDefault()
  }
  return (
    <form className="space-y-6" onSubmit={(e)=>{onSubmitHandle(e)}}>
      {InviteFormInputs.map((e, index) =>
        e.type != "select" ? (
          <div className="form-group" key={e.label + index}>
            <label className="block text-gray-800 font-medium mb-2">
              {e.label}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              name={e.name}
              type={e.type}
              placeholder={e.placeholder}
              required={e.required}
              onChange={(e) => onChangeandle(e)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        ) : (
          <div className="form-group" key={e.label + index}>
            <label className="block text-gray-800 font-medium mb-2">
              {e.label}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name={e.name}
              type={e.type}
              onChange={(e) => onChangeandle(e)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3  focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {e.options.map((e, index) => (
                <option key={e + index} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        )
      )}
      <div className="flex justify-between items-center border-t border-gray-200 mt-10 pt-8">
        <button className="px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition">
          Cancel
        </button>
        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
          Continue to Verification
        </button>
      </div>
    </form>
  );
}
