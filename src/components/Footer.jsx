import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const Footer = () => {
  return (
    <>
      <div className='bg-gray-900 flex gap-40 pt-15 pb-10'>
        <div className='text-white font-serif ps-20'>
          <h1 className='pb-5'>ABOUT US</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
            dolorem veniam <br /> deserunt quisquam eius ad hic maxime dicta ipsum nemo
            itaque necessitatibus quas <br /> nobis, illum voluptate, pariatur
            recusandae alias harum!
          </p>
        </div>

        <div className='font-serif text-white'>
          <h1 className='pb-5'>NEWSLETTER</h1>
          <p className='pb-3'>Stay updated with our latest trends</p>
         <div> <input className='bg-white text-black outline-0 p-2' type="text" placeholder='EMAIL ID'/>
          <button className='bg-yellow-300 p-2 text-black' ><FontAwesomeIcon icon={faArrowRight} /></button></div>
        </div>

        <div className='font-serif text-white'>
          <h1 className='pb-5'>FOLLOW US</h1>
          <p className='pb-1'>Let us be social</p>
          <div className='flex gap-2'>
            <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faLinkedin} />
          </div>
        </div>
      </div>
      <div className='bg-black text-white p-3 text-center'>
        <h6 className=''>Copyright © 2026 All rights reserved | This website is made with by  Sona Shajahan</h6>
      </div>
    </>
  )
}

export default Footer