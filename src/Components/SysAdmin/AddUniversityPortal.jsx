import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { AddUniversity } from "../../Features/Admin_Features/adminSlice";
import toast from "react-hot-toast";
export default function AddUniversityModal({ isOpen, onClose, onSubmit }) {
    
  const [formData, setFormData] = useState({
   
   
  });

  const dispatch = useDispatch();


  const fields = [
    {
      label: "University Name",
      name: "university_name",
      placeholder: "Enter university name",
      type: "text",
    },
    {
      label: "University City",
      name: "university_city",
      placeholder: "Enter university City",
      type: "text",
    },
    {
      label: "University Country",
      name: "university_country",
      placeholder: "Enter university Country",
      type: "text",
    },
    {
      label: "University Acronym",
      name: "university_acronym",
      placeholder: "Enter university Acronym",
      type: "text",
    },
    {
      label: "University Phone",
      name: "university_phone",
      placeholder: "Enter university Phone",
      type: "text",
    },
    {
      label: "University Image",
      name: "university_image",
      placeholder: "Enter university Image Link",
      type: "text",
    },
    {
      label: "University App Fee",
      name: "app_fee",
      placeholder: "Enter 0 for now",
      type: "text",
    },
    {
      label: "University Currency",
      name: "currency",
      placeholder: "Enter university Currency Symbol e.g $ , £ etc",
      type: "text",
    },
    {
      label: "University Commission Type",
      name: "commision_type",
      placeholder: "Enter university Commision Type e.g % , Cash",
      type: "text",
    },
    {
      label: "University Commission Value",
      name: "commision_value",
      placeholder: "Enter university Commission Value",
      type: "text",
    },
    {
      label: "University Email",
      name: "university_email",
      placeholder: "Enter university email",
      type: "email",
    },
    {
      label: "University Addmission Email",
      name: "university_admission_email",
      placeholder: "Enter university Admission email",
      type: "email",
    },
    {
      label: "University Address",
      name: "university_address",
      placeholder: "Enter university Address",
      type: "email",
    },
    {
      label: "University Website",
      name: "university_website",
      placeholder: "https://...",
      type: "url",
    },
    {
      label: "Instagram",
      name: "university_instagram",
      placeholder: "Insta Handle",
      type: "text",
    },
    {
      label: "LinkedIn",
      name: "univerity_linkedin",
      placeholder: "https://...",
      type: "url",
    },
    {
      label: "Twitter / X",
      name: "university_x",
      placeholder: "https://...",
      type: "text",
    },
    {
      label: "Youtube",
      name: "university_youtube",
      placeholder: "https://...",
      type: "url",
    },    
    {
      label: "Students Count",
      name: "students_count",
      placeholder: "Short description",
      type: "text",
    },
    {
      label: "Acceptance Rate",
      name: "acceptance_rate",
      placeholder: "Short description",
      type: "text",
    },
    {
      label: "QS Ranking",
      name: "qs_ranking",
      placeholder: "QS Ranking",
      type: "text",
    },
    {
      label: "About University",
      name: "about_university",
      placeholder: "Short description",
      type: "text",
    },
    {
      label: "Founded Date",
      name: "founded_date",
      placeholder: "YYYY-MM-DD",
      type: "date",
    },
    {
      label: "University Type",
      name: "type",
      placeholder: "Public / Private / etc",
      type: "text",
    },
    {
      label: "Academic Calendar",
      name: "calendar",
      placeholder: "e.g. Semester / Trimester",
      type: "text",
    },
    {
      label: "Graduation Rate",
      name: "graduation_rate",
      placeholder: "Short description",
      type: "text",
    },
    {
      label: "Employability Rate",
      name: "employability",
      placeholder: "Enter Employability Rate",
      type: "text",
    },
    {
      label: "University Logo",
      name: "university_logo",
      placeholder: "https://...",
      type: "url",
    },
    {
      label: "University Profile",
      name: "university_profile",
      placeholder: "https://...",
      type: "url",
    },
    {
      label: "University Banner",
      name: "university_banner",
      placeholder: "https://...",
      type: "url",
    },
    {
      label: "University Gallery Video",
      name: "university_gallery_video",
      placeholder: "https://...",
      type: "url",
    },
    {
      label: "University Gallery Main",
      name: "university_gallery_main",
      placeholder: "https://...",
      type: "url",
    },
    {
      label: "University Gallery Secondary One",
      name: "university_secondary_one",
      placeholder: "https://...",
      type: "url",
    },
    {
      label: "University Gallery Secondary Two",
      name: "university_secondary_two",
      placeholder: "https://...",
      type: "url",
    },
    {
      label: "University Gallery Secondary Three",
      name: "university_secondary_three",
      placeholder: "https://...",
      type: "url",
    },
    {
      label: "University Gallery Secondary Four",
      name: "university_secondary_four",
      placeholder: "https://...",
      type: "url",
    },

  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    // onSubmit(formData);
    const id = toast.loading("Adding University");
    dispatch(AddUniversity(formData)).unwrap().then((res)=>{
        if(res){
            onClose();
            toast.success("University Added Successfully",{id})
        }
    }).catch((e)=>toast.error("Adding University Failed"),{id})
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Add University</h2>
          <p className="text-sm text-gray-500">
            Fill in the university details below
          </p>
        </div>

        {/* Form */}
        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {field.label}
                </label>

                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save University
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
