import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import { GetUniversityList } from "../../Features/Students_Features/StudentAppSlice";
import { useDispatch } from "react-redux";

export default function StdUniversities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { country_id } = useParams();
  const [universitiesList, setUniversitiesList] = useState([]);

  const fetchUniversities = (countryId) => {
    dispatch(GetUniversityList(countryId))
      .unwrap()
      .then((res) => {
        if (res) {
          setUniversitiesList(res || []);
        }
      });
  };

  useEffect(() => {
    fetchUniversities(country_id);
  }, [country_id]);

  return (
    <div id="dd-lvl-2" className="space-y-6">
      <button
        onClick={() => navLevel(1)}
        className="mb-6 text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 bg-white px-3 py-2 rounded-lg border shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-200"
      >
        <FaArrowLeft className="w-4 h-4" />
        Back to Countries
      </button>
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        Universities in {"selectedCountry"?.name}
      </h2>
      <div className="grid grid-cols-1 gap-4" id="uni-grid">
        {universitiesList?.length > 0 &&
          universitiesList.map((uni) => (
            <div
              key={uni.university_id}
              onClick={() => navigate(`universities/${uni.university_id}`)}
              className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-md hover:bg-blue-50 cursor-pointer transition-all duration-300 group"
            >
              <img
                src={uni.university_image}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                alt={uni.university_name}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-slate-900 truncate group-hover:text-blue-600">
                  {uni.university_name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  {uni.appFee && (
                    <span className="text-orange-600 font-bold text-xs px-2 py-0.5 bg-orange-50 rounded">
                      {uni.appFee}
                    </span>
                  )}
                  <span>{uni.loc}</span>
                </p>
              </div>
              <FaChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
            </div>
          ))}
      </div>
    </div>
  );
}
