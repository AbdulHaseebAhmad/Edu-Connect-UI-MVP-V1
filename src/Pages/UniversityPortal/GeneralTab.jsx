
export default function GeneralTab({profile}) {
  

  const generalFields = [
  {
    name: "university_id",
    label: "University Code",
    type: "text",
    disabled: true,
  },
  {
    name: "university_name",
    label: "University Name",
    type: "text",
    disabled: false,
  },
  {
    name: "students_count",
    label: "Total Students",
    type: "text",
    disabled: false,
  },
  {
    name: "acceptance_rate",
    label: "Acceptance Rate",
    type: "text",
    disabled: false,
  },
  {
    name: "qs_ranking",
    label: "Global Ranking",
    type: "text",
    disabled: false,
  },
  {
    name: "founded_date",
    label: "Established",
    type: "text",
    disabled: false,
  },
  {
    name: "type",
    label: "Institution Type",
    type: "select",
    options: ["Public Research University", "Private University"],
    disabled: false,
  },
  {
    name: "calendar",
    label: "Main Intake",
    type: "text",
    disabled: false,
  },
  {
    name: "employability",
    label: "Employment Rate",
    type: "text",
    disabled: false,
  },
  {
    name: "graduation_rate",
    label: "Graduation Rate",
    type: "text",
    disabled: false,
  },
  {
    name: "about_university",
    label: "About Description",
    type: "textarea",
    disabled: false,
  },
  {
    name: "university_city",
    label: "University City",
    type: "text",
    disabled: false,
  },
];
  return (
    <div className="flex flex-col ">
      <div className="mx-auto flex justify-end pt-2 pb-8 min-w-[900px]">
        <button className="self-end bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 active:scale-95 text-sm font-bold">
          Save Changes
        </button>
      </div>
      <div className="mx-auto grid md:grid-cols-2 gap-8 min-w-[900px]">
        {generalFields.map((field) => {
          if (field.type === "textarea") {
            return (
              <div key={field.name} className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                  {field.label}
                </label>
                <textarea
                  rows={6}
                  className="field"
                  defaultValue={profile?.[field?.name]}
                />
              </div>
            );
          }

          if (field.type === "select") {
            return (
              <div key={field.name}>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                  {field.label}
                </label>
                <select className="field" defaultValue={profile?.[field?.name]}>
                  {field.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            );
          }

          return (
            <div key={field.name}>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                {field.label}
              </label>
              <input
                className="field"
                defaultValue={profile?.[field?.name]}
                disabled={field?.disabled}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
