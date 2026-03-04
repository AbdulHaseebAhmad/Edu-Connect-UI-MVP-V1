import React, { useEffect, useState } from "react";
import ScholarshipUnlockModal from "../../Components/studentAppPortal/ScholarshipUnlockModal";
import ScholarshipDetailsModal from "../../Components/studentAppPortal/ScholarshipDetailModal";
import ScholarshipCard from "../../Components/studentAppPortal/ScholarshipCard";
import { useDispatch } from "react-redux";
import { FetchScholarships } from "../../Features/Admin_Features/AdminSlice";

const DATAs = [
  {
    id: 1,
    title: "Chevening Scholarship",
    country: "UK",
    region: "Europe",
    level: "Masters",
    funding: "Full Ride",
    status: "Upcoming",
    opens: "Aug 2026",
    deadline: "Nov 2026",
    desc: "The UK government’s global scholarship programme.",
    link: "https://www.chevening.org",
    reqs: ["Undergrad degree", "2 years work experience"],
  },
  {
    id: 2,
    title: "DAAD EPOS",
    country: "Germany",
    region: "Europe",
    level: "Masters/PhD",
    funding: "Stipend + Tuition",
    status: "Open",
    opens: "Various",
    deadline: "Rolling",
    desc: "Development-related postgraduate courses in Germany.",
    link: "https://www2.daad.de",
    reqs: ["2 years experience", "Bachelor's degree", "Language proficiency"],
  },
];

const sortOptions = [
  { value: "deadline", label: "⏳ Deadline (Soonest)" },
  { value: "opens", label: "🔔 Opening Date (Soonest)" },
  { value: "az", label: "🔤 Name (A-Z)" },
];

const regionOptions = [
  { value: "all", label: "🌍 All Regions" },
  { value: "Europe", label: "Europe" },
  { value: "USA", label: "USA & Canada" },
  { value: "Asia", label: "Asia & Pacific" },
  { value: "Africa", label: "Africa" },
  { value: "Middle East", label: "Middle East" },
  { value: "Latin America", label: "Latin America" },
];

const levelOptions = [
  { value: "all", label: "🎓 All Levels" },
  { value: "Undergrad", label: "Undergraduate" },
  { value: "Masters", label: "Masters" },
  { value: "PhD", label: "PhD / Research" },
];

const statusOptions = [
  { value: "all", label: "📅 All Statuses" },
  { value: "Open", label: "Applications Open" },
  { value: "Upcoming", label: "Upcoming" },
];

function ScholarshipsView() {
  const [region, setRegion] = useState("all");
  const [level, setLevel] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("deadline");
  const [selected, setSelected] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [DATA,setData] = useState([]);

  const dispatch = useDispatch();

  const filtered = DATA.filter((s) => {
    if (region !== "all" && s.region !== region) return false;
    if (level !== "all" && !s.level.toLowerCase().includes(level.toLowerCase()))
      return false;
    if (status !== "all" && s.status !== status) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "az") return a.title.localeCompare(b.title);
    return 0;
  });

  function openDetails(item) {
    setSelected(item);
    setShowDetails(true);
  }

  function closeDetails() {
    setShowDetails(false);
  }

  function openUnlock() {
    setShowDetails(false);
    setShowUnlock(true);
  }

  function closeUnlock() {
    setShowUnlock(false);
  }

  useEffect(()=>{
      dispatch(FetchScholarships()).unwrap().then((res)=>{
        if (res){
          setData(res)
        }
      })
  },[])

  return (
  <div className="relative bg-dots min-h-screen">
    {/* FILTER BAR */}
    <div className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 items-center">
          <div className="relative">
            <select
              className="pl-2 pr-2 py-2 rounded-lg border border-gray-200 bg-slate-50 text-sm font-bold text-slate-700 focus:outline-none cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition appearance-none"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <i className="fas fa-sort-amount-down absolute left-2 right-3 top-2.5 text-gray-400 text-xs" />
          </div>

          <select
            className="px-4 py-2 rounded-lg border border-gray-200 bg-slate-50 text-sm font-semibold text-slate-600 focus:outline-none cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {regionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 rounded-lg border border-gray-200 bg-slate-50 text-sm font-semibold text-slate-600 focus:outline-none cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 rounded-lg border border-gray-200 bg-slate-50 text-sm font-semibold text-slate-600 focus:outline-none cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs font-bold text-slate-400 whitespace-nowrap">
          Found{" "}
          <span className="text-blue-600 text-lg mx-1">
            {filtered.length}
          </span>{" "}
          Opportunities
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filtered.map((item,index) => {
          return (
            <ScholarshipCard
              key={index}
              item={item}
              onOpenDetails={() => openDetails(item)}
            />
          );
        })}
      </div>
    </div>

    {showDetails && selected && (
      <ScholarshipDetailsModal scholarship={selected} onUnlock={openUnlock} onClose={closeDetails}/>
    )}

    {showUnlock && selected && <ScholarshipUnlockModal scholarship={true} onClose={closeUnlock}/>}
  </div>
);
}

export default ScholarshipsView;
