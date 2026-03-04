import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { GetUniversityList } from "../../Features/Students_Features/StudentAppSlice";
import { FaArrowLeft } from "react-icons/fa";

const universities = [
  {
    id: 1,
    name: "University of Global Excellence",
    location: "London, United Kingdom",
    type: "Public Research",
    rank: "Top 50 worldwide",
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSznOhfSWHLcx6cADdJ-FXaOAQJH2V4oXq64RDC2nB6ArIa8YP1z0nXe8pyFiToWJQ6Wb8tNgoXC0HZQpmr0VidWDP-O9sXiqauMBDJ_g7N6SUydIkOAjoHGMw6faGJYsx3XmMDR=s1360-w1360-h1020-rw",
  },
  {
    id: 2,
    name: "Northern Europe Institute",
    location: "Berlin, Germany",
    type: "Public",
    rank: "Top 100 in Europe",
    image:
      "https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    name: "Pacific Tech University",
    location: "San Francisco, United States",
    type: "Private",
    rank: "Top 200 worldwide",
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzmcaSwa88ioR_9Iqn4FMW9JQniCyXMjxLClN8IjTgvBq4t5QGBKaQ_AuTuLpYUgisMAjJrV_B0lZoihjMjzU4Sy3cAOqnPVEaJ0g6JNR1eABnMrQvIKTVj1osonUixei53gG7tzA=s1360-w1360-h1020-rw",
  },
];

const UniversitiesList = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const { counntry_id } = useParams();
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
    fetchUniversities(counntry_id);
  }, [counntry_id]);

  return (
    <div id="dd-lvl-2" className="">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-bold text-slate-500 shadow-sm transition hover:text-blue-600"
      >
        <FaArrowLeft className="w-4 h-4" />
        Back to Countries
      </button>

      <h2 className="mb-6 text-xl font-bold text-slate-900">Universities</h2>

      <div className="grid grid-cols-1 gap-4" id="uni-grid">
        {universitiesList?.map((u) => (
          <button
            key={u.university_id}
            onClick={() => navigate(`/student/apply-to-university/universities/${u?.university_id}`)}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-500 hover:shadow-md"
          >
            <div className="flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
              <img
                src={u.university_image}
                alt={u.university_name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
            </div>

            <div className="flex flex-1 items-center justify-between gap-4">
              <div className="mb-5">
                <div className="text-lg font-bold text-slate-900">
                  {u.university_name}
                </div>
                <div className="mt-0 text-xs text-slate-500">
                  {u.university_city + "," + u.country_code}
                </div>
                <div className="mt-0 text-[11px] text-slate-400">
                  {u.type} • {u.rank}
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                View
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UniversitiesList;
