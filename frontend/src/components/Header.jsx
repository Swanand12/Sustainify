import SellModal from "@/components/modals/SellModal";
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  console.log(auth);
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      user: null,
      token: "",
    });
    navigate("/");
    toast.success("Successfully logged out");
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div
      className={`${
        location.pathname === "/"
          ? "bg-gradient-to-r from-[#002a50]  to-black text-white dark:before:opacity-50 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-0 "
          : "bg-white dark:bg-[#0c0f17] dark:text-white text-[#a4a4a4]"
      } w-full font-[500]    px-[3.5rem] py-5 flex items-center justify-between`}
    >
      <div className="flex gap-2 relative items-center">
        <span className="text-2xl text-[#36d9c4]  ">Sustainify</span>
      </div>

      <div className="flex gap-5 items-center">
        {auth?.token ? (
          <div className="flex relative items-center px-4 rounded-lg py-2 gap-5">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "bg-transparent  rounded-lg  text-[#36d9c4]"
                  : ""
              }`}
            >
              Home
            </Link>
            <NavLink
              to="/sustainify/dashboard"
              className="  rounded-lg sticky z-[1] "
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/sustainify/bids"
              className="  rounded-lg sticky z-[1] "
            >
              All Bids
            </NavLink>
            <NavLink
              to="/sustainify/activity"
              className="   rounded-lg sticky z-[1]"
            >
              BidActivity
            </NavLink>
            {location.pathname === "/sustainify/dashboard" && <SellModal />}
          </div>
        ) : (
          <div className="flex items-center relative px-4 rounded-lg py-2 gap-5 ">
            <NavLink to="/sustainify" className="  rounded-lg sticky z-[1] ">
              About Us
            </NavLink>

            <NavLink to="/sustainify" className="rounded-lg sticky z-[1]">
              Why choose us
            </NavLink>
            <NavLink to="/sustainify" className="rounded-lg sticky z-[1]">
              Testimonials
            </NavLink>
            <NavLink to="/sustainify" className="rounded-lg sticky z-[1]">
              FAQ's
            </NavLink>
            <NavLink to="/sustainify" className="rounded-lg sticky z-[1]">
              Contact Us
            </NavLink>
          </div>
        )}
        <button type="button" className="relative z-[50]" onClick={toggleTheme}>
          {isDarkMode ? (
            <div className="text-black bg-white text-xl p-2.5 rounded-full">
              <MdSunny />
            </div>
          ) : (
            <div className="bg-black text-white text-xl p-2.5 rounded-full">
              <IoMoon />
            </div>
          )}
        </button>
      </div>

      {auth.token ? (
        <div className="flex relative items-center gap-6 z-[50]">
          <div className="w-11 h-11 group flex cursor-pointer items-center justify-center text-xl bg-[#36d9c4] rounded-full dark:text-white text-black">
            {auth?.user?.name?.[0].toUpperCase()}

            <div className="absolute top-[5rem]  rounded-lg p-2 text-[16px] font-normal pointer-events-none group-hover:pointer-events-auto  opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#36d9c4] before:content-[' '] before:bg-[#36d9c4] before:w-4 before:h-4 before:absolute before:-top-1.5 before:left-1/2 before:-translate-x-1/2 before:rotate-45 text-[#19202e]">
              <p className="capitalize">{auth?.user?.name}</p>
              <p>{auth?.user?.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="py-2 relative z-[50]  bg-transparent text-[#36d9c4] border-2 border-[#36d9c4] hover:bg-[#36d9c4] hover:text-white duration-300 px-5 rounded-full   flex gap-4 items-center"
          >
            <RiLogoutCircleRLine className="text-lg" /> Logout
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => navigate("/auth")}
          className="py-2 relative z-[50] bg-transparent text-[#36d9c4] border-2 border-[#36d9c4] hover:bg-[#36d9c4] hover:text-white duration-300 px-5 rounded-full   flex gap-2 items-center "
        >
          Login
          <MdOutlineArrowOutward className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default Header;
