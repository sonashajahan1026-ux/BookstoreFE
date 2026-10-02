import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { getAllBooks } from "../services/AllApi";
import { toast } from "react-toastify";

const Book = () => {

 
const [data,setData]=useState([])
  const [token, setToken] = useState(null);
  const [searchkey,setSearchkey]=useState('')
  const [allCategory,setAllCategory]=useState([])
  const [copyData,setCopyData]=useState([])
  
  useEffect(() => {
    let tkn = localStorage.getItem("token");
    if (tkn) {
      setToken(tkn);
      getData()
    }
  },[searchkey]);

  const getData=async()=>{
    try {
      let apiResponse =await getAllBooks(searchkey)

      if(apiResponse.status==200){
        setData(apiResponse.data)
        setCopyData(apiResponse.data)
        let categoryArray = apiResponse.data.map((eachBook)=>eachBook.category)
        //console.log(categoryArray)
         let dummyCat=[]

        categoryArray.forEach((eachCategory)=>{
          if(!dummyCat.includes(eachCategory)){
           dummyCat.push(eachCategory)
          }
        })
        setAllCategory(dummyCat)
      }else{
        toast.error(apiResponse.response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const filterAccCat=(cat)=>{
     
    setData(copyData.filter((eachBook)=>eachBook.category==cat))
  }
  return (
    <>
      <Header />
      {token ? (
        <>
          <div className="text-center p-5 ">
            <h1 className="text-3xl">Collections</h1>
            <div className="p-2 flex gap-0 justify-center">
              <input onChange={(e)=>setSearchkey(e.target.value)}
                className="p-2  border w-80 rounded-s-2xl"
                type="text"
                placeholder="search"
              />
              <button className="bg-blue-900  text-white rounded-e-2xl  hover:bg-blue-700  hover:text-white cursor-pointer  p-2.5">
                Search
              </button>
            </div>
          </div>

          <div className="p-5">
            <div className="grid md:grid-cols-[1fr_4fr] p-5">
              <div className="p-2 ">
                <div>
                  <h1 className="text-2xl p-1">Filters</h1>
                </div>
                <div>
                 {
                  allCategory?.length>0 && <div>
                    <div>
                    <input onClick={getData} name="cat" id="all" type="radio" />
                    <label  className="text-1xl" htmlFor="all">
                     All
                    </label>
                  </div>
                    {
                      allCategory?.map((eachCat,index)=>(
                        <div>
                    <input onClick={()=>filterAccCat(eachCat)} name="cat" id={index} type="radio" />
                    <label  className="text-1xl" htmlFor={index}>
                     {eachCat}
                    </label>
                  </div>
                      ))
                    }

                  </div>
                 }
                </div>
              </div>
             {
              data?.length>0&& <div className="grid grid-cols-3">
                {
                  data?.map((eachBook)=>(
                     <div className="p-2">
                <div className="cardholder p-5">
                  <div className="card p-3">
                    <div className="imgContainer">
                      <img
                        className="cardImage rounded-xl"
                        src={eachBook.imgURL}
                        alt="bookImg"
                      />
                    </div>

                    <div className="text-center">
                      <h1 className="font-bold p-2">{eachBook.title}</h1>
                      <div className="cardTextConatiner max-h-20 w-70 text-center p-2">
                        <h1 className="">{eachBook.abstract}</h1>
                      </div>
                      <h1>
                        <span className="font-bold">&#8377; </span>{eachBook.price}
                      </h1>
                    </div>
                    <Link to={`${eachBook._id}/viewBook` }>View Book</Link>
                  </div>
                </div>
              </div>
                  ))
                }
              </div>
             }
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-center text-red-600 text-3xl">
            {" "}
            All books can only be accessed for logged in users
          </h1>
          <h2 className="text-center">
            {" "}
            <Link className="text-blue-600 " to={"/login"}>
              click here to login
            </Link>
          </h2>
          <div className="flex justify-center">
           <img className="w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwcBGZjMaRlp8ucEPZpjsQF5lb1zMOUZWCIw&s" alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default Book;