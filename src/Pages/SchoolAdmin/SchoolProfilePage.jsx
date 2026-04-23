import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import { GetSchoolProfileData } from "../../Features/School_Features/SchoolSlice";
import toast from "react-hot-toast";

export default function SchoolProfile() {
  const [form, setForm] = useState({
    registration_code: "",
    school_name: "",
    school_curriculum: "",
    school_branch: "",
    status: "",

    school_country: "",
    school_city: "",
    school_phone: "",
    school_email: "",

    admin_name: "",
    username: "",
    sys_email: "",
  });

  const school_id = useSelector((state)=> state.authReducer.user_id)
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    alert("School profile updated");
  };

  useEffect(()=>{
    const id = toast.loading("Fetching School Profile");

    dispatch(GetSchoolProfileData(school_id)).unwrap().then((res)=>{
      if(res){
        toast.success("Fetched School Profile!",{id})
        setForm(res)
      }
    }).catch((e)=>{
      toast.error("Error Fetching School Profile",{id})
    })
  },[school_id])


  return (
    <div className="bg-slate-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800">School Profile</h1>
            <p className="text-sm text-slate-500">
            </p>
          </div>

          {/* <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700"
          >
            Save Changes
          </button> */}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">

          {/* School Identity */}
          <Section title="School Identity">
            <Input label="Registration Code" name="registration_code" value={form.registration_code} onChange={handleChange} />
            <Input label="School Name" name="school_name" value={form.school_name} onChange={handleChange} />
            <Input label="Curriculum" name="school_curriculum" value={form.school_curriculum} onChange={handleChange} />
            <Input label="Branch" name="school_branch" value={form.school_branch} onChange={handleChange} />
            {/* <Select label="Status" name="status" value={form.status} onChange={handleChange} options={["Active", "Inactive", "Suspended"]} /> */}
          </Section>

          {/* Location & Contact */}
          <Section title="Location & Contact">
            <Input label="Country" name="school_country" value={form.school_country} onChange={handleChange} />
            <Input label="City" name="school_city" value={form.school_city} onChange={handleChange} />
            <Input label="Phone" name="school_phone" value={form.school_phone} onChange={handleChange} />
            <Input label="School Email" name="school_email" value={form.school_email} onChange={handleChange} />
          </Section>

          {/* Administration */}
          <Section title="Administration">
            <Input label="Admin Name" name="admin_name" value={form.admin_name} onChange={handleChange} />
            <Input label="Username" name="username" value={form.username} onChange={handleChange} />
            <Input label="System Email" name="sys_email" value={form.sys_email} onChange={handleChange} />
          </Section>

        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable UI Components ---------- */

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-sm font-bold text-slate-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
        {label}
      </label>
      <input
        {...props}
        disabled
        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
        {label}
      </label>
      <select
        {...props}
        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
