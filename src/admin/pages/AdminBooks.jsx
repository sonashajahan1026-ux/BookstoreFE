import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { toast } from "react-toastify";
import { getAllBooks } from "../../services/AllApi";
import { getAllUsers } from "../../services/AllApi";

const AdminBooks = () => {
  const [showBooks, setShowBooks] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
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
      <AdminHeader />
      <div className="grid grid-cols-[1fr_3fr]">
        <AdminSideBar />
        <div>
          <div className="flex justify-center gap-20 mt-20">
            <button
              onClick={() => {
                setShowBooks(true);
                setShowUsers(false);
              }}
              className="bg-blue-950 text-white rounded p-2"
            >
              books
            </button>
            <button
              onClick={() => {
                setShowBooks(false);
                setShowUsers(true);
              }}
              className="bg-blue-950 text-white rounded p-2"
            >
              users
            </button>
          </div>
          {showBooks && (
            <div>
              {data?.length > 0 && (
                <div className="grid grid-cols-3">
                  {data?.map((eachBook) => (
                    <div className="p-2">
                      <div className="cardholder p-5">
                        <div className="card p-3">
                          <div className="imgContainer">
                            <img
                              className="cardImage rounded-xl"
                              src={`http://localhost:3000${eachBook.imgURL}`}
                              alt="bookImg"
                            />
                          </div>

                          <div className="text-center">
                            <h1 className="font-bold p-2">{eachBook.title}</h1>
                            <div className="cardTextConatiner max-h-20 w-70 text-center p-2">
                              <h1 className="">{eachBook.abstract}</h1>
                            </div>
                            <h1>
                              <span className="font-bold">&#8377; </span>
                              {eachBook.price}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {showUsers && <div>
            {users?.length>0 && (
              <div className="grid grid-cols-3 gap-4 mt-3 ">
                {users?.map((eachUsers)=>(
                  <div className="bg-red-50 text-center">
                    <h1 className="font-bold text-2xl">{eachUsers.userName}</h1>
                    <h1 className=" text-2xl">{eachUsers.email}</h1>
                    <h1 className=" text-2xl">{eachUsers.bio}</h1>

                  </div>
                ))}
              </div>
            )}
            </div>}
        </div>
      </div>
    </>
  );
};

export default AdminBooks;
