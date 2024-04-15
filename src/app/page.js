"use client"
import Image from "next/image";
import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Home() {

  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()


  const SucessMessage = (message) => {
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

  const ErrorMessage = (message) => {
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




  const handleSubmit = () => {

    if (username == "") {
      return ErrorMessage("Please fill Username")
    }

    if (email == "") {
      return ErrorMessage("Please fill Email")
    }

    if (password == "") {
      return ErrorMessage("Please fill Password")
    }

    const obj = {
      username: username,
      email: email,
      password: password
    }

    axios.post("http://localhost:3003/api/register", obj)
      .then((res) => {
        // console.log("done")
        if (res.data.ResponseID > 0) {
          SucessMessage(res.data.ResponseMessage)
          router.push("/login")
        } else {
          ErrorMessage(res.data.ResponseMessage)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
      <h1 className="text-red-400 text-center text-2xl font-bold">Register</h1>
      <ToastContainer />
      <div className='m-auto w-60 mt-3'>
        <label>Username<span className="text-red-400">*</span></label><br />
        <input type="text" value={username} className="p-2 rounded-md" onChange={(e) => setUserName(e.target.value)} placeholder="Enter Username"/>
        <label>Email<span className="text-red-400">*</span></label><br />
        <input type="email" value={email} className="p-2 rounded-md" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"/>
        <label>Password<span className="text-red-400">*</span></label><br />
        <input type="password" value={password} className="p-2 rounded-md" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"/>
        <Link href={"/login"} className="text-red-400 text-xs mt-3 mb-2" >Already a User? Please Login</Link>
        <button type="submit" onClick={handleSubmit} className='mt-2 bg-slate-400 w-20 m-auto px-1 py-2 rounded-xl text-white'>Submit</button>
        {/* </main> */}
      </div>
    </>
  );
}
