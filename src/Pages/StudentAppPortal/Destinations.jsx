// ViewBrowse.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { GetCountriesList } from "../../Features/Students_Features/StudentAppSlice";
import { FaSearch } from "react-icons/fa";

const countries = ["All Countries", "UK", "USA", "Germany", "Netherlands"];



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

  const filteredDestinations = countriesList.filter((c) => {
    const matchCountry =
      selectedCountry === "All Countries" ||
      c.code?.toLowerCase() === selectedCountry?.toLowerCase() ||
      c.name?.toLowerCase().includes(selectedCountry?.toLowerCase());
    const matchSearch =
      search.trim().length === 0 ||
      c.name?.toLowerCase().includes(search?.toLowerCase()) ||
      c.cityHighlights?.toLowerCase().includes(search?.toLowerCase());
    return matchCountry && matchSearch;
  });

  return (
    <div className="space-y-6 fade-in ">
      {/* Top filters row */}
      <div className="flex gap-4 overflow-x-auto pb-2 pr-2 pt-4 px-2">
        <select
          className="px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:ring-2 ring-blue-500 outline-none shadow-sm"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-3.5 text-slate-400" />
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
      <div>
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Select Destination
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredDestinations?.map((d) => (
            <button
              key={d.id}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-blue-500 hover:shadow-md"
              onClick={() => navigate(`${d?.country_code}`)}
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
