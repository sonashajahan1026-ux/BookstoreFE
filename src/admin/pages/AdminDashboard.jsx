import React, { useEffect, useState } from "react";
import AdminHeader from '../components/AdminHeader'
import AdminSideBar from '../components/AdminSideBar'
import { toast } from "react-toastify";
import { getAllBooks } from "../../services/AllApi";
import { getAllUsers } from "../../services/AllApi";
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  
    const [data, setData] = useState([]);
    useEffect(() => {
      getData();
      getUser()
    }, []);
  
    const getData = async () => {
      try {
        let apiResponse = await getAllBooks("");
        if (apiResponse.status == 200) {
          setData(apiResponse.data);
        } else {
          toast.error(apiResponse.response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    const getUser = async () => {
      try {
        let apiResponse = await getAllUsers();
        console.log(apiResponse)
        if (apiResponse.status == 200) {
          setUsers(apiResponse.data);
        } else {
          toast.error(apiResponse.response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
  return (
    <>
     <AdminHeader/>
     <div className='grid grid-cols-[1fr_3fr]'>
        <AdminSideBar/>
       <div >
        <div className="grid grid-cols-3 gap-4 mt-3 ms-3 me-2 ">
           <div className="bg-blue-300 p-20 text-center">
            <h1 className="font-bold">total user count: {users?.length}</h1>
           </div>
           <div className="bg-blue-300 p-20 text-center">
            <h1 className="font-bold">total Book count: {data?.length}</h1>
           </div>
           <div className="bg-blue-300 p-20 text-center">
            <h1 className="font-bold">total job listed</h1>
           </div>
           
        </div>
       </div>
     </div>

    </>
  )
}

export default AdminDashboard