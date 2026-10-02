
import { useContext } from "react";
import axiosConfig from "./AxiosConfig";
import { BaseUrl } from "./BaseUrl";
import { AuthContext } from "../context/AuthContext";

const appendToken=()=>{
  //const {token}=useContext(AuthContext)
  let token = localStorage.getItem('token')
  let  header ={
    Authorization : `Bearer ${token}`
  }
  return header
}

const appendTokenWithMult= ()=>{
  //const {token}=useContext(AuthContext)
  let token = localStorage.getItem('token')
  let  header ={
    Authorization : `Bearer ${token}`,
    "content-Type" :"multipart/form-data"
  }
  return header
}

export const registerUser = async (reqBody) => {
  return await axiosConfig("post", `${BaseUrl}/registerUser`, reqBody);
};
export const loginUser = async (reqBody) => {
  return await axiosConfig("post", `${BaseUrl}/loginUser`, reqBody);
};
export const googleLogin = async (reqBody) => {
  return await axiosConfig("post", `${BaseUrl}/googleLogin`, reqBody);
};
export const addBook = async(reqBody)=>{
  return await axiosConfig("post", `${BaseUrl}/addBook`, reqBody,appendTokenWithMult());
}
export const getLimitedBooks = async()=>{
  return await axiosConfig("get", `${BaseUrl}/getLimitedBooks`);
}
export const getAllBooks =async(searchkey)=>{
  return await axiosConfig("get", `${BaseUrl}/getAllBooks/?searchkey=${searchkey}`, "",appendToken());
}
export const getSingleBook = async(id)=>{
  return await axiosConfig("get", `${BaseUrl}/${id}/getSingleBook`, "",appendToken());
}

export const getUserDetails= async()=>{
   return await axiosConfig("get", `${BaseUrl}/getUserDetails`, "",appendToken());
}

export const updateUser= async(id,reqBody)=>{
  return await axiosConfig("put", `${BaseUrl}/${id}/updateUser`, reqBody,appendTokenWithMult());
}
export const  getAllUsers=async()=>{
  return await axiosConfig("get", `${BaseUrl}/getAllUsers`, "",appendToken())
}
export const makepayment=async(id)=>{
  return await axiosConfig("patch",`${BaseUrl}/${id}/makepayment`,"",appendToken())
}
export const getbookStatus = async () => {
  return await axiosConfig("get", `${BaseUrl}/bookStatus`, "", appendToken());
};
export const getPurchaseHistory = async () => {
  return await axiosConfig(
    "get",
    `${BaseUrl}/purchaseStatus`,
    "",
    appendToken(),
  );
};