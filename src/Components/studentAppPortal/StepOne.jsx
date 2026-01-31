import { useEffect, useState } from "react";

export default function StepOne({ onChange, toggleScreen, formData }) {
  const [isDisabled, setDisabled] = useState(true);
  const handleChange = (e) => {
    onChange(e);
  };

  useEffect(() => {
    let disabled =
      formData?.fname == "" ||
      formData?.lname == "" ||
      formData?.email == "" ||
      formData?.school_code == "" ||
      !formData?.email.includes("@") ||
      formData?.citizenship == "";
    setDisabled(disabled);
  }, [formData]);

  return (
    <form className="flex-1 flex flex-col w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">
            First Name
          </label>
          <input
            name="fname"
            type="text"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            onChange={(e) => handleChange(e)}
            value={formData?.fname}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">
            Last Name
          </label>
          <input
            name="lname"
            type="text"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            onChange={(e) => handleChange(e)}
            value={formData?.lname}
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          onChange={(e) => handleChange(e)}
          value={formData?.email}
          required
        />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase">
          High School Code
        </label>
        <input
          name="school_code"
          type="text"
          className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          onChange={(e) => handleChange(e)}
          value={formData?.school_code}
          required
        />
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase">
          Citizenship
        </label>
        <select
          name="citizenship"
          className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 text-slate-600 focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          onChange={(e) => handleChange(e)}
          value={formData?.citizenship}
        >
          <option>Malawi</option>
          <option>Nigeria</option>
          <option>South Africa</option>
          <option>Turkey</option>
          <option>Other</option>
        </select>
      </div>
      <button
        type="button"
        className="w-full mt-6 py-3.5 sm:py-4 bg-blue-600 text-white font-bold rounded-xl 
             hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:bg-slate-400 transition"
        onClick={() => toggleScreen(1)}
        disabled={isDisabled}
      >
        Next Step
      </button>
    </form>
  );
}
