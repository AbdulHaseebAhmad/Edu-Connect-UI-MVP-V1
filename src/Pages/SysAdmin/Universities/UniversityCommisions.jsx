import { useEffect, useMemo, useState } from "react";
import { FaChevronRight, FaFilter, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FetchUniversitiesCommisions } from "../../../Features/Admin_Features/AdminSlice";

export default function UniversityCommissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [commissions, setCommissions] = useState("");

  // Replace this with your real API data
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(FetchUniversitiesCommisions()).unwrap().then((res)=>{
        if(res){
            setCommissions(res || [])
        }
    })
  },[])

  const filteredCommissions = useMemo(() => {
    return commissions?.length > 0 && commissions?.filter((item) => {
      const search = searchTerm.toLowerCase();

      return (
        item.application_id.toLowerCase().includes(search) ||
        item.university_name.toLowerCase().includes(search) ||
        item.student_name.toLowerCase().includes(search) ||
        item.program_name.toLowerCase().includes(search) ||
        item.payment_status.toLowerCase().includes(search)
      );
    });
  }, [commissions, searchTerm]);

  const applicationStatusColor = (status) => {
    if (status === "pending") {
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-yellow-100 text-yellow-700";
    }
    if (status === "offered") {
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-purple-100 text-purple-700";
    }
    if (status === "enrolled") {
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-green-100 text-green-700";
    }
    return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-red-100 text-red-700";
  };

  const paymentStatusColor = (status) => {
    if (status === "paid") {
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-green-100 text-green-700";
    }
    if (status === "processing") {
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-blue-100 text-blue-700";
    }
    if (status === "unpaid") {
      return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-orange-100 text-orange-700";
    }
    return "text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-red-100 text-red-700";
  };

  return (
    <div className="fade-in px-6 py-6 relative min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            University Commissions
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track what each university owes in commission across submitted applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
            <div className="flex items-center">
              <FaSearch className="text-slate-400 text-[11px] ml-2 mr-2" />
              <input
                type="text"
                placeholder="Search by app ID, university, student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-1 pr-3 py-1.5 text-[11px] rounded-full bg-slate-50 outline-none"
              />
            </div>
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 shadow-sm">
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      {/* Status Key */}
      <div className="hidden md:flex flex-wrap items-center gap-3 text-[11px] bg-white border border-slate-200 rounded-full px-4 py-1 shadow-sm mb-4 w-fit">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-400 rounded-full" /> Pending
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-purple-500 rounded-full" /> Offered
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full" /> Paid / Enrolled
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-orange-400 rounded-full" /> Unpaid
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full" /> Rejected / Cancelled
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1220px]">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-3 text-center">Application </th>
                <th className="px-6 py-3 text-center">University </th>
                <th className="px-6 py-3 text-center">Student </th>
                <th className="px-6 py-3 text-center">Program </th>
                <th className="px-6 py-3 text-center">Commission Type</th>
                <th className="px-6 py-3 text-center">Commission Fee</th>
                <th className="px-6 py-3 text-center">Program Fee </th>
                <th className="px-6 py-3 text-center">Application Status</th>
                <th className="px-6 py-3 text-center">Payment Status</th>
                <th className="px-6 py-3 text-center">Receipt</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredCommissions.length > 0 ? (
                filteredCommissions.map((item) => (
                  <tr
                    key={item.application_id}
                    className="hover:bg-slate-50 transition cursor-pointer text-center"
                  >
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                      {item.application_id}
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900">
                      {item.university_name}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {item.student_name}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {item.program_name}
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900">
                      {item.commision_type}
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900">
                      {item.commision_type == "%" ? item.currency + " "+ ((item.commision_amount/item.program_fee_amount)*100): item.currency + " "+ item.commision_amount}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-600">
                      {item.currency + " "+ item.program_fee_amount}
                    </td>

                    <td className="px-6 py-4">
                      <span className={applicationStatusColor(item.application_status)}>
                        {item.application_status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={paymentStatusColor(item.payment_status)}>
                        {item.payment_status || "-"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      {item?.receipt && <button className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700">
                        View
                        <FaChevronRight className="w-3 h-3" />
                      </button>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-8 text-center text-slate-400 text-sm"
                  >
                    No commission records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}