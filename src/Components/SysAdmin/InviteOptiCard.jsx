import { FaUserEdit, FaEnvelope, FaLink } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { sendSchoolInvite } from "../../Features/Admin_Features/AdminSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { handleCopy } from "../../Utillities/helpFunctions";

export default function InviteOptiCard({ token, copyLink }) {
  const dispatch = useDispatch();



  const sendLinkHandle = () => {
    const id = toast.loading("Sending Invite Link To School");
    dispatch(sendSchoolInvite({ token, link: copyLink }))
      .unwrap()
      .then((res) => {
        toast.success("Invite Link Sent Succesfully", {id})
        // console.log(res);
      }).catch((e)=>{toast.error("Sending Invite Link Failed", {id})});
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        
        <div
          onClick={sendLinkHandle}
          className="bg-gray-50 border border-gray-200 shadow rounded-lg p-4 text-center hover:-translate-y-1 transition cursor-pointer"
        >
          <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
            <FaLink className="text-lg" />
          </div>
          <h3 className="font-semibold text-sm text-gray-800 mb-1">
            Send Email Invitation
          </h3>
          <p className="text-gray-500 text-xs">
            Send invitation directly to the school's email
          </p>
        </div>

        <div
          onClick={() =>{ handleCopy(copyLink);toast.success("Link Copied")}}
          className="bg-gray-50 border border-gray-200 shadow rounded-lg p-4 text-center hover:-translate-y-1 transition cursor-pointer"
        >
          <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
            <FaEnvelope className="text-lg" />
          </div>
          <h3 className="font-semibold text-sm text-gray-800 mb-1">
            Copy Invitation Link
          </h3>
          <p className="text-gray-500 text-xs">
            Copy link to share via other channels
          </p>
        </div>

        <Link
          to={copyLink}
          className="bg-gray-50 border border-gray-200 shadow rounded-lg p-4 text-center hover:-translate-y-1 transition cursor-pointer sm:col-span-2"
        >
          <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
            <FaUserEdit className="text-lg" />
          </div>
          <h3 className="font-semibold text-sm text-gray-800 mb-1">
            Enter Details Manually
          </h3>
          <p className="text-gray-500 text-xs">
            Fill out school details yourself
          </p>
        </Link>
      </div>
    </div>
  );
}
