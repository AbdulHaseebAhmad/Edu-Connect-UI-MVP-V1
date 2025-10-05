import InviteOptiCard from "./InviteOptiCard";
import { handleCopy } from "../../Utillities/helpFunctions";

export default function InviteCardSucc({ message }) {
  const copyLink = () => {
    handleCopy(`${window.location.origin}/invites/${message.token}/${message.name}`);
  };
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Invitation Created Successfully!
        </h2>
        <p className="text-gray-500">
          Choose how you want to send the invitation
        </p>
      </div>

      <div className="bg-green-50 border border-green-400 rounded-lg p-6 text-center mb-6">
        <div className="text-4xl text-green-500 mb-3">
          <i className="fa fa-check-circle"></i>
        </div>
        <p>
          <strong>{message.name}</strong> has been added to your invitations
        </p>
        <p className="text-gray-600">Contact email: {message.email}</p>
      </div>

      <div className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6">
        <span className="font-mono text-gray-800 truncate pr-4">
          {`${window.location.origin}/invites/${message.token}/${message.name}`}
        </span>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          onClick={copyLink}
        >
          <i className="fa fa-copy mr-1"></i> Copy Link
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Invitation Instructions
        </h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Share this link with the school administrator</li>
          <li>The invitation will expire in 7 days</li>
          <li>Recipients can complete their own information</li>
        </ul>
      </div>

      <InviteOptiCard copyLink={copyLink} />
    </div>
  );
}
