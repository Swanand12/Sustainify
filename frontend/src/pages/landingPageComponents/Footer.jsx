import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
   return (
      <div className="footer-section relative px-[10rem] py-[4rem] tracking-wide font-[300] bg-gradient-to-r from-[#002a50]  to-black dark:before:opacity-50 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-0 p-10 text-white flex justify-center ">
         <div className="w-[400px] relative flex flex-col mr-16">
            <div className="flex gap-2 items-center mb-6">
               <span className="text-2xl  text-[#36d9c4]">Sustainify</span>
            </div>
            <div className="mb-[4rem]">
               <p className="text-white  mb-6 ">
               Sustainify is your gateway to a sustainable energy revolution, seamlessly connecting homes to renewable resources and community-driven energy trading. Our innovative platform empowers users with real-time insights and automated energy management, making eco-friendly living effortless. With a commitment to cutting-edge technology and exceptional support, we transform the way you interact with energy. Join us in reducing carbon footprints while enhancing energy independence. Together, let’s power
               </p>
               <div className="flex flex-col gap-6">
                  <span className="text-2xl  text-[#36d9c4]">Follow us</span>
                  <div className="flex ">
                     <FaFacebook className="text-2xl mr-3 " />
                     <FaInstagramSquare className="text-2xl mr-3" />
                     <FaLinkedin className="text-2xl mr-3" />
                     <FaSquareXTwitter className="text-2xl mr-3" />
                  </div>
               </div>
            </div>
            <span className=" text-[#938F99]">©2024 Designed by SustAInifier’s</span>
         </div>
         
            <div className="relative flex gap-16 mb-[3rem]">
               <div className="flex flex-col">
                  <h1 className=" mb-4 text-[#36d9c4] text-2xl">Services</h1>
                  <div className="flex flex-col gap-2">
                     <span>About me</span>
                     <span>Privacy Policy</span>
                     <span>Terms Condition</span>
                     <span>Contact me</span>
                  </div>
               </div>
               <div className="flex flex-col">
                  <h1 className=" mb-4 text-[#36d9c4] text-2xl">Menu</h1>
                  <div className="flex flex-col gap-2">
                     <span>About</span>
                     <span>Reviews</span>
                     <span>Team</span>
                     <span>FAQ's</span>
                     <span>About</span>
                     <span>Privacy Policy</span>
                     <span>Terms Condition</span>
                     <span>Dashboard</span>
                     <span>Current Bids</span>
                     <span>My Bids</span>
                     <span>Transactions</span>
                  </div>
               </div>
               <div className="flex flex-col">
                  <h1 className=" mb-4 text-[#36d9c4] text-2xl">Contact</h1>
                  <div className="flex flex-col gap-2">
                     <span> 101 West Town , PBO 12345, United States</span>
                     <span>+91 9856745561</span>
                     <span>sustainify@gmail.com</span>
                  </div>
               </div>
            </div>
         
      </div>
   );
};

export default Footer;
