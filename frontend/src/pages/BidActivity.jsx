import { useAuth } from "@/context/authContext";
import { getDateTime } from "@/utils/ImportantFunctions";
import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { FaClipboardList } from "react-icons/fa";

const BidActivity = () => {
  const [myBids, setMyBids] = useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const fetchMyBids = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: auth.token,
        },
      };

      const { data } = await axios.get(
        `${backend_url}/api/v1/bid/get-user-bid`,
        config
      );

      if (data.success) {
        setMyBids(data.bid);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyBids();
  }, []);

  return (
    <Layout>
      <div className="px-10 font-[500] bg-[#f5f5f5] text-black dark:bg-[#0c0f17] dark:text-white min-h-[100vh]">
        <h1 className="px-2 py-6  text-2xl flex items-center gap-3 ">
          <FaClipboardList /> Bid Activity
        </h1>
        <BarLoader
          color="#ffde06e2"
          loading={loading}
          width="100%"
          height={5}
        />
        <div className="justify-center py-8 flex flex-wrap text-[#333333]  gap-12">
          {myBids.length > 0 &&
            myBids.map((b) => (
              <div
                key={b._id}
                className="card bg-white dark:bg-[#19202e] w-[320px] shadow-xl hover:scale-[105%] duration-300 rounded-xl py-6  flex flex-col justify-center items-center"
              >
                <div className="text-[#a3a09c]">
                  {b.seller === auth.user._id ? (
                    <span className="text-[#1EDE25]  mb-2 block text-lg">
                      Seller
                    </span>
                  ) : (
                    <span className="text-[#42cdf8]  mb-2 block text-lg">
                      Buyer
                    </span>
                  )}
                  <h3 className="  py-3 ">Total cost: {b.totalCost}</h3>
                  <h3 className="  py-3 ">
                    Price per unit energy: {b.pricePerToken}
                  </h3>
                  <h3 className="  py-3 ">
                    Energy units: {b.energyTokensToSell}
                  </h3>
                  <h3 className="   py-3 ">
                    Seller: {b?.sellerAddress?.substring(0, 20)}...
                  </h3>
                  <h3 className="py-3 ">
                    Buyer:{" "}
                    {b.buyerAddress &&
                      b?.buyerAddress?.substring(0, 20) + "..."}
                  </h3>
                  {b.isAccepted && (
                    <h3 className="text-[#de1e1e] my-1">
                      bid closed at {getDateTime(b.updatedAt)}
                    </h3>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigate(`${b._id}`);
                  }}
                  className=" flex items-center bg-[#ffde06e2] py-2.5 mt-5  w-[15rem] mb-4 rounded-lg justify-center  text-white "
                >
                  View Placed Bids
                </button>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default BidActivity;
