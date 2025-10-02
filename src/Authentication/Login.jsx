import { SigninAdmin } from "../Features/Admin_Features/adminSlice";
import { loginFormDetails } from "./Constants";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
export default function Login() {
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
    dispatch(SigninAdmin(formDetails));
  };
  return (
    <div className="min-h-screen bg-pink-gradient lg:pt-[100px]">
      <div className="flex flex-col lg:gap-[20px] lg:w-[40%] lg:mx-auto lg:min-h-[550px]  border-4 border-[white] rounded-md bg-white bg-opacity-[30.5%]">
        <div className="lg:mx-auto lg:w-[80%] flex-col  mt-[40px] ">
          <h2 className="text-3xl font-poppins font-bold text-[#404040] mx-auto text-center">
            System Administration
          </h2>
          <h2 className="text-2xl font-poppins font-bold text-[#404040] mt-[20px] text-start">
            Log In
          </h2>
        </div>
        <form
          onSubmit={(e) => onSubmitHandle(e)}
          className="mx-auto w-[80%] flex flex-col items-center justify-center gap-[30px] lg:min-h-[300px] rounded-md"
        >
          {loginFormDetails.map((eachInput,index) => {
            return (
              <div key={index} className="lg:w-full flex flex-col gap-4">
                <label
                  htmlFor={eachInput.inputId}
                  className="font-poppins text-[#404040] font-semibold"
                >
                  {eachInput.inputLabel}
                </label>
                <input
                  className="lg:min-h-[50px] lg:p-2 lg:w-full border-2 border-[#404040] bg-transparent rounded-md focus:outline-none focus:border-4 focus:indent-2 cursor-pointer"
                  id={eachInput.inputId}
                  type={eachInput.inputType}
                  name={eachInput.inputName}
                  onChange={onChangeHandle}
                />
              </div>
            );
          })}
          <div className="lg:w-full lg:mt-[-10px]">
            <a className="cursor-pointer font-poppins hover:font-semibold text-[#404040] font-medium">
              Forgot your Password?
            </a>
          </div>
          <div className="lg:w-full mt-2 flex justify-between flex-wrap">
            <button
              type="button"
              className="flex items-center lg:min-h-[50px] lg:min-w-[240px] border-2 border-[#404040] font-poppins rounded-md hover:btn-gradient-hover-bg  hover:text-[#404040] font-bold hover:font-bold text-[#404040]"
            >
              <Link to="/signup" className="w-[100%] h-[100%] flex items-center justify-center">Signup</Link>
            </button>
            <button
              type="submit"
              className="lg:min-h-[50px] lg:min-w-[240px] border-2 border-[#404040] font-poppins rounded-md hover:btn-gradient-hover-bg  hover:text-[#404040] font-bold hover:font-bold text-[#404040]"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
