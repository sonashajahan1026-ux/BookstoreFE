import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleLogin, loginUser, registerUser } from "../services/AllApi";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";




const Auth = ({ isFromRegister }) => {

  const {token,saveToken}=useContext(AuthContext)
  //Returns a function that lets you navigate programmatically in the browser in response to user interactions or effects.
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const onRegisterClick = async () => {
    try {
      if (
        userData.userName == "" ||
        userData.password == "" ||
        userData.email == ""
      ) {
        alert("please fill the form");
      } else {
        let apiResponse = await registerUser(userData);
        if (apiResponse.status == 201) {
          toast.success('successfully registered')
          navigate('/login')
        } else {
          toast.error(apiResponse.response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLoginClick = async () => {
    try {
      if (userData.email == "" || userData.password == "") {
        alert("please fill the form");
      } else {
        let apiResponse = await loginUser(userData);
        console.log(apiResponse);
        if (apiResponse.status == 200) {
          let token = apiResponse.data.token;
          //localStorage.setItem("token", token);
          saveToken(token)
         toast.success('successfully LoggedIn')
           if(apiResponse.data.isAdmin==true){
                navigate('/admin')
           }else{
             navigate('/')
           }

         
        } else {
          toast.error(apiResponse.response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const decodeToken = async(googleToken)=>{
    console.log(googleToken)
    const decoded = jwtDecode(googleToken);
    console.log(decoded)
    let userName = decoded.userName
    let email=decoded.email
    let proPic=decoded.picture

    let payload = {userName,email,proPic}
    let apiResponse= await googleLogin(payload)

    if(apiResponse.status==200){
      let token=apiResponse.data.token
      //localStorage.setItem('token',token)
      saveToken(token)
        toast.success('successfully LoggedIn')
        navigate('/')
    }else{
      toast.error(apiResponse.response.data.message)
    }
  }
  return (
    <>
      <div>
        <div
          id="homeLog"
          className="flex justify-center items-center flex-col text-center"
        >
          <h2 className="text-3xl font-semibold mb-5">BOOK STORE</h2>
          <div id="logBox" className=" bg-gray-800 text-center py-10">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-7xl text-white"
            />
            {isFromRegister ? (
              <h2 className="text-3xl font-semibold py-5 text-white">
                Register
              </h2>
            ) : (
              <h2 className="text-3xl font-semibold py-5 text-white">Login</h2>
            )}
            {isFromRegister && (
              <input
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
                className="w-100 p-3  bg-white "
                type="text"
                placeholder="User Name"
              />
            )}

            <div>
              <input
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-100 p-3 mt-5 bg-white "
                type="text"
                placeholder="Email ID"
              />
              <input
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-100 p-3 bg-white mt-5 mb-2 "
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-between  text-xs mb-7">
              <div className="text-amber-400 pl-25">
                *Never share your password with orthers
              </div>
              <div className="text-white pr-25 underline">Forget Pasword</div>
            </div>
            <div>
              {isFromRegister ? (
                <button
                  onClick={onRegisterClick}
                  className="bg-green-600 px-43 py-3 text-white font-semibold "
                >
                  Register
                </button>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="bg-green-600 px-45 py-3 text-white font-semibold "
                >
                  Login
                </button>
              )}
              <p className="mt-5 mb-20 text-white font-semibold">
                -------------------- or ------------------
              </p>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  decodeToken(credentialResponse.credential)
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              ;
            </div>

            {isFromRegister ? (
              <Link to={"/login"} className="text-white mt-3 ">
                {" "}
                Are You a existing user ? Login
              </Link>
            ) : (
              <Link to={"/register"} className="text-white mt-3 ">
                Are You a New User ? Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
