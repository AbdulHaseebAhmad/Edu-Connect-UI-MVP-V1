
export default function Login() {
  return (
    <div className="min-h-screen bg-pink-gradient lg:pt-[100px]">
        <div className="flex flex-col lg:gap-[20px] lg:w-[40%] lg:mx-auto lg:min-h-[550px]  border-4 border-[white] rounded-md bg-white bg-opacity-[30.5%]" >
            <div className="lg:mx-auto lg:w-[80%] flex-col  mt-[40px] ">
                <h2 className="text-3xl font-poppins font-bold text-[#404040] mx-auto text-center">System Administration</h2>
                <h2 className="text-2xl font-poppins font-bold text-[#404040] mt-[20px] text-start">Log In</h2>
            </div>
            <form onSubmit={null} className="mx-auto w-[80%] flex flex-col items-center justify-center gap-[30px] lg:min-h-[300px] rounded-md">
                <div className="lg:w-full flex flex-col gap-4">
                    <label  htmlFor="email" className="font-poppins text-[#404040] font-semibold">Email</label>
                    <input id="email" className="lg:min-h-[50px] lg:w-full border-2 border-blue-300 bg-transparent rounded-md focus:outline-none focus:border-4 focus:indent-2 cursor-pointer" type="email"/>
                </div>
                <div className="lg:w-full flex flex-col gap-4">
                    <label htmlFor="password" className="font-poppins text-[#404040] font-semibold">Password</label>
                    <input id="password" className="lg:min-h-[50px] lg:w-full border-2 border-blue-300 bg-transparent rounded-md focus:outline-none focus:border-4 focus:indent-2 cursor-pointer" type="password" />
                </div>
                <div className="lg:w-full lg:mt-[-10px]">
                    <a className="cursor-pointer font-poppins hover:text-blue-400 text-[#404040] font-medium">Forgot your Password?</a>
                </div>
                <div className="lg:w-full mt-2 flex justify-between flex-wrap">
                    <button className="lg:min-h-[50px] lg:min-w-[240px] border-2 border-blue-300 font-poppins rounded-md hover:bg-pink-gradient hover:text-white font-semibold hover:font-bold text-blue-400">Login</button>
                    <button className="lg:min-h-[50px] lg:min-w-[240px] border-2 border-blue-300 font-poppins rounded-md hover:bg-pink-gradient hover:text-white font-semibold hover:font-bold text-blue-400">Signup</button>
                </div>
            </form>
        </div>
    </div>
  );
}
