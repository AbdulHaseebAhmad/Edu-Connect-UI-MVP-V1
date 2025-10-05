import "font-awesome/css/font-awesome.min.css";
import SchoolInviteForm from "../../Components/SysAdmin/InviteFormS";
import InviteCardSucc from "../../Components/SysAdmin/InviteCardSucc";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSchoolInvite } from "../../Features/Admin_Features/adminSlice";

export default function SysAdminInvitation() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");

  const onChangeHandle = (data) => {
    const { name, value } = data;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onGenerateLink = (data) => {
    if (!data) {
      return;
    }
    dispatch(createSchoolInvite(formData)).then((res) => {
      if (res) {
        console.log(res.payload);
        setCurrentScreen(1);
        setResponseMessage(res.payload);
      }
    });
  };

  return (
    <div className="flex-2/2 p-6 overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl text-blue-600 mb-2">
            <i className="fa fa-graduation-cap"></i>
          </div>
          <div className="text-2xl font-bold text-gray-800 tracking-tight">
            EduAI
          </div>
        </div>
        {currentScreen == 0 ? (
          <SchoolInviteForm
            onChangeHandle={onChangeHandle}
            generateLink={onGenerateLink}
          />
        ) : (
          <InviteCardSucc message={responseMessage} />
        )}
      </div>
    </div>
  );
}
