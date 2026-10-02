import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { getSingleBook, makepayment } from "../services/AllApi";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { BaseUrl } from "../services/BaseUrl";
import {loadStripe} from '@stripe/stripe-js';


const ViewSingleBook = () => {
  const [openModal, setOpenModal] = useState(false);
  //Returns an object of key/value-pairs of the dynamic params from the current URL that were matched by the routes. Child routes inherit all params from their parent routes.
  const { id } = useParams();
  console.log(id);
  const[data , setData]=useState({})
  useEffect(()=>{
    getData()
  },[])
  const getData =async()=>{
    try {
      let apiResponse = await getSingleBook(id)
      if(apiResponse.status==200){
         setData(apiResponse.data)
      }else{
        toast.error(apiResponse.response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onBuyClick= async()=>{
    try {
      const stripe = await loadStripe('pk_test_51T51q5BaAGKoo6QibhbJ08dMmShAWhSb7jaF3JnyVinuEHsl8nJl8gfdAkP5aMFNs5W6SGPYCzbicPTHro9Cs6dh00eNIHaYMq');
        let apiResponse = await makepayment(data._id)
        if(apiResponse.status==200){
          let session = apiResponse.data
          window.location.href = session.url
        }else{
          toast.error('payment failed')
          console.log(apiResponse)
        }

    } catch (error) {
      console.log(error)
      toast.error("something went wrong while doing payment")
    }
  }
  return (
    <>
      <Header />
      <>
        <div className="p-5">
          <div className="flex items-center  justify-evenly h-100 bg-gray-300">
            <div className="w-50 ">
              <img
                className=""
                src={data?.imgURL}
                alt=""
              />
            </div>
            <div>
              <h1 className="text-center text-4xl font-bold p-2">title :{data?.title}</h1>
              <div className="flex justify-center gap-10">
                <div>
                  <h1>Author : {data?.author}</h1>
                  <h1>Price : {data?.price}</h1>
                  <h1>Number of pages : {data?.noOfPages}</h1>
                  <h1>Language : {data?.language}</h1>
                </div>
                <div>
                  <h1>Publisher : {data?.publisher}</h1>
                  <h1>Discount Price : {data?.discountPrice}</h1>
                  <h1>ISBN : {data?.ISBN}</h1>
                  <h1>Category : {data?.category}</h1>
                </div>
              </div>
            </div>
            <div>
              <button onClick={() => setOpenModal(true)} className="p-3 bg-green-500 rounded-2xl ">
                More imagess
              </button>
              <div className="min-w-50 min-h-50">
                <h1 className="p-2">{data?.abstract}</h1>
              </div>
              <div className="flex justify-evenly gap-3">
                <button className="p-3 bg-blue-600  rounded-2xl">
                  Go back
                </button>
                <button onClick={onBuyClick} className="p-3 bg-blue-600  rounded-2xl">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Uploaded Images</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="flex justify-between">
              {
                data?.uploadedImages?.map((eachImage)=>(
                  <>
                  <img src={`${BaseUrl}/uploads/${eachImage}`} alt="" />
                  </>
                ))
              }
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
          
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ViewSingleBook;
