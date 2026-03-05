import { useState } from "react";
import { FaCheckCircle, FaLayerGroup, FaShieldAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  GetStudentDetails,
  GetStudentDocuments,
  SigninStudent,
} from "../Features/Students_Features/StudentAppSlice";
import logo from "../assets/pgl.png";
export default function StudentAppLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onsubmitHandle = () => {
    console.log(formData);
    let user_id;
    dispatch(SigninStudent(formData))
      .unwrap()
      .then((res) => {
        if (res) {
          // console.log(res);
          user_id = res?.student_id;
          dispatch(GetStudentDetails(res?.student_id))
            .unwrap()
            .then((res) => {
              if (res) {
                dispatch(GetStudentDocuments(user_id))
                  .unwrap()
                  .then((res) => {
                    if (res) {
                      if (res?.data?.role == "student") {
                        setTimeout(
                          () => navigate("/std-app-portal/dashboard"),
                          1500,
                        );
                      }
                    }
                  });
              }
            });
        }
      });
  };

  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-6xl h-[80vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden relative z-10">
        <div className="hidden lg:flex w-1/3 bg-slate-50 relative flex-col justify-between p-12 border-r border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-8">
              {/* <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white">
                <FaLayerGroup className="text-sm" />
              </div> */}
              <span className="font-bold text-xl tracking-tight text-slate-900">
                <div className="bg-white py-2 w-[150px] text-white w-8 h-8 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-900/50">
                  <img src={logo} />
                </div>
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Secure Student Portal
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <p className="text-sm text-slate-600">
                  <strong>Mandatory Verification:</strong> All profiles are
                  vetted by High School Admins.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <p className="text-sm text-slate-600">
                  <strong>Data Lock:</strong> Once submitted, your academic data
                  is read-only.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/5 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <FaShieldAlt className="text-blue-600" />
              <span className="font-bold text-blue-900 text-sm">
                Admissions Protocol
              </span>
            </div>
            <p className="text-xs text-blue-700">
              Please have your Passport and Official Transcript ready before
              starting registration.
            </p>
          </div>
        </div>

        <div className="flex-1 relative overflow-y-auto">
          <div className="h-full flex flex-col justify-center px-12 py-12 max-w-lg mx-auto border-b border-slate-100 lg:border-b-0">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Student Login
              </h2>
              <p className="text-slate-500">Access your verified dashboard.</p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  className="input-field w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  onChange={(e) => onChangeHandle(e)}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="input-field w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                  onChange={(e) => onChangeHandle(e)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-slate-500">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm font-bold text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="button"
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-lg"
                onClick={onsubmitHandle}
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Don't have a verified profile?
              </p>
              <button
                type="button"
                className="mt-2 text-blue-600 font-bold hover:underline"
              >
                <Link to={"/student/signup"}>Start Registration Wizard</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
