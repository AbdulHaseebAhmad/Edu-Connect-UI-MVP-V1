import { FaUserEdit,FaEnvelope, FaLink } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { sendSchoolInvite } from "../../Features/Admin_Features/AdminSlice";
import {Link, useNavigate } from "react-router-dom"

export default function InviteOptiCard({token,copyLink}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const sendLinkHandle = () =>{
    dispatch(sendSchoolInvite({token:token,link:copyLink})).unwrap().then((res)=>{
      console.log(res)
    })
  }

  
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        
        <div onClick={()=> sendLinkHandle()} className="bg-gray-50 border border-gray-200 shadow rounded-lg p-6 text-center hover:-translate-y-1 transition cursor-pointer">
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

        <Link to={`${copyLink}`} className="bg-gray-50 border border-gray-200 shadow rounded-lg p-6 text-center hover:-translate-y-1 transition cursor-pointer">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 text-2xl">
            <FaUserEdit className="text-xl text-blue-500" />;
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">
            Enter Details Manually
          </h3>
          <p className="text-gray-500 text-sm">
            Fill out school details yourself
          </p>
        </Link>
      </div>
    </div>
  );
}
