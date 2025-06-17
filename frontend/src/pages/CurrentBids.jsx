import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import BuyModal from "@/components/modals/BuyModal";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { getTime } from "@/utils/ImportantFunctions";
import { BarLoader } from "react-spinners";
import { LuSearch } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";

const CurrentBids = () => {
  const [bids, setbids] = useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetchBidsAgain, setFetchBidsAgain] = useState(false);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const fetchBids = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: auth.token,
        },
      };

      const { data } = await axios.get(
        `${backend_url}/api/v1/bid/get-all-bid`,
        config
      );

      if (data.success) {
        setbids(data.bid);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBids();
  }, [fetchBidsAgain]);

  const handleSearchUnits = async (searchUnits) => {
    try {
      const config = {
        headers: {
          Authorization: auth.token,
        },
      };

      const { data } = await axios.post(
        `${backend_url}/api/v1/bid/filter-bids`,
        { searchUnits },
        config
      );

      if (data.success) {
        setbids(data.bids);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="px-10 bg-[#f5f5f5] font-[500] text-black dark:bg-[#0c0f17] dark:text-white min-h-[100vh]">
        <h1 className="px-2 py-6  text-2xl flex items-center gap-3 ">
          <FaArrowTrendUp /> Current Bids
        </h1>
        <BarLoader color="#0D99FF" loading={loading} width="100%" height={5} />
        {!loading && (
          <>
            <div className="flex  justify-center mt-6 mb-4">
              <div className="w-1/2 relative flex items-center">
                <LuSearch
                  strokeWidth="3"
                  className=" text-[#a4a4a4] ml-6 font-bold text-lg absolute"
                />
                <input
                  type="number"
                  onChange={(e) => handleSearchUnits(e.target.value)}
                  className=" w-full py-3 px-16 bg-[#f5f5f5] dark:bg-[#19202e]  shadow placeholder-[#a4a4a4] focus:border-none focus:outline-none focus:bg-white rounded-full"
                  placeholder="Search by Energy units... "
                />
              </div>
            </div>
            <div className="justify-center py-8 flex flex-wrap text-[#333333]  gap-12">
              {bids &&
                bids.map(
                  (b) =>
                    !b?.isAccepted && (
                      <div
                        key={b._id}
                        className="card dark:bg-[#19202e]  w-[320px] bg-white  hover:scale-[105%] duration-300  shadow-2xl rounded-xl py-6  flex flex-col items-center"
                      >
                        <div className="text-[#a3a09c]">
                          <h3 className="  py-3 ">Total cost: {b.totalCost}</h3>
                          <h3 className="  py-3 ">
                            Price per unit energy: {b.pricePerToken}
                          </h3>
                          <h3 className="  py-3 ">
                            Energy units: {b.energyTokensToSell}
                          </h3>
                          <h3 className="   py-3 ">
                            Seller: {b?.sellerAddress?.substring(0, 23)}...
                          </h3>
                          <h3 className=" mb-1 py-3 ">
                            Buyer:{" "}
                            {b.buyerAddress &&
                              b?.buyerAddress?.substring(0, 23) + "..."}
                          </h3>
                          <span className="text-[#de1e1e]">
                            Hurry up! bid will close at{" "}
                            {getTime(b.bidClosingTime)}
                          </span>
                        </div>
                        <BuyModal
                          fetchBidsAgain={fetchBidsAgain}
                          setFetchBidsAgain={setFetchBidsAgain}
                          energyTokensToSell={b.energyTokensToSell}
                          id={b._id}
                        />
                      </div>
                    )
                )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CurrentBids;
