export function MessagesPage() {
  return (
    <div className="fade-in h-[calc(100vh-8rem)] flex gap-6">
      {/* Inbox */}
      <div className="w-1/3 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
        <div className="p-5 border-b border-slate-100 font-bold text-base bg-slate-50/50">
          Inbox
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 bg-blue-50 border-l-4 border-blue-600 cursor-pointer hover:bg-blue-100 transition">
            <div className="flex justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">
                Advisor Sarah
              </span>
              <span className="text-xs text-slate-500">10:30 AM</span>
            </div>
            <p className="text-xs text-slate-600 truncate font-medium">
              Please upload your CV.
            </p>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="w-2/3 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <span className="font-bold text-base">Advisor Sarah</span>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
            Online Support
          </span>
        </div>
        <div className="flex-1 p-6 bg-slate-50 space-y-4 overflow-y-auto">
          <div className="flex gap-3">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm border border-slate-200 max-w-sm text-slate-700 leading-relaxed">
              Welcome, Alex! I am your dedicated advisor. Let me know if you
              need help shortlisting universities.
            </div>
          </div>
        </div>
        <div className="p-5 bg-white border-t border-slate-100 flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm focus:ring-2 ring-blue-500 outline-none"
          />
          <button className="bg-blue-600 text-white rounded-xl px-6 py-3 text-sm font-bold hover:bg-blue-700 shadow-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}