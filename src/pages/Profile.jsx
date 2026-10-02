import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Header from "../components/Header";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { addBook, getbookStatus, getPurchaseHistory, getUserDetails, updateUser } from "../services/AllApi";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { BaseUrl } from "../services/BaseUrl";

const Profile = () => {
  const [showSellbook, setShowSellBook] = useState(true);
  const [showBookStatus, setShowBookStatus] = useState(false);
  const [showPurchace, setShowPurchace] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bikI-KUuM1IWosgqDRS5jyv2U_PPYlG6Tg&s",
  );

  const [previewList, setPreviewList] = useState([]);
  const [proPicPreview, setProPicPreview] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxuzH5Hgd0QWlCZUggYViJngzCgu6AXtOloQ&s",
  );
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    noOfPages: "0",
    imgURL: "",
    price: "0",
    discountPrice: "0",
    abstract: "",
    publisher: "",
    language: "",
    ISBN: "",
    category: "",
    uploadedImages: [],
  });

  const [currentPswd, setCurrentPswd] = useState("");
  const [currentPswdInput, setCurrentPswdInput] = useState("");

  const [userDetails, setUserDetails] = useState({});
  const [viewbook, setViewBook] = useState([]);
  const [purchaseBook, setPurchaseBook] = useState([]);

  useEffect(() => {
    getUserData();
    onSellerBooks()
    onPurchaseClick()
  }, []);

 const onSellerBooks = async () => {
    try {
      let apiRespone = await getbookStatus();
      if (apiRespone.status == 200) {
        setViewBook(apiRespone.data);
      } else {
        toast.error(apiRespone.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wromg");
    }
  };

   const onPurchaseClick = async () => {
    try {
      let apiRespone = await getPurchaseHistory();
      if (apiRespone.status == 200) {
        setPurchaseBook(apiRespone.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
  };


  const getUserData = async () => {
    try {
      let apiResponse = await getUserDetails();
      if (apiResponse.status == 200) {
        setUserDetails(apiResponse.data);
        setCurrentPswd(apiResponse.data.password)
      } else {
        toast(apiResponse.response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const onEditClick = async () => {
    try {
      if (currentPswd == currentPswdInput) {
       let reqBody = new FormData()

       for(const key in userDetails){
        reqBody.append(key,userDetails[key])
       }

       let apiResponse = await updateUser(userDetails._id,reqBody)

       if(apiResponse.status==200){
        toast.success("updated")
       }else{
        toast.error(apiResponse.response.data.message)
       }
      } else {
        toast.error("password mismatch");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const onImageChange = (e) => {
    console.log();
    setBookData({
      ...bookData,
      uploadedImages: [...bookData.uploadedImages, e.target.files[0]],
    });

    let urlPath = URL.createObjectURL(e.target.files[0]);
    console.log(urlPath);
    setPreview(urlPath);
    setPreviewList([...previewList, urlPath]);
  };

  const onSubmitClick = async () => {
    try {
      let reqBody = new FormData();
      for (let key in bookData) {
        if (key != "uploadedImages") {
          reqBody.append(key, bookData[key]);
        } else {
          bookData.uploadedImages.forEach((eachImage) => {
            reqBody.append("uploadedImages", eachImage);
          });
        }
      }

      let apiResponse = await addBook(reqBody);
      if (apiResponse.status == 201) {
        toast.success("successfully added");
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onProPicChange = (e) => {
    let urlPath = URL.createObjectURL(e.target.files[0]);
    setProPicPreview(urlPath);
    setUserDetails({...userDetails,proPic:e.target.files[0]})
  };
  return (
    <section>
      <Header />
      <div className="profilePicholder bg-gray-900 h-50"></div>
      <div className="profilePic rounded-full bg-white">
        <img
          className="rounded-full w-52"
          src={`${BaseUrl}/uploads/${userDetails.proPic}`}
          alt=""
        />
      </div>
      <div className="">
        <div className="pt-30 flex justify-between ps-35 pe-15 pb-5">
          <h1 className="text-4xl">{userDetails?.userName}</h1>
          <button
            onClick={() => setOpenModal(true)}
            className="text-blue-600 p-3 border rounded-2xl cursor-pointer"
          >
            <FontAwesomeIcon icon={faPenToSquare} /> Edit
          </button>
        </div>
        <div className="text-justify ps-31 pe-15 pb-3">
          <p>{userDetails?.bio}</p>
        </div>
      </div>
      <div>
        <div className="text-center p-5 ">
          <button
            onClick={() => {
              setShowSellBook(true);
              setShowBookStatus(false);
              setShowPurchace(false);
            }}
            className="p-3 ms-2 text-blue-600 border cursor-pointer"
          >
            Sell Book
          </button>
          <button
            onClick={() => {
              setShowSellBook(false);
              setShowBookStatus(true);
              setShowPurchace(false);
            }}
            className="p-3 ms-2 text-blue-600 border cursor-pointer"
          >
            Book Status
          </button>
          <button
            onClick={() => {
              setShowSellBook(false);
              setShowBookStatus(false);
              setShowPurchace(true);
            }}
            className="p-3 ms-2 text-blue-600 border cursor-pointer"
          >
            Purchase history
          </button>
        </div>

        {showSellbook && (
          <div className="bg-gray-200 p-3 mt-5 mb-5 rounded-md">
            <h1 className="text-center text-2xl">Book details</h1>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="grid ">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, title: e.target.value })
                  }
                  value={bookData.title}
                  className="bg-white px-3 py-2 rounded-md  mt-2"
                  type="text"
                  placeholder="Title"
                />
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, author: e.target.value })
                  }
                  value={bookData.author}
                  className="bg-white px-3 py-2 rounded-md  mt-2"
                  type="text"
                  placeholder="Author"
                />
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, noOfPages: e.target.value })
                  }
                  value={bookData.noOfPages}
                  className="bg-white px-3 py-2 rounded-md  mt-2"
                  type="text"
                  placeholder="No. of Pages"
                />
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, imgURL: e.target.value })
                  }
                  value={bookData.imgURL}
                  className="bg-white px-3 py-2 rounded-md  mt-2"
                  type="text"
                  placeholder="image URL"
                />
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, price: e.target.value })
                  }
                  value={bookData.price}
                  className="bg-white px-3 py-2 rounded-md  mt-2"
                  type="text"
                  placeholder="Price"
                />
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, discountPrice: e.target.value })
                  }
                  value={bookData.discountPrice}
                  className="bg-white px-3 py-2 rounded-md  mt-2"
                  type="text"
                  placeholder="Discount Price"
                />
                <textarea
                  onChange={(e) =>
                    setBookData({ ...bookData, abstract: e.target.value })
                  }
                  value={bookData.abstract}
                  placeholder="Abstract"
                  rows="4"
                  className=" px-3 py-1 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mt-2"
                />
              </div>
              <div className="grid grid-cols-1">
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, publisher: e.target.value })
                  }
                  value={bookData.publisher}
                  className="bg-white px-3 py-2 rounded-md mt-2"
                  type="text"
                  placeholder="Publisher"
                />
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, language: e.target.value })
                  }
                  value={bookData.language}
                  className="bg-white px-3 py-2 rounded-md mt-2"
                  type="text"
                  placeholder="Language"
                />
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, ISBN: e.target.value })
                  }
                  value={bookData.ISBN}
                  className="bg-white px-3 py-2 rounded-md mt-2"
                  type="text"
                  placeholder="ISBN"
                />
                <input
                  onChange={(e) =>
                    setBookData({ ...bookData, category: e.target.value })
                  }
                  value={bookData.category}
                  className="bg-white px-3 py-2 rounded-md mt-2"
                  type="text"
                  placeholder="Category"
                />

                <label htmlFor="imgU">
                  <input
                    onChange={(e) => onImageChange(e)}
                    hidden
                    type="file"
                    id="imgU"
                  />
                  <img className="h-50 mt-4" src={preview} alt="" />
                </label>

                {previewList.length > 0 && (
                  <div className="flex  mt-2 gap-3">
                    {previewList.map((eachPreview) => (
                      <img className="w-10" src={eachPreview} alt="" />
                    ))}
                    {previewList.length < 3 && (
                      <label htmlFor="abc">
                        <input
                          hidden
                          onChange={(e) => onImageChange(e)}
                          type="file"
                          name=""
                          id="abc"
                        />
                        <img
                          className="w-10 me-5"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFYCpqDFE_pm-qkNMkU8z4sqv2wGyxzuP2g&s"
                          alt=""
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-3 gap-3">
              <button className="bg-orange-600 px-3 py-2 rounded-md">
                Reset
              </button>
              <button
                onClick={onSubmitClick}
                className="bg-green-600 px-3 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {showBookStatus && <div>
           {viewbook?.length > 0 && (
            <div className="grid grid-cols-3 mt-3">
              {viewbook?.map((eachBook) => (
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
                        <h1 className="">{eachBook.author}</h1>
                      </div>
                      <h1>
                        <span className="font-bold">&#8377; </span>{eachBook.price}
                      </h1>
                    </div>
                  
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}

          </div>}

        {showPurchace && <div>
           {purchaseBook?.length > 0 && (
            <div className="grid grid-cols-3 mt-3">
              {purchaseBook?.map((eachBook) => (
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
                        <h1 className="">{eachBook.author}</h1>
                      </div>
                      <h1>
                        <span className="font-bold">&#8377; </span>{eachBook.price}
                      </h1>
                    </div>
                  
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
          </div>}
      </div>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="text-center p-3">
              <div className="flex justify-center mb-5">
                <label htmlFor="pro">
                  <img
                    className="w-50 rounded-full"
                    src={proPicPreview}
                    alt=""
                  />
                  <input
                    onChange={(e) => onProPicChange(e)}
                    hidden
                    type="file"
                    name=""
                    id="pro"
                  />
                </label>
              </div>
              <div>
                <input
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, userName: e.target.value })
                  }
                  type="text"
                  value={userDetails?.userName}
                  placeholder="Name"
                  className="w-md rounded-sm px-4 py-3 mb-2 bg-gray-300 text-gray-600"
                />
              </div>
              <div>
                <input
                 
                  onChange={(e) =>setCurrentPswdInput(e.target.value)
                    
                  }
                  type="password"
                  placeholder="Current Password"
                  className="w-md rounded-sm px-4 py-3 mb-2 bg-gray-300 text-gray-600"
                />
              </div>
              <div>
                <input
                  type="password"
                  onChange={(e) =>setUserDetails({...userDetails,password:e.target.value}) }
                  placeholder="new Password"
                  className="w-md rounded-sm px-4 py-3 mb-2 bg-gray-300 text-gray-600"
                />
              </div>
              <div>
                <textarea
                  value={userDetails?.bio}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, bio: e.target.value })
                  }
                  name="bio"
                  id="bio"
                  placeholder="Bio"
                  className="w-md rounded-sm px-4 py-3 mb-2 bg-gray-300 text-gray-600"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
          <Button onClick={onEditClick}>Edit</Button>
        </ModalFooter>
      </Modal>
    </section>
  );
};

export default Profile;
