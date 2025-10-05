import { useState } from "react";
import { signupFormDetails } from "./Constants";
import { useDispatch } from "react-redux";
import { SignupAdmin } from "../Features/Admin_Features/adminSlice";
import { Link, NavLink } from "react-router-dom";

export default function Signup() {
  const [formDetails, setFormDetails] = useState({});
  const dispatch = useDispatch();
  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(SignupAdmin(formDetails));
  };
  return (
    <div className="min-h-screen bg-pink-gradient pt-10 lg:pt-[100px] px-4">
  <div className="flex flex-col gap-6 w-full max-w-[680px] mx-auto min-h-[450px] border-4 border-white rounded-md bg-white bg-opacity-[30.5%] p-6">
    <div className="w-full flex flex-col mt-10 text-center lg:text-left">
      <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-[#404040] mx-auto">
        System Administration
      </h2>
      <h2 className="text-xl lg:text-2xl font-poppins font-bold text-[#404040] mt-5 text-center lg:text-start">
        Sign Up
      </h2>
    </div>

    {/* Form */}
    <form
      onSubmit={(e) => {
        onSubmitHandle(e);
      }}
      className="w-full flex flex-col items-center justify-center gap-8 min-h-[300px] rounded-md"
    >
      <div className="w-full flex flex-wrap justify-center gap-4">
        {signupFormDetails.map((eachInput, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] lg:w-[300px] flex flex-col gap-2"
          >
            <label
              htmlFor={eachInput.inputId}
              className="font-poppins text-[#404040] font-semibold"
            >
              {eachInput.inputLabel}
            </label>
            <input
              className="min-h-[45px] p-2 w-full border-2 border-[#404040] bg-transparent rounded-md focus:outline-none focus:border-4 focus:indent-2 cursor-pointer"
              id={eachInput.inputId}
              type={eachInput.inputType}
              name={eachInput.inputName}
              onChange={onChangeHandle}
              required
            />
          </div>
        ))}
      </div>

      {/* Already have account link */}
      <div className="w-full mt-2 text-center lg:text-left">
        <Link
          to="/login"
          className="cursor-pointer font-poppins hover:font-semibold text-[#404040] font-medium"
        >
          Already have an account?
        </Link>
      </div>

      <div className="w-full mt-2 flex flex-col sm:flex-row justify-between gap-2">
        <button
          type="button"
          className="flex items-center min-h-[45px] w-full sm:w-[48%] border-2 border-[#404040] font-poppins rounded-md hover:bg-pink-gradient font-bold text-[#404040] p-[10px]"
        >
          <Link
            to="/login"
            className="w-full h-full flex items-center justify-center"
          >
            Login
          </Link>
        </button>
        <button
          type="submit"
          className="min-h-[45px] w-full sm:w-[48%] border-2 border-[#404040] font-poppins rounded-md hover:bg-pink-gradient font-bold text-[#404040]"
        >
          Next
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
