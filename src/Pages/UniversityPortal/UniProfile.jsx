import React, { useState } from "react";
import GeneralTab from "./GeneralTab";
import MediaTab from "../../Components/UniversityPortal/MediaTab";
import StatsTab from "../../Components/UniversityPortal/StatsTab";
import SocialTab from "../../Components/UniversityPortal/SocialTab";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUniversityProfiile } from "../../Features/University_Features/UniversityAppSlice";


export default function UniversityProfilePage() {
  const [tab, setTab] = useState("general");
  const [profile,setProfile] = useState({});

  const TabBtn = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`flex-1 py-4 text-xs font-bold border-b-2 transition ${tab === id ? "border-indigo-600 text-indigo-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"}`}
    >
      {label}
    </button>
  );

  const dispatch = useDispatch();
  const university_id = useSelector((state) => state.authReducer.user_id);

  useEffect(() => {
    console.log(university_id)
    dispatch(GetUniversityProfiile(university_id)).unwrap().then((res)=>{
      if(res){
        setProfile(res)
      }
    })
  }, [university_id]);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">University Profile CMS</h2>
        <p className="text-sm text-slate-500">
          Manage your public university presence
        </p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="flex bg-slate-50 border-b">
          <TabBtn id="general" label="General Info" />
          <TabBtn id="media" label="Media Branding" />
          {/* <TabBtn id="stats" label="Key Statistics" /> */}
          <TabBtn id="social" label="Contact & Social" />
        </div>

        <div className="p-10 min-h-[500px]">
          {tab === "general" && <GeneralTab profile={profile}/>}
          {tab === "media" && <MediaTab profile={profile?.Media}/>}
          {tab === "stats" && <StatsTab />}
          {tab === "social" && <SocialTab profile={profile}/>}
        </div>
      </div>

      <style jsx="true">{`
        .field {
          width: 100%;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .upload-box {
          width: 8rem;
          height: 8rem;
          border: 2px dashed #cbd5e1;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          cursor: pointer;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: 0.2s;
        }
        .overlay:hover {
          opacity: 1;
        }
        .delete-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: #ef4444;
          color: white;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .add-box {
          border: 2px dashed #cbd5e1;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          cursor: pointer;
        }
        .stat-row {
          display: flex;
          gap: 1rem;
          background: #f8fafc;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
        }
        .stat-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          font-size: 0.75rem;
        }
        .icon-box {
          width: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
        }
      `}</style>
    </div>
  );
}
