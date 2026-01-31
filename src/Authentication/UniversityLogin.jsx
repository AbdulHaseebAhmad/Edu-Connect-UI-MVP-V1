import { useState } from "react";
import { FaUniversity, FaShieldAlt, FaUserCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { LoginUniversity } from "../Features/University_Features/UniversityAppSlice";
import { useNavigate } from "react-router";

export default function UniversityLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUniversity({ email, password }))
      .unwrap()
      .then((res) => {
        if (res) {
          navigate("/university");
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
              <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white">
                <FaUniversity className="text-sm" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                UniGlobal<span className="text-blue-500">.</span>
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              University Portal
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaShieldAlt className="text-blue-600 mt-1" />
                <p className="text-sm text-slate-600">
                  <strong>Institution Access:</strong> Secure sign-in for
                  verified universities.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaUserCheck className="text-green-500 mt-1" />
                <p className="text-sm text-slate-600">
                  <strong>Role Based:</strong> Admissions & registry officers
                  only.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/5 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-bold text-blue-900 text-sm">
                Compliance Notice
              </span>
            </div>
            <p className="text-xs text-blue-700">
              Access activity is logged and audited.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 relative overflow-y-auto">
          <div className="h-full flex flex-col justify-center px-12 py-12 max-w-lg mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                University Login
              </h2>
              <p className="text-slate-500">
                Sign in using your institutional credentials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  University Email / ID
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admissions@university.edu"
                  className="input-field w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)] focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)] focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-lg"
              >
                Secure Sign In
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Not partnered with UniGlobal?
              </p>
              <button className="mt-2 text-blue-600 font-bold hover:underline">
                Request University Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
