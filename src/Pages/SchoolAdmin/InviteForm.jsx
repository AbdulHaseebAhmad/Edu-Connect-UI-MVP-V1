import { useDispatch } from "react-redux";
import { InviteFormInputs } from "../SysAdmin/Schools/constants";
import { useState } from "react";
import { submitSchoolInfo } from "../../Features/School_Features/SchoolSlice";

export default function InviteForm({ token, statusChange }) {
  const dispatch = useDispatch();

  // ✅ Initialize defaults properly
  const [formData, setFormData] = useState(() => {
    const initial = {};

    InviteFormInputs.forEach((field) => {
      if (field.type === "select") {
        initial[field.name] = field.options?.[0] || "";
      } else {
        initial[field.name] = "";
      }
    });

    return initial;
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    dispatch(submitSchoolInfo({ formData, token }))
      .unwrap()
      .then((res) => {
        if (res) statusChange();
      });
  };

  return (
    <form className="space-y-6" onSubmit={onSubmitHandle}>
      {InviteFormInputs.map((field, index) =>
        field.type !== "select" ? (
          <div className="form-group" key={field.label + index}>
            <label className="block text-gray-800 font-medium mb-2">
              {field.label}
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name]}
              onChange={onChangeHandle}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        ) : (
          <div className="form-group" key={field.label + index}>
            <label className="block text-gray-800 font-medium mb-2">
              {field.label}
              <span className="text-red-500 ml-1">*</span>
            </label>

            <select
              name={field.name}
              value={formData[field.name]}
              onChange={onChangeHandle}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {field.options.map((opt, i) => (
                <option key={opt + i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )
      )}

      <div className="flex justify-between items-center border-t border-gray-200 mt-10 pt-8">
        <button
          type="button"
          className="px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Continue to Verification
        </button>
      </div>
    </form>
  );
}