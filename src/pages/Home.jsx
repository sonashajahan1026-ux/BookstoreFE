import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getLimitedBooks } from "../services/AllApi";
import { toast } from "react-toastify";


const Home = () => {
  const[data,setData]=useState([])
  useEffect(()=>{
    getData()
  },[])
  const getData=async()=>{
   try {
     let apiResponse=await getLimitedBooks()
      if(apiResponse.status==200){
        setData(apiResponse.data)
      }else{
        toast.error(apiResponse.response.data.message)
      }
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <>
      <Header />
      <div id="img">
        <div className="text-center p-35">
          <h1 className="text-5xl text-white font-serif ">WonderFull Gifts</h1>
          <p className=" text-white">Give your family and friends a book</p>
          <div className="text-center p-10">
            <input
              className="bg-white  rounded-full w-150 p-2 "
              type="text"
              placeholder="    Search Books"
            />
          </div>
        </div>
      </div>
      <div className="text-center p-20">
        <h1 className=" font-serif"> NEW ARRIVALS</h1>
        <h1 className="text-2xl font-serif">Explore Our Latest Collection</h1>
      </div>
       {
        data?.length > 0 && <div className="grid grid-cols-4  ms-25">
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
                  </div>
                </div>
              </div>
                  ))
                }
              </div>
       }
        
      
      <div className="text-center">
        <button className="bg-violet-950 rounded-3x1  text-white p-2 mb-20">
          {" "}
          Explore More
        </button>
      </div>
      <div className="flex justify-center gap-10 ms-50 me-50 mb-10">
        <div>
          <h1 className="font-serif text-center">FEATURED AUTHORS</h1>
          <h1 className="text-2xl font-serif text-center pb-10">
            Captivates with every word
          </h1>
          <p className="font-serif">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
            laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
            Modi, molestias. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Sunt earum possimus accusantium necessitatibus id neque soluta
            quibusdam explicabo laborum? Deserunt vel quia voluptates dicta
            incidunt illo fuga pariatur sequi error. <br />
            <br /> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Nesciunt fuga nostrum illum distinctio eum quidem recusandae soluta
            aliquam laboriosam odit quas, nam molestias fugiat culpa rem nulla
            iste? Modi, molestias. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Sunt earum possimus accusantium necessitatibus id
            neque soluta quibusdam explicabo laborum? Deserunt vel quia
            voluptates dicta incidunt illo fuga pariatur sequi error.
          </p>
        </div>
        <div>
          <img
            className="w-700  pt-15"
            src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="font-serif mb-20">
        <h1 className="text-center ">TESTIMONIALS</h1>
        <h1 className="text-center text-3xl pb-5 ">See What Others Are Saying</h1>
        <h1 className="text-center pb-10">Treesa Joseph</h1>
        <p className="ps-50 pe-50" >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
          perspiciatis porro eveniet. Optio necessitatibus provident autem, quam
          qui, dicta molestiae quis quia deleniti aliquam magnam temporibus
          mollitia ex repellendus! Dicta. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Consequuntur, deserunt optio eum dolorum iure
          consectetur quia facilis porro modi placeat ea quis explicabo maxime
          voluptatum unde animi nemo aperiam quos!
        </p>
      </div>
      
    </>
  );
};

export default Home;
