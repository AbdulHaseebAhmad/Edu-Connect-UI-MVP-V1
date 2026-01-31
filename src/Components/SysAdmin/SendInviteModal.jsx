import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import SchoolInviteForm from "./InviteFormS";
import InviteCardSucc from "./InviteCardSucc";
import { createSchoolInvite } from "../../Features/Admin_Features/adminSlice";

export default function SchoolInviteModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [currentScreen, setCurrentScreen] = useState(0);
  const [responseMessage, setResponseMessage] = useState(null);

  const onChangeHandle = ({ name, value }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onGenerateLink = (data) => {
    if (!data) return;

    dispatch(createSchoolInvite(formData)).then((res) => {
      if (res?.payload) {
        setResponseMessage(res.payload);
        setCurrentScreen(1);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>

        <div className="p-8">
          {currentScreen === 0 ? (
            <SchoolInviteForm
              onChangeHandle={onChangeHandle}
              generateLink={onGenerateLink}
            />
          ) : (
            <InviteCardSucc message={responseMessage} />
          )}
        </div>
      </div>
    </div>
  );
}
