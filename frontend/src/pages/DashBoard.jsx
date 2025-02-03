import React, { useEffect, useRef, useState } from "react";
import transactions from "../data/transactions.json";
import Layout from "@/layout/Layout";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { useWallet } from "@/context/walletContext";
import { FaWallet } from "react-icons/fa6";

const DashBoard = () => {
   const [wallet, setWallet] = useState([]);
   const { auth } = useAuth();
   const ref = useRef();
   const [isCopied, setIsCopied] = useState(false);
   const { connectWallet } = useWallet();

   const backend_url = import.meta.env.VITE_BACKEND_URL;

   const fetchWallet = async () => {
      try {
         const config = {
            headers: {
               Authorization: auth.token,
            },
         };

         const { data } = await axios.get(`${backend_url}/api/v1/wallet/get-wallet`, config);

         if (data.success) {
            setWallet(data.wallet);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchWallet();
   }, []);

   const copyAddress = () => {
      const address = ref.current.innerText;
      console.log(address);
      navigator.clipboard.writeText(address);
      setIsCopied(true);
   };

   console.log(wallet);

   return (
      <Layout>
         <div className="px-10  font-[500] min-h-[100vh]  text-black bg-[#f5f5f5] dark:bg-[#0c0f17] dark:text-white">
            <div className="flex items-center justify-between">
               <div className="flex flex-col  pt-6  pb-3 gap-1">
                  <h1 className="  pl-4 text-2xl mb-1 flex items-center gap-4 ">
                     <FaWallet /> My Wallet
                  </h1>
                  {connectWallet && (
                     <div className="flex pl-4">
                        <span ref={ref} className="text-[1rem]  ">
                           h78iiashu99hi2ih9hijsau9oio
                        </span>
                        <button className="ml-2 " type="button" onClick={copyAddress}>
                           {isCopied ? <TbCopyCheckFilled className="text-[1.1rem]" /> : <TbCopy className="text-[1.1rem]" />}
                        </button>
                     </div>
                  )}
               </div>
               <div className="flex gap-3 pr-4">
                  {connectWallet ? (
                     <button type="button" className="border-2 border-[#1EDE25] text-[#1EDE25] bg-[#1EDE25] text-white duration-300 px-3 py-1.5 rounded-lg flex gap-2 items-center">
                        Connected
                        <FaCheckCircle />{" "}
                     </button>
                  ) : (
                     <>
                        <button type="button" className="border-2 border-[#1EDE25] text-[#1EDE25] hover:bg-[#1EDE25] hover:text-white duration-300 px-3 py-1.5 rounded-lg flex gap-2 items-center">
                           <FiLink />
                           Connect Wallet
                        </button>
                     </>
                  )}
               </div>
            </div>

            <div className="px-4 pt-4 pb-8 flex gap-5 justify-between">
               <div className="relative hover:scale-[105%] duration-300 shadow-2xl py-14 text-[#FFFFFF] overflow-hidden w-[330px] min-w-[250px]  rounded-xl  flex flex-col justify-center gap-4 pl-10 bg-gradient-to-r from-[#c693f8] to-[#a85ff4] dark:bg-[#19202e] ">
                  <h1 className="text-6xl ">{wallet.length !== 0 ? wallet?.availableEnergyTokens : "0"}</h1>

                  <h3 className="text-xl">Energy tokens</h3>
                  <div className="circle-1 absolute bg-[#c693f8] w-[9rem] h-[9rem] bg-opacity-50 top-2 -right-[4rem] rounded-full"></div>
                  <div className="circle-2 absolute bg-[#c693f8] w-[9rem] h-[9rem] bg-opacity-50 -bottom-[0.5rem] -right-[1rem] rounded-full"></div>
               </div>

               <div className="relative hover:scale-[105%] duration-300 shadow-2xl py-14 text-[#FFFFFF] overflow-hidden w-[330px] min-w-[250px]  rounded-xl  flex flex-col justify-center gap-4 pl-10 bg-gradient-to-r from-[#6aa4e3] to-[#6564e7] dark:bg-[#19202e] ">
                  <h1 className="text-6xl ">0</h1>

                  <h3 className="text-xl ">Current Generation</h3>
                  <div className="circle-1 absolute bg-[#6aa4e3] w-[9rem] h-[9rem] bg-opacity-50 top-2 -right-[4rem] rounded-full"></div>
                  <div className="circle-2 absolute bg-[#6aa4e3] w-[9rem] h-[9rem] bg-opacity-50 -bottom-[0.5rem] -right-[1rem] rounded-full"></div>
               </div>

               <div className="relative hover:scale-[105%] duration-300 shadow-2xl py-14 text-[#FFFFFF] overflow-hidden w-[330px] min-w-[250px]  rounded-xl  flex flex-col justify-center gap-4 pl-10 bg-gradient-to-r from-[#7ff45f] to-[#48d748] dark:bg-[#19202e] ">
                  <h1 className="text-6xl ">{wallet.length !== 0 ? wallet.accountBalance : "0"}</h1>

                  <h3 className="text-xl">Wallet Balance</h3>
                  <div className="circle-1 absolute bg-[#7ff45f] w-[9rem] h-[9rem] bg-opacity-50 top-2 -right-[4rem] rounded-full"></div>
                  <div className="circle-2 absolute bg-[#7ff45f] w-[9rem] h-[9rem] bg-opacity-50 -bottom-[0.5rem] -right-[1rem] rounded-full"></div>
               </div>
            </div>
            <div className="px-4 py-5">
               <div className="bg-white  dark:bg-[#19202e] shadow-2xl rounded-[1.5rem] px-10 pb-4 mb-8">
                  <h1 className=" text-2xl pt-6 pb-2 bg-white dark:bg-[#19202e] ">Latest Transactions</h1>
                  <table className="w-full table-auto ml-1 bg-white dark:bg-[#19202e]">
                     <thead className="  ">
                        <tr className="">
                           <td className="py-4 pr-6  tracking-wide">Sr No</td>
                           <td className="py-4 pr-6  tracking-wide">Seller</td>
                           <td className="py-4 pr-6  tracking-wide">Buyer</td>
                           <td className="py-4 pr-6  tracking-wide">Transaction Date</td>
                           <td className="py-4  tracking-wide">Transaction Status</td>
                        </tr>
                     </thead>
                     <tbody className="py-2  text-[#939393] w-full">
                        {transactions.map((t) => (
                           <>
                              <tr key={t.number} className="text-sm  py-6  ">
                                 <td className="py-6 pl-1">{t.number}</td>
                                 <td className="py-6">{t.hash}</td>
                                 <td className="py-6">{t.hash}</td>
                                 <td className="py-6">October 26 2024, 5:33 PM</td>
                                 <td className="">
                                    <span className="border-2 border-yellow-400 text-yellow-400 py-2 text-center w-[10rem]  block rounded-lg">Pending</span>
                                 </td>
                              </tr>
                           </>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default DashBoard;