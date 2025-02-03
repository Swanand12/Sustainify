import React from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
   return (
      <div className="flex flex-col items-center font-[400]   py-[10rem]">
         <motion.div
            className="mb-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1.0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
         >
            <h1 className="text-[3rem] text-[#42cdf8]  mb-8  tracking-wide">Contact Us</h1>
         </motion.div>
         <div className="flex w-full px-[15rem]  justify-between">
            <motion.div
               className="mb-8 flex flex-col gap-8"
               initial={{ opacity: 0, x: -70 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, amount: 0.4 }}
               transition={{ duration: 0.7, ease: "easeOut" }}
            >
               <div className="flex flex-col">
                  <h1 className=" mb-2  text-xl">Address</h1>
                  <div className="flex flex-col ">
                     <span>11 West Town</span>
                     <span>PBo 12345, United States</span>
                  </div>
               </div>
               <div className="flex flex-col">
                  <h1 className=" mb-2  text-xl">Phone</h1>
                  <div className="flex flex-col ">
                     <span>+1 1234 56 789</span>
                     <span>+1 1234 56 780</span>
                  </div>
               </div>
               <div className="flex flex-col">
                  <h1 className=" mb-2  text-xl">Email</h1>
                  <div className="flex  flex-col ">
                     <span>sustainify@gmail.com</span>
                     <span>sustainify@info.in</span>
                  </div>
               </div>
            </motion.div>
            <motion.div
               className="mb-8 w-[70%] flex flex-col items-center text-lg gap-8"
               initial={{ opacity: 0, x: 70 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, amount: 0.4 }}
               transition={{ duration: 0.7, ease: "easeOut" }}
            >
               <div className="flex items-center gap-7 w-full">
                  <input
                     type="text"
                     placeholder="Name"
                     required
                     className="py-3 px-4  w-[350px] min-w-[200px] bg-[#f8f8f8] border-2 dark:border-[#2f3e5d] dark:bg-[#19202e]  placeholder-gray-500 focus:outline-none rounded-lg border border-gray-300 focus:border-2 focus:border-[#42cdf8]"
                  />
                  <input
                     type="email"
                     placeholder="Email"
                     required
                     className="py-3 px-4  w-[350px] min-w-[200px] bg-[#f8f8f8] border-2 dark:border-[#2f3e5d] dark:bg-[#19202e]  placeholder-gray-500 focus:outline-none rounded-lg border border-gray-300 focus:border-2 focus:border-[#42cdf8]"
                  />
               </div>
               <input
                  type="text"
                  placeholder="Subject"
                  required
                  className="py-3 px-4  w-full min-w-[200px] bg-[#f8f8f8] border-2 dark:border-[#2f3e5d] dark:bg-[#19202e]  placeholder-gray-500 focus:outline-none rounded-lg border border-gray-300 focus:border-2 focus:border-[#42cdf8]"
               />
               <textarea
                  placeholder="Write your Message"
                  required
                  className="py-3 px-4  h-[150px]  w-full min-w-[200px] bg-[#f8f8f8] border-2 dark:border-[#2f3e5d] dark:bg-[#19202e]  placeholder-gray-500 focus:outline-none rounded-lg border border-gray-300 focus:border-2 focus:border-[#42cdf8]"
               />
               <button type="button" className="py-3 px-10 dark:text-black flex me-auto bg-[#42cdf8] rounded-full text-[#f8f8f8] font-[500]">
                  Send Message
               </button>
            </motion.div>
         </div>
      </div>
   );
};

export default ContactUs;
