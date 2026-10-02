import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { Dropdown, DropdownItem } from "flowbite-react";
import { AuthContext } from "../context/AuthContext";


const Header = () => {
  const {token,removeToken}=useContext(AuthContext)
//   const [token, setToken] = useState(null);
//  useEffect(() => {
//    setToken(localStorage.getItem("token"));
//   }, []);
  return (
    <div>
      <div className="flex justify-between  me-3">
        <img
          className="w-25"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-LiAZIVA5b7bqDey8jLrj9cVdOTMQ3Sthg&s"
          alt="bookstorelogo"
        />

        <h1 className="text-3xl font-bold font-serif">BOOK STORE</h1>

        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faFacebook} />
          
         
          {
            token?  <Dropdown className= 'text-black px-3' label={
              <>
              <img className="w-10 bg-black" src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg" />
              </>
            } dismissOnClick={false}>
            <DropdownItem><Link to={'/profile'}>profile</Link></DropdownItem>
            <DropdownItem><button onClick={removeToken}>LogOut</button></DropdownItem>
            
          </Dropdown>:<button className="border ms-3 p-2  rounded-full hover:bg-black hover:text-white cursor-pointer">
            <FontAwesomeIcon icon={faUser} />
            <Link to={"/login"}>login</Link>{" "}
          </button>
          }
        </div>
      </div>

      <div className=" bg-gray-900 p-3 text-center">
        <ul className="flex justify-center  text-white gap-10  font-serif">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/book"}>Books</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;