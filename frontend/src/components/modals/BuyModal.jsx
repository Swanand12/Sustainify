import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";
import { BarLoader } from "react-spinners";

const BuyModal = ({
  fetchBidsAgain,
  setFetchBidsAgain,
  energyTokensToSell,
  id,
}) => {
  const [buyerAddress, setBuyerAdress] = useState("");
  const [updatedPricePerToken, setUpdatedPricePerToken] = useState("");
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth } = useAuth();

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  console.log("wallet", wallet);

  const placeBid = async () => {
    try {
      if (updatedPricePerToken * energyTokensToSell > wallet.accountBalance) {
        setError(
          `Insufficient funds. You need ₹${
            updatedPricePerToken * energyTokensToSell - wallet.accountBalance
          } more to place this bid.`
        );
        return;
      }

      setLoading(true);

      const config = {
        headers: {
          Authorization: auth.token,
        },
      };

      const { data } = await axios.post(
        `${backend_url}/api/v1/bid/update-bid-transaction`,
        {
          buyerAddress,
          pricePerToken: updatedPricePerToken,
          energyTokensToSell,
          id,
        },
        config
      );

      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        setFetchBidsAgain(!fetchBidsAgain);
        setBuyerAdress("");
        setUpdatedPricePerToken("");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  //  fetching wallet info when component mounts
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const config = {
          headers: {
            Authorization: auth.token,
          },
        };

        const { data } = await axios.get(
          `${backend_url}/api/v1/wallet/get-wallet`,
          config
        );

        if (data.success) {
          setWallet(data.wallet);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWallet();
  }, []);
  console.log(typeof updatedPricePerToken);
  return (
    <Dialog className="">
      <DialogTrigger className="flex items-center bg-[#42cdf8] py-2.5 mt-6  w-[15rem] mb-4 rounded-lg  justify-center  text-white ">
        Place Your Bid
      </DialogTrigger>
      <DialogContent className="font-[500] border-none px-10">
        <DialogHeader>
          <DialogTitle className="text-3xl text-[#42cdf8] mb-3  ">
            Buy Energy
          </DialogTitle>
          <span className="text-[#de1e1e]  tracking-wide pl-1">{error}</span>
          <DialogDescription className="flex flex-col pb-4 pt-1 gap-4">
            <BarLoader
              color="#42cdf8"
              loading={loading}
              width="100%"
              height={3}
            />
            <div className="flex flex-col">
              <label className="text-[#939393] pl-1 mb-2 text-lg">
                Address
              </label>
              <input
                type="text"
                onChange={(e) => setBuyerAdress(e.target.value)}
                value={buyerAddress}
                className="text-sm bg-[#f5f5f5] dark:bg-[#19202e] dark:text-white dark:border-none placeholder-[#939393]  py-2.5 px-4 border border-[#939393] focus:border-none focus:outline-none focus:ring-[1px]  focus:ring-[#42cdf8] rounded-lg"
                placeholder="Your account address"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#939393] pl-1 mb-2 text-lg">
                Bidding Amount
              </label>
              <input
                type="number"
                onChange={(e) =>
                  setUpdatedPricePerToken(parseFloat(e.target.value))
                }
                value={updatedPricePerToken}
                className="text-sm bg-[#f5f5f5] dark:bg-[#19202e] dark:text-white dark:border-none placeholder-[#939393]  py-2.5 px-4 border border-[#939393] focus:border-none focus:outline-none focus:ring-[1px]  focus:ring-[#42cdf8] rounded-lg"
                placeholder="Set your bidding price"
              />
            </div>
            <button
              onClick={placeBid}
              className="text-lg rounded-lg hover:opacity-90 text-black py-2 mt-6 text-white bg-[#42cdf8] text-center tracking-wide"
            >
              Buy Energy
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BuyModal;
