import { useAuth } from "@/context/authContext";
import Layout from "@/layout/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ViewTransactions = () => {
   const [bid, setbid] = useState(null);
   const { auth } = useAuth();
   const params = useParams();
   const [transactions, setTransactions] = useState([]);
   const navigate = useNavigate();

   const backend_url = import.meta.env.VITE_BACKEND_URL;

   const fetchBid = async () => {
      try {
         const config = {
            headers: {
               Authorization: auth.token,
            },
         };

         const { data } = await axios.get(`${backend_url}/api/v1/bid/get-single-bid/${params.bid}`, config);

         if (data.success) {
            setbid(data.singleBid);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchBid();
   }, []);

   const fetchTransactions = async () => {
      try {
         const config = {
            headers: {
               Authorization: auth.token,
            },
         };

         const { data } = await axios.get(`${backend_url}/api/v1/transaction/get-transactions/${params.bid}`, config);

         if (data.success) {
            setTransactions(data.transactions);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchTransactions();
   }, []);

   const startTransaction = async () => {
      try {
         const config = {
            headers: {
               Authorization: auth.token,
            },
         };

         const { data } = await axios.get(`${backend_url}/api/v1/bid/start-transaction/${params.bid}`, config);

         if (data.success) {
            toast.success(data.message);
            navigate("/sustainify/dashboard");
         }
      } catch (error) {
         if (!error.response.data.success) {
            toast.error(error.response.data.message);
         }
      }
   };

   return (
      <Layout>
         <div className="px-10 bg-[#f5f5f5] dark:bg-[#0c0f17] dark:text-white font-[500] text-black min-h-[100vh]">
            <h1 className="px-2 py-6  text-2xl">Transactions</h1>

            <div key={bid?._id} className="card mb-10  bg-white dark:bg-[#19202e] shadow-2xl rounded-xl py-8  flex flex-col px-10 ">
               <h1 className=" me-auto text-2xl  mb-6">Bid Information</h1>
               <div className="text-[#939393]  mb-8 flex flex-wrap gap-6">
                  <h3 className="   flex flex-col flex-1 ">
                     <span className=" text-[#939393] mb-2">Total Cost:</span> <span className="text-sm bg-[#f5f5f5] dark:bg-[#0c0f17] w-[15rem]  text-black dark:text-white py-2 px-4 rounded-lg">{bid?.totalCost}</span>
                  </h3>

                  <h3 className="   flex flex-col flex-1 ">
                     <span className=" text-[#939393] mb-2">Price per Unit Energy:</span> <span className="text-sm bg-[#f5f5f5] dark:bg-[#0c0f17] w-[15rem]  text-black dark:text-white py-2 px-4 rounded-lg">{bid?.pricePerToken}</span>
                  </h3>

                  <h3 className="   flex flex-col flex-1 ">
                     <span className=" text-[#939393] mb-2">Energy Units:</span> <span className="text-sm bg-[#f5f5f5] dark:bg-[#0c0f17] w-[15rem]  text-black dark:text-white py-2 px-4 rounded-lg">{bid?.energyTokensToSell}</span>
                  </h3>

                  <h3 className="   flex flex-col flex-1 ">
                     <span className=" text-[#939393] mb-2">Seller Address:</span> <span className="text-sm bg-[#f5f5f5] dark:bg-[#0c0f17] w-[15rem]  text-black dark:text-white py-2 px-4 rounded-lg">{bid?.sellerAddress}</span>
                  </h3>

                  {bid?.buyerAddress && (
                     <>
                        <h3 className="   flex flex-col flex-1 ">
                           <span className=" text-[#939393] mb-2">Buyer Address:</span> <span className="text-sm bg-[#f5f5f5] dark:bg-[#0c0f17] w-[15rem]  text-black dark:text-white py-2 px-4 rounded-lg">{bid?.buyerAddress}</span>
                        </h3>
                     </>
                  )}
               </div>
               {bid?.buyerAddress && bid?.seller === auth.user._id && (
                  <button onClick={() => startTransaction()} type="button" className=" text-[#1EDE25] bg-[#1EDE25]  w-[10rem]  text-center text-white duration-300  py-2 rounded-lg flex gap-2 justify-center">
                     {bid?.isAccepted ? "Accepted" : "Accept Bid"}
                  </button>
               )}
            </div>

            {transactions.length > 0 ? (
               <div className="pb-10">
                  <div className="shadow-2xl bg-white dark:bg-[#19202e] rounded-[1.5rem] px-10 pb-4  ">
                     <h1 className=" text-2xl pt-6 pb-2  bg-white dark:bg-[#19202e] ">Bid Transactions</h1>
                     <table className="w-full px-[1rem]  bg-white dark:bg-[#19202e]">
                        <thead className="  ">
                           <tr className="  ">
                              <td className="py-4 tracking-wide">TX Number</td>
                              <td className="py-4 tracking-wide">Buyer</td>
                              <td className="py-4 tracking-wide">Bidding Amount</td>
                              <td className="py-4 tracking-wide">Total Cost</td>
                              <td className="py-4 tracking-wide">Transaction Date</td>
                              <td className="py-4 tracking-wide">Status</td>
                           </tr>
                        </thead>
                        <tbody className="p-2 text-[#939393] w-full">
                           {transactions.map((t, i) => (
                              <tr key={t._id} className="  py-6  text-sm ">
                                 <td className="py-6">{i + 1}</td>
                                 <td className="py-6">{t.buyer}</td>
                                 <td className="py-6">{t.biddingPrice}</td>
                                 <td className="py-6">{t.totalCost}</td>
                                 <td className="py-6">{new Date(t.createdAt).toLocaleString()}</td>
                                 <td>
                                    <span
                                       className={`${t.transactionStatus === "Pending" ? "border-2 border-[#f2c200] text-[#f2c200]" : t.transactionStatus === "Accepted" ? "border-2 border-[#1EDE25] text-[#1EDE25]" : "border-2 border-[#0D99FF] text-[#0D99FF]"} py-2 rounded-lg w-[10rem] block text-center`}
                                    >
                                       {t.transactionStatus}
                                    </span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            ) : (
               <span className=" text-center flex justify-center text-[2rem] my-5">No transactions recorded yet</span>
            )}
         </div>
      </Layout>
   );
};

export default ViewTransactions;
