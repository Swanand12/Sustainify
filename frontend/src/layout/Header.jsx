import SellModal from "@/modals/SellModal";
import React, { useEffect, useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineArrowOutward } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";

const Header = () => {
   const { auth, setAuth } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
   const [isDarkMode,setIsDarkMode] = useState(false)

   const handleLogout = () => {
      localStorage.removeItem("auth");
      setAuth({
         user: null,
         token: "",
      });
      navigate("/");
      toast.success("Successfully logged out");
   };

   useEffect(()=>{
      const theme = localStorage.getItem("theme")
      if(theme === "light"){
         setIsDarkMode(false)
         document.documentElement.classList.remove("dark")
      }
      else{
         setIsDarkMode(true)
         document.documentElement.classList.add("dark")
      }
      
   },[])

   const toggleTheme = () =>{
      if(isDarkMode){
         document.documentElement.classList.remove("dark")
         localStorage.setItem("theme","light")
         setIsDarkMode(false)
      }
      else{
         document.documentElement.classList.add("dark")
         localStorage.setItem("theme","dark")
         setIsDarkMode(true)
         

      }
   }

   return (
      <div
         className={`${location.pathname === "/" ? "bg-gradient-to-r from-[#002a50]  to-black text-white dark:before:opacity-50 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-0 " : "bg-white dark:bg-[#0c0f17] dark:text-white text-[#a4a4a4]"} w-full font-[500]    px-[5rem] py-5 flex items-center justify-between`}
      >
         <div className="flex gap-2 relative items-center">
            <span className="text-2xl text-[#36d9c4]  ">Sustainify</span>
         </div>

         <div className="flex gap-5 items-center">
         {auth?.token ? (
            <div className="flex relative items-center px-4 rounded-lg py-2 gap-5">
               <Link
                  to="/"
                  className={`${location.pathname === "/" ? "bg-transparent  rounded-lg  text-[#36d9c4]" : ""}`}
               >
                  Home
               </Link>
               <NavLink to="/sustainify/dashboard" className="  rounded-lg sticky z-[1] ">
                  Dashboard
               </NavLink>
               <NavLink to="/sustainify/bids" className="  rounded-lg sticky z-[1] ">
                  All Bids
               </NavLink>
               <NavLink to="/sustainify/my-bids" className="   rounded-lg sticky z-[1]">
                  My Bids
               </NavLink>
               {location.pathname === "/sustainify/dashboard" && <SellModal />}
            </div>
         ):(
            <div className="flex items-center relative px-4 rounded-lg py-2 gap-5 ">
               <NavLink to="/sustainify/dashboard" className="  rounded-lg sticky z-[1] ">
                  About Us
               </NavLink>
               
               <NavLink to="/sustainify/my-bids" className="   rounded-lg sticky z-[1]">
                  Why choose us
               </NavLink>
               <NavLink to="/sustainify/my-bids" className="   rounded-lg sticky z-[1]">
                  Testimonials
               </NavLink>
               <NavLink to="/sustainify/my-bids" className="   rounded-lg sticky z-[1]">
                  FAQ's
               </NavLink>
               <NavLink to="/sustainify/my-bids" className="   rounded-lg sticky z-[1]">
                  Contact Us
               </NavLink>
               </div>
         )}
         <button type="button" className="relative" onClick={toggleTheme}>{isDarkMode ? <div className="text-black bg-white text-xl p-2.5 rounded-full"><MdSunny/></div> : <div className="bg-black text-white text-xl p-2.5 rounded-full"><IoMoon/></div>}</button>
         </div>

         

         {auth.token ? (
            <button
               type="button"
               onClick={handleLogout}
               className="py-2 relative  bg-transparent text-[#36d9c4] border-2 border-[#36d9c4] px-5 rounded-full   flex gap-4 items-center"
            >
               <RiLogoutCircleRLine className="text-lg" /> Logout
            </button>
         ) : (
            <button
               type="button"
               onClick={() => navigate("/auth")}
               className="py-2 relative  bg-transparent text-[#36d9c4] border-2 border-[#36d9c4] px-5 rounded-full   flex gap-2 items-center "
            >
               Login
               <MdOutlineArrowOutward className="text-lg" />
            </button>
         )}
      </div>
   );
};

export default Header;
