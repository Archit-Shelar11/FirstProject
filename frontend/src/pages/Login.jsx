import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners'
import axios from "axios";
import { setUserData } from '../redux/userSlice'
import { toast } from "react-toastify";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
function Login() {
  const dispatch=useDispatch()
  const [dis,setdis]=useState(false)
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin=async () => {
    try {
      setLoading(true);
      const data = { email, password }
      console.log(data)
      const result = await axios.post(serverUrl + "/api/auth/login", data, { withCredentials: true });
      dispatch(setUserData(result.data))
      console.log(result);
      navigate("/");
      setLoading(false);
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  }
  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form className="w-[90%] md:w-[800px] h-[500px] bg-white shadow-xl rounded-2xl flex" onSubmit={(e) => e.preventDefault()}>
        {/* left */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl">Let’s Get Started</h2>
          <h1 className="text-xl text-gray-400">Create Your Account</h1>

          <div className="w-[80%] flex flex-col gap-2 px-2">
            

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="border p-2 rounded-md w-full text-[15px]" onChange={(e) => setEmail(e.target.value)} value={email}
            />
            <div className="relative">
            <label htmlFor="password">Password</label>
            <input
              type={dis ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border p-2 rounded-md w-full text-[15px]" onChange={(e) => setPassword(e.target.value)} value={password}
            />

            {dis ?
            <PiEyeLight className="absolute  top-[55%] right-[10%]" onClick={()=>setdis(prev=>!prev)}/>:
            <PiEyeSlash className="absolute  top-[55%] right-[10%]"onClick={()=>setdis(prev=>!prev)}/>
            }  

            </div>
          </div>


          <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" onClick={handleLogin} disabled={loading}>
            {loading?<ClipLoader color="white" size={20} />:"Login"}
          </button>
          <div className="w-[80%] text-[15px] text-[#6f6f6f] flex items-center justify-center ">
            Forgot password
          </div>
          <div className="w-[80%] flex items-center  gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center ">
              Or continue with
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div className="w-[100%] flex item-center justify-center ">
            <button className="w-[80%] h-[40px] bg-green-200 text-black cursor-pointer flex items-center justify-center rounded-[5px]">Google</button>
          </div>
          <div className="w-[100%] flex item-center justify-center ">
            <div className="text-amber-900"></div>
            <div className="text-amber-900">ont have a account</div>
            <span className="text-blue-600 hover:cursor-pointer" onClick={()=>navigate("/signup")}>Click here </span>
          </div>
        
        </div>

        {/* right */}
        <div className="w-[50%] h-full rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden">
          <img src={logo} className="w-32 shadow-2xl" alt="Logo" />
          <span className="text-white text-2xl mt-4">VIRTUAL COURSES</span>
        </div>
      </form>
    </div>
  );
}

export default Login
