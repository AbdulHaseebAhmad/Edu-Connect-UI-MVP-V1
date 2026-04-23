import { useEffect, useState } from "react";
import { FaTimes, FaBookOpen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  AddScholarships,
  UpdateScholarship,
} from "../../Features/Admin_Features/AdminSlice";
import toast from "react-hot-toast";

const fields = [
  {
    name: "title",
    placeholder: "Scholarship Title",
    type: "text",
    required: true,
  },
  { name: "country", placeholder: "Country", type: "text" },
  { name: "region",type: "select", placeholder: "Region", options: ["Europe", "USA", "Asia", "Africa","Middle East","Latin America"],},
  { name: "level", placeholder: "Level", type: "select",options: ["Undergrad", "Masters", "PHD"], },
  { name: "funding", placeholder: "Funding Type", type: "text" },
  {
    name: "status",
    type: "select",
    options: ["Upcoming", "Open", "Closed","Closing Soon"],
  },
  { name: "opens", placeholder: "Opening Date", type: "date" },
  { name: "deadline", placeholder: "Deadline", type: "date" },
  {
    name: "description",
    placeholder: "Scholarship Description",
    type: "textarea",
    colSpan: "md:col-span-2",
  },
  {
    name: "link",
    placeholder: "Application Link",
    type: "text",
    colSpan: "md:col-span-2",
  },
  {
    name: "requirements",
    placeholder: "Requirements (comma separated)",
    type: "text",
    colSpan: "md:col-span-2",
  },
];

export function ScholarshipAddModal({
  open,
  onClose,
  onSubmit,
  scholarship,
  isEdit,
}) {
  const [form, setForm] = useState({
    title: "",
    country: "",
    region: "",
    level: "",
    funding: "",
    status: "Upcoming",
    opens: "",
    deadline: "",
    description: "",
    link: "",
    requirements: "",
  });

  if (!open) return null;
  const dispatch = useDispatch();

  console.log(scholarship);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      requirements: form.requirements
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean),
    };

    if (isEdit) {
      const id = toast.loading("Updating Scholarship")
      dispatch(
        UpdateScholarship({
          scholarship_id: scholarship?.scholarship_id,
          data: payload,
        }),
      ).unwrap().then((res)=>{
        if(res){
          toast.success("Scholarship Updated Successfully",{id})
        }
      }).catch((e)=>toast.error("Updating Scholarship failed",{id}));
    } else {
      const id = toast.loading("Adding Scholarship")
      dispatch(AddScholarships(payload)).unwrap().then((res)=>{
        if(res){
          toast.success("Added Scholarship Successfully",{id})
        }
      }).catch((e)=>toast.error("Adding Scholarship Failed",{id}));
    }
    onSubmit?.(payload);
    onClose();
  };

  useEffect(() => {
    if (scholarship) {
      setForm({
        ...scholarship,
        requirements: Array.isArray(scholarship.requirements)
          ? scholarship.requirements.join(", ")
          : scholarship.requirements || "",
      });
    }
  }, [scholarship]);

  const renderField = (field) => {
    const baseClass =
      "border border-slate-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 outline-none w-full";

    if (field.type === "select") {
      return (
        <select
          name={field.name}
          value={form[field.name] || scholarship?.[field?.name]}
          onChange={handleChange}
          className={baseClass}
        >
          {field.options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          name={field.name}
          value={form[field.name] || scholarship?.[field?.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          className={`${baseClass} h-28 resize-none`}
        />
      );
    }

    return (
      <input
        type={field.type}
        name={field.name}
        value={form[field.name] || scholarship?.[field?.name]}
        onChange={handleChange}
        placeholder={field.placeholder}
        required={field.required}
        className={baseClass}
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <FaBookOpen className="text-xl" />
            <h2 className="font-bold text-lg">Add Scholarship</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 max-h-[75vh] overflow-y-auto"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field?.name} className={field.colSpan || ""}>
                {renderField(field)}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold transition"
          >
            {isEdit ? "Update Scholarship" : "Save Scholarship"}
          </button>
        </form>
      </div>
    </div>
  );
}
