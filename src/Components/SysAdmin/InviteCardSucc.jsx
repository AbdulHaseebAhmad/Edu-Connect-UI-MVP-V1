import InviteOptiCard from "./InviteOptiCard";
import { handleCopy } from "../../Utillities/helpFunctions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function InviteCardSucc({ message }) {
  const [link, setLink] = useState("");

  const copyLink = () => {
    handleCopy(link);
    toast.success("Link Copied")
  };

  useEffect(() => {
    const link = `${window.location.origin}/invites/${message.token}/${message.name}`;
    setLink(link);
  }, [message]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-h-[70vh] overflow-y-auto">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Invitation Created Successfully!
        </h2>
        <p className="text-sm text-gray-500">
          Choose how you want to send the invitation
        </p>
      </div>

      <div className="bg-green-50 border border-green-400 rounded-lg p-4 text-center mb-4">
        <div className="text-3xl text-green-500 mb-2">
          <i className="fa fa-check-circle"></i>
        </div>
        <p className="text-sm">
          <strong>{message.name}</strong> has been added to your invitations
        </p>
        <p className="text-sm text-gray-600">
          Contact email: {message.email}
        </p>
      </div>

      <div className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-lg p-3 mb-4">
        <span className="font-mono text-xs text-gray-800 truncate pr-3">
          {link}
        </span>
        <button
          className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs hover:bg-blue-700"
          onClick={copyLink}
        >
          <i className="fa fa-copy mr-1"></i> Copy
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Invitation Instructions
        </h3>
        <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
          <li>Share this link with the school administrator</li>
          <li>The invitation will expire in 7 days</li>
          <li>Recipients can complete their own information</li>
        </ul>
      </div>

      <InviteOptiCard token={message.token} copyLink={link} />
    </div>
  );
}
