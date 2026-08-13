import React from "react";
import { Link } from "react-router-dom";

const ProgramList = ({ programs }) => {
  const fallback = (value, fallbackText = "Not available") => {
    return value && value !== "" ? value : fallbackText;
  };

  if (!programs || programs.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-slate-500">
        No programs found
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {programs.map((program) => (
        <Link
          key={program.program_id}
          to={`/student/apply-to-university/programs/${program?.university_id}/${program?.program_id}`}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
        >
          <div className="flex gap-5">
            {/* University Image */}
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
              <img
                src={
                  program.university_image ||
                  "https://via.placeholder.com/80"
                }
                alt="university"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {fallback(program.program_name)}
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  {fallback(program.university_name)}
                </p>

                <p className="text-sm text-slate-500">
                  {fallback(program.country_name)}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                  💰 {fallback(program?.currrency)}{" "}
                  {parseInt(program.program_fee) *
                    parseInt(program.program_duration)}
                </div>

                <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  ⏳ {fallback(program.program_duration)}
                </div>

                <div className="rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700">
                  📅 {fallback(program.session_intake)}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  ID: {program.program_id}
                </p>

                <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                  View Program →
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProgramList;