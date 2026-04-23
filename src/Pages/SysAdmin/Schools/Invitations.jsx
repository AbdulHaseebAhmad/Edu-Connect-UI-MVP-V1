import { useEffect, useState } from "react";
import { FaSearch, FaTrash, FaBell } from "react-icons/fa";
import SendInviteModal from "../../../Components/SysAdmin/SendInviteModal";
import { useDispatch } from "react-redux";
import { getAllInvites } from "../../../Features/Admin_Features/adminSlice";
import toast from "react-hot-toast";

const PendingInvite = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [invitations, setInvites] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = toast.loading("Fetching Invitations");
    dispatch(getAllInvites())
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success("Invitations Fetched Succesfully", { id });
          setInvites(res);
        }
      })
      .catch((e) => {
        toast.error("Fetching Invitations Failed", { id });
      });
  }, []);

  const renderStatusBadge = (status) => {
    const base =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide";

    switch (status) {
      case "pending":
        return (
          <span className={`${base} bg-amber-200 text-amber-700`}>
            • Pending
          </span>
        );
      case "completed":
        return (
          <span className={`${base} bg-indigo-200 text-indigo-700`}>
            • Completed
          </span>
        );
      case "rejected":
        return (
          <span className={`${base} bg-red-200 text-red-700`}>• Rejected</span>
        );
      case "approved":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            • Approved
          </span>
        );
      case "completed":
        return (
          <span className={`${base} bg-blue-100 text-blue-700`}>
            • Completed
          </span>
        );
      default:
        return (
          <span className={`${base} bg-pink-100 text-pink-600`}>
            • {status}
          </span>
        );
    }
  };

  return (
    <div className="fade-in px-4 pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            School Invitations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage invitations sent to partner schools.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Key */}
          <div className="hidden md:flex items-center gap-3 text-[11px] bg-white border border-slate-200 rounded-full px-4 py-1 shadow-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-amber-400 rounded-full" /> Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-indigo-500 rounded-full" /> Sent
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full" /> Expired
            </span>
          </div>

          {/* Search */}
          <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
            <div className="relative w-56">
              <FaSearch className="absolute left-3 top-2.5 text-slate-400 text-xs" />
              <input
                placeholder="Search school or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 rounded-full text-[11px] outline-none"
              />
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setInviteModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700"
          >
            <FaBell />
            Send Invitation
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-6">
        <table className="w-full">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-3 text-left ">School</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Invite ID</th>
              <th className="px-6 py-3 text-left">Sent On</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y text-xs">
            {invitations.map((invite) => (
              <tr
                key={invite.invitation_id}
                className="hover:bg-slate-50 text-left"
              >
                <td className="px-6 py-4 font-bold">{invite.school_name}</td>
                <td className="px-6 py-4 text-slate-500">
                  {invite.school_email}
                </td>
                <td className="px-6 py-4 font-mono">{invite.invitation_id}</td>
                <td className="px-6 py-4">{invite.created_at}</td>
                <td className="px-6 py-4">
                  {renderStatusBadge(invite.status)}
                </td>
                {invite.status == "pending" && (
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-[11px] font-bold">
                        <FaTrash /> Delete
                      </button>
                      <button className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-bold">
                        <FaBell /> Reminder
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {inviteModalOpen && (
        <SendInviteModal
          isOpen={inviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PendingInvite;
