"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment"

const Task= () => {
  const loginuserid=localStorage.getItem("LoginUserId")
  const token=localStorage.getItem("Token")
  const [data,setData]=useState([])
  const [form,setForm]=useState({
    ProjectName: "",
    TaskName: "",
    TaskDescription: "",
    Spendtime: 0,
    Priority: "high",
    Assigned: "",
    Status: "assigned",
    Createdby: loginuserid,
    Updateby: loginuserid,
    Createdate: new Date(),
    Updatedate: new Date()
  })


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);
  console.log(totalPages);

  // Calculate index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
 

  

  const handleChange=(e)=>{
    const {name,value}=e.target
   setForm({...form,[name]: value})
  }

  // console.log(form,"form123==>")

  useEffect(()=>{
   axios.get(`http://localhost:3003/api/listtask?loginuserid=${loginuserid}`)
   .then((res)=>{
    setData(res.data.ResponseData)
   })
   .catch((err)=>{
    console.log(err)
   })
  },[])
  
  const handleSubmit= ()=>{
  console.log(form,"form456==>")

    axios.post("http://localhost:3003/api/task", form, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


      toast.success("Data Saved Sucessfully", {
        position: "top-right",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
      window.location.reload()
  }

  const handleChangeSearch=(e)=>{
    axios.get(`http://localhost:3003/api/searchprojecttext?loginuserid=${loginuserid}&projectname=${e.target.value}`)
   .then((res)=>{
    setData(res.data.ResponseData)
   })
   .catch((err)=>{
    console.log(err)
   })
  }
  return (
    <>
    <h1 className='text-center text-red-400 text-2xl font-bold'>Task Management</h1>
    <ToastContainer/>
    <div className='m-auto w-60 mt-3'>
    <label>Project Name</label><br/>
    <input type="text" name="ProjectName" className="p-2 rounded-md" onChange={(e)=>handleChange(e)}  placeholder='Enter ProjectName'/><br/>
    <label>Task Name</label><br/>
    <input type="text" name="TaskName" className="p-2 rounded-md" onChange={(e)=>handleChange(e)}  placeholder='Enter TaskName'/><br/>
    <label>Task Description</label><br/>
    <input type="text" name="TaskDescription" className="p-2 rounded-md" onChange={(e)=>handleChange(e)}  placeholder='Enter TaskDescription'/><br/>
    <label>Spend Time(in hrs)</label><br/>
    <input type="number" name="Spendtime" className="p-2 rounded-md" onChange={(e)=>handleChange(e)}  placeholder='Enter Spendtime'/><br/>
    <label>Priority</label><br/>
    <select  name="Priority" className="p-2 rounded-md" onChange={(e)=>handleChange(e)}  placeholder='Enter Priority'>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
    </select><br/>
    <label>Assigned</label><br/>
    <input type="text" name="Assigned" className="p-2 rounded-md" onChange={(e)=>handleChange(e)}  placeholder='Enter Assigned'/><br/>
    <label>Status</label><br/>
    <select  name="Status" className="p-2 rounded-md" onChange={(e)=>handleChange(e)}  placeholder='Enter Status'>
        <option value="assigned">Assigned</option>
        <option value="pending">Pending</option>
    </select><br/>
    <button type="submit" onClick={handleSubmit} className='mt-2 bg-slate-400 w-20 m-auto px-1 py-2 rounded-xl text-white'>Submit</button>
    </div>
    
    <div className='justify-end flex  w-50 p-2 rounded-md'>
      <input type="text" className=' p-2 rounded-md' placeholder='Search by Project Name' onChange={(e)=>handleChangeSearch(e)}/>
    </div>
    <div className='mt-3'>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned</th>
            <th>Spend Time(in hrs)</th>
            <th>Created Date</th>
            <th>Updated Date</th>

          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item,index)=>{
            return (
              <tr>
                <td>{item.projectname}</td>
                <td>{item.taskname}</td>
                <td>{item.taskdescription}</td>
                <td>{item.status}</td>
                <td>{item.priority}</td>
                <td>{item.assigned}</td>
                <td>{item.spendtime}</td>
                <td>{moment(item.createddate).format("DD-MM-YYYY")}</td>
                <td>{moment(item.updatedate).format("DD-MM-YYYY")}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage===1 ? "bg-slate-300 border border-black px-3 py-1": "border border-black px-3 py-1"}
        >
          Prev
        </button>
        <p className="border border-black p-2 mx-1">{currentPage}</p>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={indexOfLastItem >= data.length ? "bg-slate-300 border border-black px-3 py-1  mx-1": "border border-black px-3 py-1  mx-1"}
          disabled={indexOfLastItem >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  </>
  )
}

export default Task