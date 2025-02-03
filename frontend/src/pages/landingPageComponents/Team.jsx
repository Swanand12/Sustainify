import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Team = () => {
   const teamData = [
      {
         imagePath: "team-1.jpg",
         name: "Jane Doe",
         role: "Blockchain Expert",
         twitterLink: "https://www.twitter.com",
         facebookLink: "https://www.facebook.com",
         linkedInLink: "https://www.linkedin.com",
         instagramLink: "https://www.instagram.com",
         delay: 0,
      },
      {
         imagePath: "team-2.jpg",
         name: "Kamla Harris",
         role: "Machinery Expert",
         twitterLink: "https://www.twitter.com",
         facebookLink: "https://www.facebook.com",
         linkedInLink: "https://www.linkedin.com",
         instagramLink: "https://www.instagram.com",
         delay: 0.4,
      },
      {
         imagePath: "team-3.jpg",
         name: "Harry Potter",
         role: "Full Stack Developer",
         twitterLink: "https://www.twitter.com",
         facebookLink: "https://www.facebook.com",
         linkedInLink: "https://www.linkedin.com",
         instagramLink: "https://www.instagram.com",
         delay: 0.8,
      },
      {
         imagePath: "team-4.jpg",
         name: "Taylor Swift",
         role: "Frontend Developer",
         twitterLink: "https://www.twitter.com",
         facebookLink: "https://www.facebook.com",
         linkedInLink: "https://www.linkedin.com",
         instagramLink: "https://www.instagram.com",
         delay: 1.2,
      },
   ];
   return (
      <div className="flex flex-col font-[400]   py-[4rem] px-[10rem]">
         <motion.div className="mb-8 flex flex-col items-center" initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <h1 className="text-[3rem] text-[#42cdf8]  mb-8  tracking-wide">Team</h1>
         </motion.div>
         <div className="flex gap-10 justify-center">
            {teamData.map((t, i) => (
               <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: t.delay, ease: "easeOut" }}
               >
                  <img src={`/src/assets/${t.imagePath}`} alt={`team-${i}`} className="w-[250px] hover:scale-[105%] duration-300 rounded-lg mb-4" />
                  <h1 className="text-[#42cdf8] text-xl mb-1 font-[500]">{t.name}</h1>
                  <i className="mb-2 text-lg text-gray-400">{t.role}</i>
                  <div className="flex text-[#42cdf8]">
                     <Link to={t.facebookLink} target="_blank">
                        <FaFacebook className="text-2xl mr-3 " />
                     </Link>
                     <Link to={t.instagramLink} target="_blank">
                        <FaInstagramSquare className="text-2xl mr-3" />
                     </Link>
                     <Link to={t.linkedInLink} target="_blank">
                        <FaLinkedin className="text-2xl mr-3" />
                     </Link>
                     <Link to={t.twitterLink} target="_blank">
                        <FaSquareXTwitter className="text-2xl mr-3" />
                     </Link>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
   );
};

export default Team;
