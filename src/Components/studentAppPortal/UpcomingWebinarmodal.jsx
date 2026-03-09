import { FaUniversity, FaTimes, FaClock, FaVideo } from "react-icons/fa";

export default function UpcomingWebinarModal({ webinar, onClose }) {
  if (!webinar) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="h-40 bg-gradient-to-r from-red-600 to-red-800 relative flex-shrink-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-white flex-col z-10">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm border border-white/30">
              <FaUniversity className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold">{webinar.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="z-20 absolute top-4 right-4 text-white/70 hover:text-white transition bg-black/20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto">
          <div className="flex gap-6 mb-6">
            <div className="flex-1">
              <h3 className="font-bold text-xl text-slate-900 mb-1">
                {webinar?.descriptive_title}
              </h3>
              <p className="text-sm text-slate-500 mb-3">
                {webinar?.hosted_by}
              </p>

              <div className="flex gap-4 text-xs font-bold text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="flex items-center gap-1">
                  <FaClock className="text-blue-500" />
                  {webinar.date} {webinar?.time} GMT
                </span>
                <span className="flex items-center gap-2">
                  <FaVideo className="text-red-500" />
                  {webinar?.platform}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Event Agenda
            </h4>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                {/* <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                  01
                </div> */}
                <div className="w-0.5 h-full bg-slate-100 my-1" />
              </div>
              <div className="pb-6">
                {/* <h5 className="font-bold text-sm text-slate-800">
                  Turkiye Burslari Scholarship
                </h5> */}
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {webinar?.description}
                </p>
              </div>
            </div>

            {/* <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                  02
                </div>
                <div className="w-0.5 h-full bg-slate-100 my-1" />
              </div>
              <div className="pb-6">
                <h5 className="font-bold text-sm text-slate-800">
                  Student Visa Procedure
                </h5>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Step-by-step guide on documents needed for the Turkish embassy
                  interview.
                </p>
              </div>
            </div> */}

            {/* <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                  03
                </div>
              </div>
              <div>
                <h5 className="font-bold text-sm text-slate-800">
                  Q&A with University Officers
                </h5>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Live session with admission officers from Koç and Sabancı
                  University.
                </p>
              </div>
            </div> */}
          </div>

          <button
            onClick={() => {
              alert("Registered! Zoom link sent to email.");
              onClose();
            }}
            className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition shadow-lg shadow-red-200 text-sm"
          >
            Register for Free
          </button>
        </div>
      </div>
    </div>
  );
}
