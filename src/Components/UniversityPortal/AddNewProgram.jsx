import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNewProgram, UpdateProgram } from "../../Features/University_Features/UniversityAppSlice";

export function ProgramModal({ open, onClose, program,reFetch }) {

  const university_id = useSelector((state)=>state.authReducer.user_id);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    program_name: "",
    program_id: "",
    program_fee: "",
    program_application_fee: "",
    program_level:"",
    program_capacity:"",
    program_duration: "",
    session_intake: "",
    program_description: "",
    program_requirements: [],
    related_tags: [],
    possible_careers: [],
    program_required_documents: [],
    university_id: university_id,
  });

  useEffect(() => {
   if(program){
    setFormData(program)
   }
 },[program]);  

  if (!open) return null;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInput = (field, value) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value.trim()],
    }));
  };

  const removeItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if(!program){
      dispatch(AddNewProgram(formData)).unwrap().then((res)=>{
       if(res){
         reFetch();
       }
      })
    } else{
      dispatch(UpdateProgram({data:formData,program_id:program?.program_id})).unwrap().then((res)=>{
       if(res){
         reFetch();
       }
      })
    }
    onClose();
  };



  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-6"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-indigo-600 px-8 py-5 flex justify-between items-center text-white">
          <div>
            <h3 className="font-bold text-xl">Create Academic Program</h3>
            <p className="text-xs text-indigo-200">
              Define academic structure, fees, and admission rules
            </p>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10">

          {/* Program Identity */}
          <Section title="Program Identity">
             <Input
              label="Program Name"
              name="program_name"
              value={formData?.program_name}
              onChange={handleChange}
            />
            <Input
              label="Program Id"
              name="program_id"
              onChange={handleChange}
              value={formData?.program_id}
              disabled
            />
          </Section>

          {/* Academic Details */}
          <Section title="Academic Details">
            <Input
              label="Duration"
              name="program_duration"
              value={formData.program_duration}
              onChange={handleChange}
            />
            <Input
              label="Session Intake"
              name="session_intake"
              value={formData.session_intake}
              onChange={handleChange}
            />
            <Input
              label="Tuition Fee / Year"
              name="program_fee"
              value={formData.program_fee}
              onChange={handleChange}
            />
            <Input
              label="Application Fee"
              name="program_application_fee"
              value={formData.program_application_fee}
              onChange={handleChange}
            />
              <Input
                label="Program Level"
                name="program_level"
                value={formData.program_level}
                onChange={handleChange}
              />
            <Input
              label="Program Capacity"
              name="program_capacity"
              value={formData.program_capacity}
              onChange={handleChange}
              />
          </Section>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
              Program Description
            </label>
            <textarea
              rows={6}
              name="program_description"
              value={formData.program_description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 ring-indigo-500 outline-none"
            />
          </div>

          {/* Requirements & Metadata */}
          <Section title="Admission & Metadata">
            <TagInput
              label="Program Requirements"
              onAdd={(v) => handleArrayInput("program_requirements", v)}
              items={formData.program_requirements}
              onRemove={(i) => removeItem("program_requirements", i)}
            />

            <TagInput
              label="Required Documents"
              onAdd={(v) => handleArrayInput("program_required_documents", v)}
              items={formData.program_required_documents}
              onRemove={(i) => removeItem("program_required_documents", i)}
            />

            <TagInput
              label="Possible Careers"
              onAdd={(v) => handleArrayInput("possible_careers", v)}
              items={formData.possible_careers}
              onRemove={(i) => removeItem("possible_careers", i)}
            />

            <TagInput
              label="Related Tags"
              onAdd={(v) => handleArrayInput("related_tags", v)}
              items={formData.related_tags}
              onRemove={(i) => removeItem("related_tags", i)}
            />
          </Section>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-md"
          >
            {program ? "Edit Program" :" Create Program"}
          </button>
        </div>
      </div>
    </div>
  );
}


function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-slate-800 mb-4">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 ring-indigo-500 outline-none"
      />
    </div>
  );
}

function TagInput({ label, onAdd, items, onRemove }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
        {label}
      </label>

      <input
        placeholder="Type and press Enter"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onAdd(e.target.value);
            e.target.value = "";
          }
        }}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 ring-indigo-500 outline-none"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {items?.length > 0 && items.map((item, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full flex items-center gap-2"
          >
            {item}
            <button onClick={() => onRemove(i)}>✕</button>
          </span>
        ))}
      </div>
    </div>
  );
}
