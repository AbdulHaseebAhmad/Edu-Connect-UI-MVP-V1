import React, { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { FaArrowUp, FaClock, FaUniversity } from "react-icons/fa";

import {useDispatch, useSelector} from "react-redux";
import { GetSchoolAnalytics } from "../../Features/School_Features/SchoolSlice";
import toast from "react-hot-toast";

export function SchoolDashboardPage() {

  const dispatch  = useDispatch();
  const school_id = useSelector((state)=> state.authReducer.user_id);
  const [analytics,setAnalytics] = useState();
  
  useEffect(()=>{
    const id = toast.loading("Fetching Analytics");
    dispatch(GetSchoolAnalytics(school_id)).unwrap().then((res)=>{
      if(res){
        toast.success("Fetched Analytics!",{id})
        setAnalytics(res)
      }
    }).catch((e)=>{
      toast.error("Error Fetching Analytics",{id})
    })
  },[])

  return (
    <div className="fade-in space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:shadow-md transition">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1">
            Pending Verification
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{analytics?.pending_verifications}</div>
          <div className="flex items-center text-xs text-orange-600 font-bold mt-2">
            <FaClock className="mr-1" />
            Action Required
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:shadow-md transition">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1">
            Verified Students
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{analytics?.verified_students}</div>
          <div className="flex items-center text-xs text-indigo-600 font-bold mt-2">
            <FaArrowUp className="mr-1" />
            Updated in real time
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:shadow-md transition">
          <div className="text-slate-500 text-xs font-bold uppercase mb-1">
            University Enrolled
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{analytics?.university_enrolled}</div>
          <div className="flex items-center text-xs text-green-600 font-bold mt-2">
            <FaUniversity className="mr-1" />

            Success Stories
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl shadow-lg text-white">
          <div className="text-indigo-100 text-xs font-bold uppercase mb-1">
            Total Revenue
          </div>
          <div className="text-3xl font-extrabold text-white">${analytics?.university_enrolled * 20}.00</div>
          <div className="text-xs text-indigo-100 font-bold mt-2 opacity-80">
            Lifetime Earnings
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Top Destinations</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
            Chart placeholder
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {/* Activity items will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
