import React, { useState, useMemo, useEffect } from "react";
import { FaGlobe, FaUniversity, FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  AddFeaturedPartners,
  DeleteFeaturedPartner,
  FetchUniversities,
  GetfetchFeaturedPartners,
} from "../../../Features/Admin_Features/adminSlice";

const LOCATIONS = [
  { code: "global", label: "Global" },
  { code: "uk", label: "United Kingdom" },
  { code: "eu", label: "Europe" },
  { code: "na", label: "North America" },
  { code: "asia", label: "Asia" },
];

export default function FeaturedPartnersByLocation() {
  const [activeLocation, setActiveLocation] = useState("global");
  const [search, setSearch] = useState("");
  const [featuredList, setFeaturedList] = useState([]);
  const [Universities, setUniversities] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchUniversities())
      .unwrap()
      .then((universities) => {
        if (!universities) return;
        setUniversities(universities);
        dispatch(GetfetchFeaturedPartners())
          .unwrap()
          .then((featured) => {
            if (!featured) return;
            const list = universities
              .map((fp) =>
                featured.find(
                  (uni) => uni?.university_id === fp?.university_id,
                ),
              )
              .filter(Boolean);
            console.log(list);
            setFeaturedList(list);
          });
      });
  }, [refetch]);

  const handleSave = () => {
    let data = [];
    featuredList.forEach(
      (eachUni) =>
       {
               if(eachUni?.partner_id !== "") return 

          data = [
          ...data,
          { university_id: eachUni?.university_id, location: activeLocation },
        ]
       },
    );
    dispatch(AddFeaturedPartners(data))
      .unwrap()
      .then((res) => {
        if (res) {
          setRefetch(!refetch);
          setShowSaveButton(false);
        }
      });
  };

  const isFeatured = (id) => {
    let isExist = featuredList.find((each) => each.university_id == id);
    if (isExist) {
      return true;
    } else {
      return false;
    }
  };

  const toggleFeatured = (id) => {
    let isExist = featuredList.find((each) => each.university_id == id);
    if (isExist) {
      dispatch(DeleteFeaturedPartner(isExist?.partner_id))
        .unwrap()
        .then((res) => {
            setFeaturedList((prev) =>
              prev.filter((each) => each.university_id != id),
            );
          if (res) {
          }
        });
    } else {
      let uni = Universities.find((each) => each.university_id == id);
      if (uni) {
        if (featuredList?.length == 2) return;
        if (!showSaveButton) {
          setShowSaveButton(true);
        }
        setFeaturedList((prev) => [...prev, uni]);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FaGlobe className="text-blue-600" />
          <h2 className="font-semibold text-lg text-slate-900">
            Featured Partners
          </h2>
        </div>

        {showSaveButton && (
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Location Tabs */}
      <div className="flex gap-4 mb-5 overflow-x-auto pt-6">
        {LOCATIONS.map((loc, index) => {
          const isEnabled = index === 0;

          return (
            <button
              key={loc.code}
              onClick={() => isEnabled && setActiveLocation(loc.code)}
              disabled={!isEnabled}
              className={`relative flex items-center gap-2 px-4 py-1.5 text-xs rounded-full border font-medium whitespace-nowrap transition
        ${
          isEnabled
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
        }`}
            >
              {loc.label}

              {!isEnabled && (
                <span className="text-[10px] font-semibold px-2 py-[2px] rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                  Coming Soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* University List */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Universities
            </h3>

            <span className="text-xs text-slate-500">
              {featuredList.length} featured
            </span>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search universities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="grid md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {Universities?.map((uni) => (
              <div
                key={uni.university_id}
                onClick={() => toggleFeatured(uni.university_id)}
                className={`relative flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${
                  isFeatured(uni.university_id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                {isFeatured(uni.university_id) && (
                  <div className="absolute top-2 right-2 text-blue-600">
                    <FaCheck className="w-3 h-3" />
                  </div>
                )}

                <div className="w-9 h-9 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                  {uni?.university_image ? (
                    <img
                      src={uni?.university_image}
                      alt="university"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUniversity className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {uni.university_name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {uni.university_country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Panel */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            Featured for{" "}
            {LOCATIONS.find((l) => l.code === activeLocation)?.label}
          </h3>

          <p className="text-xs text-slate-500 mb-3">
            These universities appear highlighted to users.
          </p>

          <div className="space-y-2 max-h-[340px] overflow-y-auto">
            {featuredList.length === 0 && (
              <p className="text-xs text-slate-500">
                No featured partners selected.
              </p>
            )}

            {featuredList.map((uni) => (
              <div
                key={uni.university_id}
                className="flex items-start justify-start gap-4  px-2 py-2 bg-white rounded-lg border border-slate-200"
              >
                <div className="w-12 h-9 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                  {uni?.university_image ? (
                    <img
                      src={uni?.university_image}
                      alt="university"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUniversity className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0 w-full">
                  <p className="text-xs font-semibold text-slate-900 truncate mb-1">
                    {uni.university_name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {uni.university_country}
                  </p>
                </div>

                <button
                  onClick={() => toggleFeatured(uni.university_id)}
                  className="text-[11px] font-semibold text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
