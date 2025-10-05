import { FaUserEdit,FaEnvelope, FaLink } from "react-icons/fa";

export default function InviteOptiCard({copyLink}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        
        <div className="bg-gray-50 border border-gray-200 shadow rounded-lg p-6 text-center hover:-translate-y-1 transition cursor-pointer">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 text-2xl">
            <FaLink className="text-xl text-blue-500" />;
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">
            Send Email Invitation
          </h3>
          <p className="text-gray-500 text-sm">
            Send invitation directly to the school's email
          </p>
        </div>

        <div onClick={()=> copyLink()} className="bg-gray-50 border border-gray-200 shadow rounded-lg p-6 text-center hover:-translate-y-1 transition cursor-pointer">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 text-2xl">
            <FaEnvelope className="text-xl text-blue-500" />;
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">
            Copy Invitation Link
          </h3>
          <p className="text-gray-500 text-sm">
            Copy link to share via other channels
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 shadow rounded-lg p-6 text-center hover:-translate-y-1 transition cursor-pointer">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 text-2xl">
            <FaUserEdit className="text-xl text-blue-500" />;
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">
            Enter Details Manually
          </h3>
          <p className="text-gray-500 text-sm">
            Fill out school details yourself
          </p>
        </div>
      </div>
    </div>
  );
}
