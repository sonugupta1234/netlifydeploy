"use client"
import Image from "next/image";
import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login= () => {

  const [email,setEmail]= useState("")
  const [password,setPassword]=useState("")
  const router=useRouter()

  const SucessMessage=(message)=>{
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  }

  const ErrorMessage=(message)=>{
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  }


  const handleSubmit=()=>{

    if(email==""){
      return ErrorMessage("Please fill Email")
    }

    if(password==""){
      return ErrorMessage("Please fill Password")
    }

    const obj={
      email: email,
      password: password
    }

    axios.post("http://localhost:3003/api/login",obj)
    .then((res)=>{
      // console.log("done")
      const data=res.data.ResponseData
      if(res.data.ResponseID > 0){
      localStorage.setItem("Token",data.Token)
      localStorage.setItem("LoginUserId",data.loginuserid)
      SucessMessage(res.data.ResponseMessage)
      router.push("/task")
    }else{
      ErrorMessage(res.data.ResponseMessage)
    }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
    <h1 className="text-red-400 text-center  text-2xl font-bold">Login</h1>

    
       <ToastContainer />
       <div className='m-auto w-60 mt-3'>
        <label >Email<span className="text-red-400">*</span></label><br/>
        <input type="email" value={email} className="p-2 rounded-md" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/><br/>
        <label className="mt-3">Password<span className="text-red-400">*</span></label><br/>
        <input type="password" value={password} className="p-2 rounded-md" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/><br/>
        <button type="submit" onClick={handleSubmit} className='mt-2 bg-slate-400 w-20 m-auto px-1 py-2 rounded-xl text-white'>Submit</button>
    </div>
    </>
  )
}

export default Login