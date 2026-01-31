// ViewBrowse.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { GetCountriesList } from "../../Features/Students_Features/StudentAppSlice";

const countries = ["All Countries", "UK", "USA", "Germany", "Netherlands"];

const destinationCards = [
  {
    id: 1,
    name: "United Kingdom",
    code: "UK",
    programs: "120+ programs",
    cityHighlights: "London • Manchester • Edinburgh",
    blurb:
      "World‑class universities, strong post‑study work options, and a vibrant multicultural environment.",
    badge: "High employability",
    image:
      "https://cdn.kimkim.com/files/a/images/f2939dd7a5eddd79ad691d50cdb482df5c165837/original-ee8ff466e049d061137036f86a637f93.jpg", // London skyline
  },
  {
    id: 2,
    name: "United States",
    code: "USA",
    programs: "200+ programs",
    cityHighlights: "New York • Boston • San Francisco",
    blurb:
      "Ivy League and leading tech schools with extensive research opportunities and campus life.",
    badge: "STEM powerhouse",
    image:
      "https://static.dw.com/image/63714998_605.jpg", // NYC
  },
  {
    id: 3,
    name: "Germany",
    code: "Germany",
    programs: "80+ programs",
    cityHighlights: "Berlin • Munich • Hamburg",
    blurb:
      "Low or no tuition at public universities and a strong focus on engineering and applied sciences.",
    badge: "Low tuition",
    image:
      "	https://www.travelcenter.uk/blog/wp-content/uploads/2018/03/trip-to-Frankfurt.jpg", // Berlin
  },
  {
    id: 4,
    name: "Netherlands",
    code: "Netherlands",
    programs: "40+ programs",
    cityHighlights: "Amsterdam • Eindhoven • Utrecht",
    blurb:
      "English‑taught programs, innovative teaching methods, and an international student community.",
    badge: "English‑taught",
    image:
      "https://career-advice.jobs.ac.uk/wp-content/uploads/Netherlands3-e1634207438966.jpg.optimal.jpg", // Amsterdam canals
  },
];

const ViewBrowse = () => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [countriesList, setListOfCountries] = useState([]);
  
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCountriesList(""))
      .unwrap()
      .then((res) => {
        if (res) {
          setListOfCountries(res || []);
        }
      });
  }, []);


  // const filteredDestinations = destinationCards.filter((c) => {
  //   const matchCountry =
  //     selectedCountry === "All Countries" ||
  //     c.code.toLowerCase() === selectedCountry.toLowerCase() ||
  //     c.name.toLowerCase().includes(selectedCountry.toLowerCase());
  //   const matchSearch =
  //     search.trim().length === 0 ||
  //     c.name.toLowerCase().includes(search.toLowerCase()) ||
  //     c.cityHighlights.toLowerCase().includes(search.toLowerCase());
  //   return matchCountry && matchSearch;
  // });

  return (
    <div id="view-browse" className="space-y-6 fade-in">
      {/* Top filters row */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <select
          className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:ring-2 ring-blue-500 outline-none shadow-sm"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <div className="relative flex-1">
          <i className="fas fa-search absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search Program..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:ring-2 ring-blue-500 outline-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Destination section */}
      <div id="dd-lvl-1">
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Select Destination
        </h2>
        <div
          id="country-grid"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {countriesList?.map((d) => (
            <button
              key={d.id}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-blue-500 hover:shadow-md"
              onClick={()=>navigate(`${d?.country_code}`)}
            >
              {/* Image */}
              <div className="h-28 w-full overflow-hidden">
                <img
                  src={d.image_url}
                  alt={d.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <span className="text-sm font-bold text-slate-900">
                  {d.name}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  {d.program_count} programs
                </span>
                <span className="mt-2 text-[11px] font-medium text-slate-600">
                  {d.cityHighlights}
                </span>
                <p className="mt-2 text-[11px] leading-snug text-slate-500">
                  {d.blurb}
                </p>
                <span className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                  {d.badge}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewBrowse;
