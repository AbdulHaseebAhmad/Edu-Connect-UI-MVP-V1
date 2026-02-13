import React from "react";

export default function SocialTab({ profile }) {

  const socialFields = [
    {
      name: "university_website",
      label: "Website",
      type: "text",
      disabled: false,
    },
    {
      name: "university_email",
      label: "Admissions Email",
      type: "text",
      disabled: false,
    },
    {
      name: "university_linkedin",
      label: "LinkedIn",
      type: "text",
      disabled: false,
    },
    {
      name: "university_instagram",
      label: "Instagram",
      type: "text",
      disabled: false,
    },
    {
      name: "university_x",
      label: "X (Twitter)",
      type: "text",
      disabled: false,
    },
    {
      name: "university_youtube",
      label: "YouTube",
      type: "text",
      disabled: false,
    },
    {
      name: "university_phone",
      label: "Phone Number",
      type: "text",
      disabled: false,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="mx-auto flex justify-end pt-2 pb-8 min-w-[900px]">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 active:scale-95 text-sm font-bold">
          Save Changes
        </button>
      </div>

      <div className="mx-auto grid md:grid-cols-2 gap-6 min-w-[900px]">

        {socialFields.map((field) => (
          <div key={field.name}>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
              {field.label}
            </label>

            <input
              className="field"
              defaultValue={profile?.[field.name]}
              disabled={field.disabled}
            />
          </div>
        ))}

      </div>
    </div>
  );
}
