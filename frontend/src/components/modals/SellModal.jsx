import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setClosingTime } from "@/utils/ImportantFunctions";
import { useWallet } from "@/context/walletContext";

const SellModal = () => {
  const { auth } = useAuth();
  const { connectWallet } = useWallet();
  const [sellerAddress, setSellerAddress] = useState("");
  const [pricePerToken, setPricePerToken] = useState(null);
  const [energyTokensToSell, setEnergyTokensToSell] = useState(null);
  const [bidClosingTime, setBidClosingTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const sellEnergy = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: auth.token,
        },
      };

      const closingTime = new Date(bidClosingTime);

      const { data } = await axios.post(
        `${backend_url}/api/v1/bid/post-bid`,
        {
          sellerAddress,
          pricePerToken,
          energyTokensToSell,
          closingTime,
        },
        config
      );

      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        setSellerAddress("");
        setPricePerToken("");
        setEnergyTokensToSell("");
        setBidClosingTime("");

        navigate("/sustainify/bids");
      }
    } catch (error) {
      setLoading(false);
      if (!error.response.data.success) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Dialog className=" ">
      <DialogTrigger
        onClick={() => {
          !connectWallet &&
            toast.error("You have to connect your wallet first");
        }}
        className="py-[3px] font-[500]   rounded-full text-[#1EDE25] border-2 border-[#1EDE25]  w-[5rem]"
      >
        Sell
      </DialogTrigger>

      {connectWallet && (
        <DialogContent className=" font-[500] border-none px-10">
          <DialogHeader>
            <DialogTitle className="text-3xl text-[#1EDE25]  mb-5 ">
              Sell Energy
            </DialogTitle>
            <span className="text-[#de1e1e]  tracking-wide pl-1">{error}</span>
            <DialogDescription className="flex flex-col pb-4 pt-1 gap-4">
              <BarLoader
                color="#1EDE25"
                loading={loading}
                width="100%"
                height={3}
              />
              <div className="flex flex-col">
                <label className="text-[#a3a09c] pl-1  mb-2 text-lg">
                  Address
                </label>
                <input
                  type="text"
                  onChange={(e) => setSellerAddress(e.target.value)}
                  value={sellerAddress}
                  className="text-sm bg-[#f5f5f5] placeholder-[#939393] dark:bg-[#19202e] dark:text-white dark:border-none  py-2.5 px-4 border border-[#939393] focus:border-none focus:outline-none focus:ring-[1px]  focus:ring-[#1EDE25] rounded-lg"
                  placeholder="Your account address"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#a3a09c] pl-1  mb-2 text-lg">
                  Energy Tokens
                </label>
                <input
                  type="number"
                  onChange={(e) =>
                    setEnergyTokensToSell(parseFloat(e.target.value))
                  }
                  value={energyTokensToSell}
                  className="text-sm bg-[#f5f5f5] placeholder-[#939393] dark:bg-[#19202e] dark:text-white dark:border-none  py-2.5 px-4 border border-[#939393] focus:border-none focus:outline-none focus:ring-[1px]  focus:ring-[#1EDE25] rounded-lg"
                  placeholder="Enter energy tokens to sell"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#a3a09c] pl-1  mb-2 text-lg">
                  Bidding Price
                </label>
                <input
                  type="number"
                  onChange={(e) => setPricePerToken(parseFloat(e.target.value))}
                  value={pricePerToken}
                  className="text-sm bg-[#f5f5f5] placeholder-[#939393] dark:bg-[#19202e] dark:text-white dark:border-none  py-2.5 px-4 border border-[#939393] focus:border-none focus:outline-none focus:ring-[1px]  focus:ring-[#1EDE25] rounded-lg"
                  placeholder="Set initial bidding price"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#a3a09c] pl-1  mb-2 text-lg">
                  Bid Closing Time
                </label>
                <input
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  onChange={(e) => setClosingTime(e, setBidClosingTime)}
                  value={bidClosingTime}
                  className="text-sm bg-[#f5f5f5] appearance-none placeholder-[#939393] dark:bg-[#19202e] dark:text-white dark:border-none  py-2 px-3 border border-[#939393] focus:border-none focus:outline-none focus:ring-[1px]  focus:ring-[#1EDE25] rounded-lg"
                  placeholder="Set bid closing time"
                />
              </div>
              <button
                onClick={sellEnergy}
                className="text-lg rounded-lg hover:opacity-90 text-black  mt-8 py-2 text-white bg-[#1EDE25] text-center tracking-wide"
              >
                Sell Energy
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default SellModal;
