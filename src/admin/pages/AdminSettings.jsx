import React, { useEffect, useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import { toast } from "react-toastify";
import { getUserDetails, updateUser } from "../../services/AllApi";
import { BaseUrl } from "../../services/BaseUrl";

const AdminSettings = () => {
  useEffect(() => {
    getData();
  }, []);

  const [preview, setPreview] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQja8RnKdLkBHxggklfccmz1Ko2X7hpRy0H9A&s",
  );

  const onImageChange = (e) => {
    let file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setUserDetials({ ...userDetails, proPic: file });
  };
  const [userDetails, setUserDetials] = useState({
    userName: "",
    password: "",
    proPic: "",
  });
  const getData = async () => {
    try {
      let apiResponse = await getUserDetails();
      if (apiResponse.status == 200) {
        setUserDetials(apiResponse.data);
        let prevdata = apiResponse.data.proPic
        if(prevdata.length>0){
             setPreview(`${BaseUrl}/uploads/${prevdata}`)
        }
        
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while getting data");
    }
  };
  const [existingPswd, setExistingPswd] = useState("");
  const [newPswd, setNewPswd] = useState("");

  const onSubmitClick = async() => {
    try {
      if (existingPswd == userDetails.password) {
        //proceed
        //setUserDetials({...userDetails,password:newPswd})

        delete userDetails.password;
        let reqBody = new FormData();
        for (const key in userDetails) {
          reqBody.append(key, userDetails[key]);
        }
        reqBody.append("password", newPswd);
       let apiResponse = await updateUser(userDetails._id,reqBody)
        if(apiResponse.status==200){
            toast.success("updated")
        }else{
            toast.error('error occured')
        }
      } else {
        toast.error("password mismatch");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <AdminHeader />

        <div className="grid grid-cols-[1fr_3fr]">
          <AdminSideBar />

          <div className="flex justify-center">
            <div className="  bg-black w-130 h-130 rounded-2xl my-5 ">
              <div className="flex justify-center my-8">
                <label htmlFor="profPic">
                  <img className="w-40 rounded-full" src={preview} alt="" />
                  <input
                    onChange={(e) => onImageChange(e)}
                    type="file"
                    id="profPic"
                    hidden
                  />
                </label>
              </div>
              <div className="flex justify-center flex-col items-center my-5">
                <input
                  onChange={(e) =>
                    setUserDetials({ ...userDetails, userName: e.target.value })
                  }
                  value={userDetails?.userName}
                  className="bg-white w-90 py-3 ps-3 rounded-xl"
                  placeholder="User Name"
                  type="text"
                />
                <input
                  onChange={(e) => setExistingPswd(e.target.value)}
                  className="bg-white w-90 py-3 ps-3 rounded-xl mt-5"
                  placeholder="Existing Password"
                  type="password"
                />
                <input
                  onChange={(e) => setNewPswd(e.target.value)}
                  className="bg-white w-90 py-3 ps-3 rounded-xl mt-5"
                  placeholder="New Password"
                  type="password"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={onSubmitClick}
                  className="bg-red-600 p-2 rounded-xl"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
