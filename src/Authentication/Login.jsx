import { SigninAdmin } from "../Features/Admin_Features/adminSlice";
import { loginFormDetails } from "./Constants";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { SigninSchool } from "../Features/School_Features/SchoolSlice";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({});
  const [role,setRole] = useState();

  const dispatch = useDispatch();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    if (name === "email"){
      checkRole(value)
    }
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    console.log(role)
    if (role !== ""){
      if (role != "school" ) {
        dispatch(SigninAdmin(formDetails)).unwrap().then((res)=>{
          if (res) {
            navigate("/sysadmin/dashboard")
          }
        });
      } else {
        dispatch(SigninSchool(formDetails)).unwrap().then((res)=>{
          if (res) {
            navigate("/schooladmin")
          }
        });
      }
    }
  };

  const checkRole = (value) => {
    let parseEmail = value.split("@")
    let parseRole = parseEmail[1].split(".");
    
    if (parseRole.includes("school")){
      setRole("school")
    } else {
      setRole("admin")
    }
  }


  return (
    <div className="min-h-screen bg-pink-gradient pt-10 lg:pt-[100px] px-4">
  <div className="flex flex-col gap-6 w-full max-w-[500px] mx-auto min-h-[450px] border-4 border-white rounded-md bg-white bg-opacity-[30.5%] p-6">
    
    <div className="w-full flex flex-col mt-6 text-center lg:text-left">
      <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-[#404040]">
        System Administration
      </h2>
      <h2 className="text-xl lg:text-2xl font-poppins font-bold text-[#404040] mt-4">
        Log In
      </h2>
    </div>

    <form
      onSubmit={(e) => onSubmitHandle(e)}
      className="w-full flex flex-col items-center justify-center gap-6 min-h-[250px]"
    >
      {loginFormDetails.map((eachInput, index) => (
        <div key={index} className="w-full flex flex-col gap-2">
          <label
            htmlFor={eachInput.inputId}
            className="font-poppins text-[#404040] font-semibold"
          >
            {eachInput.inputLabel}
          </label>
          <input
            className="min-h-[45px] p-2 w-full border-2 border-[#404040] bg-transparent rounded-md focus:outline-none focus:border-4 focus:indent-2"
            id={eachInput.inputId}
            type={eachInput.inputType}
            name={eachInput.inputName}
            onChange={onChangeHandle}
            required
          />
        </div>
      ))}
      <div className="w-full -mt-2 text-left">
        <a className="cursor-pointer font-poppins hover:font-semibold text-[#404040] font-medium">
          Forgot your Password?
        </a>
      </div>
      <div className="w-full mt-3 flex flex-col sm:flex-row justify-between gap-3">
        <button
          type="button"
          className="flex items-center min-h-[45px] w-full sm:w-[48%] border-2 border-[#404040] font-poppins rounded-md hover:btn-gradient-hover-bg hover:text-[#404040] font-bold text-[#404040]"
        >
          <Link to="/signup" className="w-full h-full flex items-center justify-center">
            Signup
          </Link>
        </button>
        <button
          type="submit"
          className="min-h-[45px] w-full sm:w-[48%] border-2 border-[#404040] font-poppins rounded-md hover:btn-gradient-hover-bg hover:text-[#404040] font-bold text-[#404040]"
        >
          Next
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
