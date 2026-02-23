import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaUniversity,
  FaGraduationCap,
  FaInfoCircle,
  FaBriefcase,
  FaHeart,
  FaCheckCircle,
  FaSearch,
  FaChevronRight,
  FaFileAlt,
  FaBook,
  FaSearchPlus,
} from "react-icons/fa";
import { PaymentProofModal } from "../../Components/studentAppPortal/ProofOfPaymentModal";
import { ApplyConfirmationModal } from "../../Components/studentAppPortal/ApplyConfirmationModal";
import {
  ApplyToUniversity,
  GetCountriesList,
  GetProgramsList,
  GetUniversityList,
  UploadApplicationReceipt,
} from "../../Features/Students_Features/StudentAppSlice";
import { useDispatch, useSelector } from "react-redux";
import { MissingDocumentsModal } from "../../Components/studentAppPortal/MissingdocsModal";
import { IncompleteProfileModal } from "../../Components/studentAppPortal/IncompleteProfileModal";
import { fileToBase64 } from "../../Utillities/helpFunctions";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export function Countries() {
  const [countriesList, setListOfCountries] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(GetCountriesList(""))
      .unwrap()
      .then((res) => {
        if (res) {
          setListOfCountries(res || []);
        }
      });
  }, []);



  return (
    <div className="fade-in space-y-4 pt-4">
      <div className="flex gap-4 overflow-x-auto pb-2 pb-2 px-2">
        <select className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:ring-2 ring-blue-500 outline-none shadow-sm min-w-[140px]">
          <option>All Countries</option>
          <option>UK</option>
          <option>USA</option>
          <option>Canada</option>
          <option>Australia</option>
        </select>
        <div className="flex-1 relative min-w-[300px]">
          <FaSearchPlus className="absolute left-4 top-3.5 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search 12,000+ programs..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:ring-2 ring-blue-500 outline-none shadow-sm"
          />
        </div>
      </div>

      <div id="dd-lvl-1">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Select Destination
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          id="country-grid"
        >
          {countriesList &&
            countriesList?.length > 0 &&
            countriesList.map((country, key) => (
              <div
                key={country?.country_code}
                onClick={() =>
                  navigate(
                    `/student/apply-to-university/countries/${country?.country_code}`
                  )
                }
                className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-2 hover:border-blue-200 cursor-pointer transition-all duration-300 overflow-hidden shadow-sm"
              >
                <div className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl mb-4 overflow-hidden group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500">
                  <img
                    src={
                      country?.image_url ||
                      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=208&fit=crop"
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={country.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent" />
                </div>
                <div className="text-center">
                  <h3 className="font-extrabold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {country?.unis?.length} Top Universities
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
