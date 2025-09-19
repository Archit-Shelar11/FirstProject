/* eslint-disable no-undef */
import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice"; // adjust path

import { ClipLoader } from 'react-spinners'
import { useDispatch } from "react-redux";



function SignUp() {
  const dispatch = useDispatch();
  const [role, setRole] = useState("student");
  const [dis, setdis] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const data = { name, email, password, role };
      const result = await axios.post(serverUrl + "/api/auth/signup", data, { withCredentials: true });
      
      dispatch(setUserData(result.data))
      navigate("/");
      setLoading(false);
      toast.success("Signup Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form className="w-[90%] md:w-[800px] h-[500px] bg-white shadow-xl rounded-2xl flex" onSubmit={(e) => e.preventDefault()}>
        {/* left */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl">Let’s Get Started</h2>
          <h1 className="text-xl text-gray-400">Create Your Account</h1>

          <div className="w-[80%] flex flex-col gap-2 px-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="border p-2 rounded-md w-full text-[15px]"
              onChange={(e) => setName(e.target.value)} value={name}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="border p-2 rounded-md w-full text-[15px]"
              onChange={(e) => setEmail(e.target.value)} value={email}
            />

            <div className="relative">
              <label htmlFor="password">Password</label>
              <input
                type={dis ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="border p-2 rounded-md w-full text-[15px]"
                onChange={(e) => setPassword(e.target.value)} value={password}
              />

              {dis ? (
                <PiEyeLight className="absolute top-[55%] right-[10%]" onClick={() => setdis(prev => !prev)} />
              ) : (
                <PiEyeSlash className="absolute top-[55%] right-[10%]" onClick={() => setdis(prev => !prev)} />
              )}
            </div>
          </div>

          {/* Role selector */}
          <div className="flex md:w-[50%] w-[70%] items-center justify-between">
            <span
              className={`px-[10px] py-[5px] border-[1px] rounded-2xl cursor-pointer ${role === "student" ? "border-black" : "border-[#646464]"}`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-[10px] py-[2px] border-[1px] rounded-2xl cursor-pointer ${role === "educator" ? "border-black" : "border-[#646464]"}`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>

          <button className="w-[80%] h-[30px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" disabled={loading} onClick={handleSignup}>
            {loading ? <ClipLoader color="white" size={20} /> : "Signup"}
          </button>

          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center ">
              Or continue with
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>

          <div className="w-[100%] flex item-center justify-center ">
            <button className="w-[80%] h-[20px] bg-green-200 text-black cursor-pointer flex items-center justify-center rounded-[5px]">Google</button>
          </div>

          <div className="w-[100%] flex item-center justify-center ">
            <div className="text-amber-900">Already have an account?</div>
            <span className="text-blue-600 hover:cursor-pointer" onClick={() => navigate("/login")}>Click here </span>
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

export default SignUp;
