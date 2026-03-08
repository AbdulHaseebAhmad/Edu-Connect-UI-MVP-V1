// import { SigninAdmin } from "../Features/Admin_Features/adminSlice";
// import { loginFormDetails } from "./Constants";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { SigninSchool } from "../Features/School_Features/SchoolSlice";
// import { useNavigate } from "react-router";

// export default function Login() {
//   const navigate = useNavigate();
//   const [formDetails, setFormDetails] = useState({});
//   const [role,setRole] = useState();

//   const dispatch = useDispatch();

//   const onChangeHandle = (e) => {
//     const { name, value } = e.target;
//     setFormDetails((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//     if (name === "email"){
//       checkRole(value)
//     }
//   };

//   const onSubmitHandle = (e) => {
//     e.preventDefault();
//     console.log(role)
//     if (role !== ""){
//       if (role != "school" ) {
//         dispatch(SigninAdmin(formDetails)).unwrap().then((res)=>{
//           if (res) {
//             navigate("/sysadmin/dashboard")
//           }
//         });
//       } else {
//         dispatch(SigninSchool(formDetails)).unwrap().then((res)=>{
//           if (res) {
//             navigate("/schooladmin")
//           }
//         });
//       }
//     }
//   };

//   const checkRole = (value) => {
//     let parseEmail = value?.split("@")
//     let parseRole = parseEmail?.[1]?.split(".");
    
//     if (parseRole?.includes("school")){
//       setRole("school")
//     } else {
//       setRole("admin")
//     }
//   }


//   return (
//     <div className="min-h-screen bg-pink-gradient pt-10 lg:pt-[100px] px-4">
//   <div className="flex flex-col gap-6 w-full max-w-[500px] mx-auto min-h-[450px] border-4 border-white rounded-md bg-white bg-opacity-[30.5%] p-6">
    
//     <div className="w-full flex flex-col mt-6 text-center lg:text-left">
//       <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-[#404040]">
//         System Administration
//       </h2>
//       <h2 className="text-xl lg:text-2xl font-poppins font-bold text-[#404040] mt-4">
//         Log In
//       </h2>
//     </div>

//     <form
//       onSubmit={(e) => onSubmitHandle(e)}
//       className="w-full flex flex-col items-center justify-center gap-6 min-h-[250px]"
//     >
//       {loginFormDetails.map((eachInput, index) => (
//         <div key={index} className="w-full flex flex-col gap-2">
//           <label
//             htmlFor={eachInput.inputId}
//             className="font-poppins text-[#404040] font-semibold"
//           >
//             {eachInput.inputLabel}
//           </label>
//           <input
//             className="min-h-[45px] p-2 w-full border-2 border-[#404040] bg-transparent rounded-md focus:outline-none focus:border-4 focus:indent-2"
//             id={eachInput.inputId}
//             type={eachInput.inputType}
//             name={eachInput.inputName}
//             onChange={onChangeHandle}
//             required
//           />
//         </div>
//       ))}
//       <div className="w-full -mt-2 text-left">
//         <a className="cursor-pointer font-poppins hover:font-semibold text-[#404040] font-medium">
//           Forgot your Password?
//         </a>
//       </div>
//       <div className="w-full mt-3 flex flex-col sm:flex-row justify-between gap-3">
//         <button
//           type="button"
//           className="flex items-center min-h-[45px] w-full sm:w-[48%] border-2 border-[#404040] font-poppins rounded-md hover:btn-gradient-hover-bg hover:text-[#404040] font-bold text-[#404040]"
//         >
//           <Link to="/signup" className="w-full h-full flex items-center justify-center">
//             Signup
//           </Link>
//         </button>
//         <button
//           type="submit"
//           className="min-h-[45px] w-full sm:w-[48%] border-2 border-[#404040] font-poppins rounded-md hover:btn-gradient-hover-bg hover:text-[#404040] font-bold text-[#404040]"
//         >
//           Next
//         </button>
//       </div>
//     </form>
//   </div>
// </div>

//   );
// }


import { useState } from "react";
import { FaUserShield, FaShieldAlt, FaUserCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { SigninAdmin } from "../Features/Admin_Features/adminSlice";
import { useNavigate } from "react-router";

export default function SystemAdminLogin() {
  const [formDetails, setFormDetails] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(SigninAdmin(formDetails))
      .unwrap()
      .then((res) => {
        if (res) {
          navigate("/sysadmin/dashboard");
        }
      });
  };

  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden font-[Plus_Jakarta_Sans]">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl h-[90vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Left Panel */}
        <div className="hidden lg:flex w-1/3 bg-slate-50 p-12 flex-col justify-between border-r border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-slate-900 w-8 h-8 rounded-lg flex items-center justify-center text-white">
                <FaUserShield className="text-sm" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                SysControl<span className="text-blue-500">.</span>
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              System Admin Portal
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaShieldAlt className="text-blue-600 mt-1" />
                <p className="text-sm text-slate-600">
                  <strong>Privileged Access:</strong> Restricted to platform
                  administrators.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaUserCheck className="text-green-500 mt-1" />
                <p className="text-sm text-slate-600">
                  <strong>Full Control:</strong> Manage institutions, users and
                  global settings.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/5 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-bold text-blue-900 text-sm">
                Security Advisory
              </span>
            </div>
            <p className="text-xs text-blue-700">
              Administrative actions are monitored and audited in real-time.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 relative overflow-y-auto">
          <div className="h-full flex flex-col justify-center px-12 py-12 max-w-lg mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                System Admin Login
              </h2>
              <p className="text-slate-500">
                Sign in using your administrator credentials.
              </p>
            </div>

            <form onSubmit={onSubmitHandle} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Admin Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formDetails.email || ""}
                  onChange={onChangeHandle}
                  placeholder="admin@platform.com"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:shadow-[0_0_0_4px_rgba(15,23,42,0.12)] focus:border-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formDetails.password || ""}
                  onChange={onChangeHandle}
                  placeholder="••••••••"
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:shadow-[0_0_0_4px_rgba(15,23,42,0.12)] focus:border-slate-900"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-lg"
              >
                Sign In as Admin
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Need an administrator account?
              </p>
              <button className="mt-2 text-blue-600 font-bold hover:underline">
                Contact Platform Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
