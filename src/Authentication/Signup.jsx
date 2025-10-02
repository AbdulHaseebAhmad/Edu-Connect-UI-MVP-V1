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
    <div className="min-h-screen bg-pink-gradient lg:pt-[100px]">
      <div className="flex flex-col lg:gap-[20px] lg:w-[50%] lg:mx-auto lg:min-h-[550px] border-4 border-[white] rounded-md bg-white bg-opacity-[30.5%]">
        <div className="lg:mx-auto lg:w-[80%] flex-col mt-[40px]">
          <h2 className="text-3xl font-poppins font-bold text-[#404040] mx-auto text-center">
            System Administration
          </h2>
          <h2 className="text-2xl font-poppins font-bold text-[#404040] mt-[20px] text-start">
            Sign Up
          </h2>
        </div>
        <form
          onSubmit={(e) => {
            onSubmitHandle(e);
          }}
          className="mx-auto w-[80%] flex flex-col items-center justify-center gap-[30px] lg:min-h-[300px] rounded-md"
        >
          <div className="lg:w-full flex justify-center flex-wrap gap-2">
            {signupFormDetails.map((eachInput, index) => {
              return (
                <div
                  key={index}
                  className="w-full lg:w-[300px] flex flex-col gap-2"
                >
                  <label
                    htmlFor={eachInput.inputId}
                    className="font-poppins text-[#404040] font-semibold"
                  >
                    {eachInput.inputLabel}
                  </label>
                  <input
                    className="lg:min-h-[50px] lg:p-2 w-full border-2 border-[#404040] bg-transparent rounded-md focus:outline-none focus:border-4 focus:indent-2 cursor-pointer"
                    id={eachInput.inputId}
                    type={eachInput.inputType}
                    name={eachInput.inputName}
                    onChange={onChangeHandle}
                  />
                </div>
              );
            })}
          </div>

          <div className="lg:w-full lg:mt-[-10px]">
            <Link
              to="/login"
              className="cursor-pointer font-poppins hover:font-semibold text-[#404040] font-medium"
            >
              Already have an account?
            </Link>
          </div>

          <div className="lg:w-full mt-2 flex justify-between flex-wrap gap-4">
            <button
              type="button"
              className="flex items-center lg:min-h-[50px] lg:min-w-[290px] border-2 border-[#404040] font-poppins rounded-md hover:bg-pink-gradient  font-bold hover:font-bold text-[#404040]"
            >
              <Link
                to="/login"
                className="w-[100%] h-[100%] flex items-center justify-center"
              >
                Login
              </Link>
            </button>
            <button
              type="submit"
              className="lg:min-h-[50px] lg:min-w-[290px] border-2 border-[#404040] font-poppins rounded-md hover:bg-pink-gradient  font-bold hover:font-bold text-[#404040]"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
