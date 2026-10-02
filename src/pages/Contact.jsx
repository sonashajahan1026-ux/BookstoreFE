import React from "react";
import Header from "../components/Header";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="text-center">
        <h1 className="text-4xl font-serif pb-3">Contacts</h1>
        <p className="pb-10 ps-45 pe-45">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          inventore placeat nemo voluptatem iure, iste asperiores quia amet
          sint, similique corrupti praesentium delectus nesciunt odit
          laudantium. Beatae repudiandae amet odit! Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Soluta, doloremque ullam itaque atque
          totam quasi molestias cumque ducimus fuga voluptate suscipit vel
          distinctio omnis voluptates obcaecati quidem quas iure? Facere?
        </p>
      </div>
      <div className="flex justify-around pb-10">
        <div className="flex gap-2 items-center">
          <div>
            <FontAwesomeIcon
              className=" rounded-full bg-gray-200 p-2"
              icon={faLocationDot}
            />
          </div>
          <div>
            <p>
              123,Main Street,APt 4B, <br />
              Anytown,CA 91234
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <FontAwesomeIcon
              className=" rounded-full bg-gray-200 p-2"
              icon={faPhone}
            />
          </div>
          <div>
            <p>+91 8281492676</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <FontAwesomeIcon
              className=" rounded-full bg-gray-200 p-2"
              icon={faEnvelope}
            />
          </div>
          <div>
            <p>bookStore@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-10">
        <div className="w-175 h-100 mb-10 bg-gray-200 text-center">
          <h1 className=" font-serif text-xl pt-2">Send me Message</h1>
          <input placeholder="Name" type="text" className="bg-white w-160 p-2 mt-3 rounded" />
          <input placeholder="Email Id" type="text" className="bg-white w-160 p-2 mt-3 rounded" />
          <textarea  className="bg-white w-160 p-8 mt-3 rounded"><input  type="text" placeholder="message" /></textarea>
          <div>
            <button className="w-160 p-2 mt-3 rounded bg-black text-white">send <FontAwesomeIcon icon={faPaperPlane} /></button>
          </div>
           </div>
        <div className="w-175 h-100 mb-10 bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31564.88180639172!2d76.97582685!3d8.537167300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1769496361637!5m2!1sen!2sin"
            className="w-175 h-100"
           
          ></iframe>{" "}
        </div>
      </div>
    </>
  );
};

export default Contact;
