// UniversityProfileLevels.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { GetUniversityProfile } from "../../Features/Students_Features/StudentAppSlice";
import {
  FaArrowLeft,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaTrophy,
} from "react-icons/fa";
import { hexToString } from "../../Utillities/helpFunctions";

const UniversityDetails = () => {
  const [level, setLevel] = useState(3);
  const [profileTab, setProfileTab] = useState("life");
  const [university, setUniversity] = useState({});
  const showLevel = (n) => setLevel(n);



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { university_id } = useParams();

  useEffect(() => {
    dispatch(GetUniversityProfile(university_id))
      .unwrap()
      .then((res) => {
        if (res) {
          setUniversity(res);
        }
      });
  }, [university_id]);

  return (
    <>
      {/* Level 2: Universities (placeholder list) */}
      <div id="dd-lvl-2" className={level === 2 ? "" : "hidden"}>
        <button
          onClick={() => showLevel(1)}
          className="mb-6 flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-bold text-slate-500 shadow-sm transition hover:text-blue-600"
        >
          <FaArrowLeft />
          Back to Countries
        </button>
        <h2 className="mb-6 text-xl font-bold text-slate-900">Universities</h2>
        <div className="grid grid-cols-1 gap-4" id="uni-grid">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
              <div className="text-sm font-bold text-slate-900">
                {university?.name}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {university?.location}
              </div>
            </div>
            <button
              onClick={() => showLevel(3)}
              className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-blue-600"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Level 3: University profile */}
      <div id="dd-lvl-3" className={level === 3 ? "" : "hidden"}>
        <button
         onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-bold text-slate-500 shadow-sm transition hover:text-blue-600"
        >
          <FaArrowLeft />
          Back to Universities
        </button>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          {/* HERO */}
          <div className="group relative h-64">
            <img
              id="lvl3-hero-img"
              className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
              src="https://dxp.plus/cdn-cgi/image/w=3840,q=90,f=webp,fit=contain/https://us-cdn.dxp.plus/4e7f1e24-6b44-4103-9287-7bfb88f988b8/Oxford%20City.jpg.preview.png"
              alt={university?.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            <div className="absolute bottom-0 left-0 flex w-full items-end gap-6 p-8">
              <div className="h-24 w-24 rotate-3 rounded-2xl bg-white p-2 shadow-2xl shadow-black/30 transition group-hover:rotate-0">
                <div
                  id="lvl3-logo"
                  className="flex h-full w-full items-center justify-center rounded-xl bg-slate-50 text-2xl font-bold text-slate-800"
                >
                  {university?.university_name}
                </div>
              </div>
              <div className="mb-2 flex-1">
                <h1
                  className="mb-2 text-4xl font-extrabold tracking-tight text-white"
                  id="lvl3-name"
                >
                  {university?.university_name}
                </h1>
                <div className="flex gap-4 text-sm font-medium text-slate-300">
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-400" />
                    <span id="lvl3-loc">{university?.university_city}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <FaTrophy className="text-yellow-400" />
                    <span id="lvl3-rank">{university?.qs_ranking}</span>
                  </span>
                </div>
              </div>
              <div className="mb-2 hidden gap-3 md:flex">
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center backdrop-blur">
                  <div className="text-xs font-bold uppercase text-slate-400">
                    Acceptance
                  </div>
                  <div className="text-xl font-bold text-white">
                    {university?.acceptance_rate}
                  </div>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center backdrop-blur">
                  <div className="text-xs font-bold uppercase text-slate-400">
                    Students
                  </div>
                  <div className="text-xl font-bold text-white">
                    {university?.students_count}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="sticky top-0 z-20 flex gap-8 border-b border-slate-100 bg-white px-8">
            <button
              onClick={() => setProfileTab("overview")}
              id="tab-p-overview"
              className={`border-b-2 py-4 text-sm font-bold transition ${
                profileTab === "overview"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-blue-600"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setProfileTab("programs")}
              id="tab-p-programs"
              className={`border-b-2 py-4 text-sm font-bold transition ${
                profileTab === "programs"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-blue-600"
              }`}
            >
              Programs{" "}
              <span
                id="prog-count"
                className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600"
              >
                {university?.Programs?.length}
              </span>
            </button>
            <button
              onClick={() => setProfileTab("life")}
              id="tab-p-life"
              className={`border-b-2 py-4 text-sm font-bold transition ${
                profileTab === "life"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-blue-600"
              }`}
            >
              Campus Life
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="min-h-[400px] bg-slate-50 p-8">
            {/* Overview tab */}
            {profileTab === "overview" && (
              <div id="p-overview" className="space-y-8 fade-in">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <h3 className="mb-4 text-lg font-bold text-slate-900">
                      About the University
                    </h3>
                    <p
                      className="mb-6 whitespace-pre-line text-sm leading-relaxed text-slate-600"
                      id="lvl3-desc"
                    >
                      {university?.about_university}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <FaGraduationCap className="text-purple text-lg" />
                        </div>
                        <div>
                          <div className="text-xs mb-2 font-bold uppercase text-slate-400">
                            Graduation Rate
                          </div>
                          <div className="font-bold text-slate-900">
                            {university?.graduation_rate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                          <FaBriefcase />
                        </div>
                        <div>
                          <div className="text-xs mb-2 font-bold uppercase text-slate-400">
                            Employability
                          </div>
                          <div className="font-bold text-slate-900">
                            {university?.employability}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h4 className="mb-3 text-sm font-bold text-slate-900">
                        Key Facts
                      </h4>
                      <ul className="space-y-3 text-xs text-slate-600">
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                          <span>Founded</span>
                          <span className="font-bold">
                            {university?.founded_date}
                          </span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-2">
                          <span>Type</span>
                          <span className="font-bold">{university?.type}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Calendar</span>
                          <span className="font-bold">
                            {university?.calendar}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setProfileTab("programs")}
                      className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-600"
                    >
                      View All Programs
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Programs tab (converted snippet) */}
            {profileTab === "programs" && (
              <div className="fade-in space-y-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Programs at {university?.university_name}
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {university?.Programs?.map((prog) => (
                    <div
                      key={prog.program_id}
                      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-5 shadow-md ring-1 ring-slate-100/50 backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-200/50 hover:-translate-y-2 hover:scale-[1.02]"
                      onClick={() =>
                        navigate(
                          `/student/apply-to-university/programs/${university_id}/${prog?.program_id}`
                        )
                      }
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-pink-500 to-blue-600 p-2 shadow-lg ring-1 ring-white/30">
                          <FaGraduationCap className="h-5 w-5 text-white drop-shadow-sm" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="mb-1 inline-block rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-2 py-0.5 text-xs font-bold text-indigo-800">
                            {prog.program_level}
                          </div>
                          <div className="truncate text-lg font-black text-slate-900 group-hover:text-indigo-700 group-hover:drop-shadow-sm">
                            {prog.program_name}
                          </div>

                          {/* Application Fee placeholder */}
                          <div className="mt-2 inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 shadow-sm">
                            Application Fee:  $ {prog?.program_application_fee}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4 pt-2">
                        <div className="flex flex-1 flex-col items-center gap-1 p-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Duration
                          </div>
                          <div className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800 shadow-sm">
                            {prog.program_duration}
                          </div>
                        </div>

                        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 shadow-inner" />

                        <div className="flex flex-1 flex-col items-center gap-1 p-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Tuition
                          </div>
                          <div className="rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-800 shadow-sm">
                            {prog.program_fee}
                          </div>
                        </div>

                        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 shadow-inner" />

                        <div className="flex flex-1 flex-col items-center gap-1 p-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Next Intake
                          </div>
                          <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800 shadow-sm">
                            {prog.session_intake}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Campus life tab (original + gallery/video snippet) */}
            {profileTab === "life" && (
              <div id="p-life" className="fade-in space-y-8">
                {/* Experience Campus (video) */}
                <div>
                  <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Experience Campus
                  </h3>
                  <div className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
                    <img
                      src={"university?.gallery.videoThumb"}
                      className="h-full w-full object-cover opacity-60 transition group-hover:opacity-40"
                      alt="Campus video preview"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur transition group-hover:scale-110">
                        <i className="fas fa-play ml-1 text-2xl text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h4 className="text-lg font-bold">A Day in the Life</h4>
                      <p className="text-sm text-slate-300">
                        Watch the official tour
                      </p>
                    </div>
                  </div>
                </div>

                {/* Photo Gallery */}
                <div>
                  <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Photo Gallery
                  </h3>
                  <div className="grid h-64 grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="col-span-2 row-span-2 overflow-hidden rounded-xl shadow-sm">
                      <img
                        className="h-full w-full object-cover transition duration-700 hover:scale-110"
                        src={()=>hexToString(university?.Media?.[0]?.media)}
                        alt="Main campus"
                      />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-sm">
                      <img
                        className="h-full w-full object-cover transition duration-700 hover:scale-110"
                        src={()=>hexToString(university?.Media?.[1]?.media)}
                        alt={university?.Media?.[1]?.media_id}
                      />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-sm">
                      <img
                        className="h-full w-full object-cover transition duration-700 hover:scale-110"
                        src={"university?.gallery.side2"}
                        alt="Campus view 2"
                      />
                    </div>
                    <div className="col-span-2 overflow-hidden rounded-xl shadow-sm">
                      <img
                        className="h-full w-full object-cover transition duration-700 hover:scale-110"
                        src={"university?.gallery.bottom"}
                        alt="Campus view 3"
                      />
                    </div>
                  </div>
                </div>

                {/* Textual campus life cards (from previous version) */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h4 className="mb-2 text-sm font-bold text-slate-900">
                      Housing & Accommodation
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {"university?.campusLife.housing"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h4 className="mb-2 text-sm font-bold text-slate-900">
                      Student Activities
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {"university?.campusLife.activities"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h4 className="mb-2 text-sm font-bold text-slate-900">
                      City & Surroundings
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {"university?.campusLife.cityLife"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h4 className="mb-2 text-sm font-bold text-slate-900">
                      Support & Services
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {"university?.campusLife.support"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UniversityDetails;
