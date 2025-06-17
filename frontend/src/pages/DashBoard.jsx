import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { useWallet } from "@/context/walletContext";
import { FaWallet } from "react-icons/fa6";
import { ethers } from "ethers";
import abi from "../contractJson/Transactions.json";
import WallteRecharge from "@/components/modals/WallteRecharge";

const DashBoard = () => {
  const [wallet, setWallet] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { auth } = useAuth();
  const { connectWallet, setConnectWallet, walletState, setWalletState } =
    useWallet();
  const ref = useRef();
  console.log("wallet", walletState.contract);
  console.log("conne", connectWallet.accountAddress);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const connect = async () => {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;

      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(account[0]);

      window.ethereum.on("accountsChanged", () => {
        connect();
      });
      setConnectWallet({ status: true, accountAddress: account[0] });
      console.log("Ethers:", ethers);
      console.log("Ethereum object:", window.ethereum);
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log("cont", contract);

      setWalletState({ provider, signer, contract });
    } catch (error) {
      console.log(error);
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

  //  fetching user transactions history
  useEffect(() => {
    const fetchUserTransactionHistory = async () => {
      const { contract } = walletState;
      console.log("con", contract);
      if (!walletState.contract) {
        console.error("Contract is undefined");
        return;
      }

      const transaction = await contract.getUserTransactions(
        connectWallet.accountAddress
      );

      console.log("transa", transaction);
      const formattedTransactions = transaction.map((tx, index) => ({
        id: index + 1,
        seller: tx[0],
        buyer: tx[1],
        amount: ethers.formatEther(tx[2].toString()), // Convert wei to ETH
        tokens: tx[3].toString(),
        timestamp: new Date(Number(tx[4]) * 1000).toLocaleString(), // Convert UNIX timestamp to readable date
      }));
      console.log(transaction);

      setTransactions(formattedTransactions);
    };

    fetchUserTransactionHistory();
  }, [walletState.contract, connectWallet.accountAddress]);

  // copy address to clipboard
  const copyAddress = () => {
    const address = ref.current.innerText;
    navigator.clipboard.writeText(address);
    setIsCopied(true);
  };

  return (
    <Layout>
      <div className="px-10  font-[500] min-h-[100vh]  text-black bg-[#f5f5f5] dark:bg-[#0c0f17] dark:text-white">
        <div className="flex items-center justify-between">
          <div className="flex flex-col  pt-6  pb-3 gap-1">
            <h1 className="  pl-4 text-2xl mb-3 flex items-center gap-4 ">
              <FaWallet /> My Wallet
            </h1>

            {connectWallet.status && (
              <div className="flex pl-4">
                <span
                  ref={ref}
                  className={`${
                    isCopied ? "text-[#7ff45f]" : "text-[#6aa4e3]"
                  } text-[1rem] `}
                >
                  {connectWallet.accountAddress}
                </span>
                <button className="ml-2 " type="button" onClick={copyAddress}>
                  {isCopied ? (
                    <TbCopyCheckFilled className="text-[1.1rem] text-[#7ff45f]" />
                  ) : (
                    <TbCopy className="text-[1.1rem] text-[#6aa4e3]" />
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-6 pr-4">
            <WallteRecharge />
            {connectWallet.status ? (
              <p className="border-2 border-[#1EDE25] text-[#1EDE25] bg-[#1EDE25] text-white duration-300 px-3 py-1.5 rounded-lg flex gap-2 items-center">
                Connected
                <FaCheckCircle />{" "}
              </p>
            ) : (
              <>
                <button
                  type="button"
                  onClick={connect}
                  className="border-2 border-[#1EDE25] text-[#1EDE25] hover:bg-[#1EDE25] hover:text-white duration-300 px-3 py-1.5 rounded-lg flex gap-2 items-center"
                >
                  <FiLink />
                  Connect Wallet
                </button>
              </>
            )}
          </div>
        </div>

        <div className="px-4 pt-4 pb-8 flex gap-5 justify-between">
          <div className="relative hover:scale-[105%] duration-300 shadow-2xl py-14 text-[#FFFFFF] overflow-hidden w-[330px] min-w-[250px]  rounded-xl  flex flex-col justify-center gap-4 pl-10 bg-gradient-to-r from-[#c693f8] to-[#a85ff4] dark:bg-[#19202e] ">
            <h1 className="text-6xl ">
              {wallet.length !== 0 ? wallet?.availableEnergyTokens : "0"}
            </h1>

            <h3 className="text-xl">Energy tokens</h3>
            <div className="circle-1 absolute bg-[#c693f8] w-[9rem] h-[9rem] bg-opacity-50 top-2 -right-[4rem] rounded-full"></div>
            <div className="circle-2 absolute bg-[#c693f8] w-[9rem] h-[9rem] bg-opacity-50 -bottom-[0.5rem] -right-[1rem] rounded-full"></div>
          </div>

          <div className="relative hover:scale-[105%] duration-300 shadow-2xl py-14 text-[#FFFFFF] overflow-hidden w-[330px] min-w-[250px]  rounded-xl  flex flex-col justify-center gap-4 pl-10 bg-gradient-to-r from-[#6aa4e3] to-[#6564e7] dark:bg-[#19202e] ">
            <h1 className="text-6xl ">
              {wallet.length !== 0 ? wallet?.availableEnergyTokens : "0"}
            </h1>

            <h3 className="text-xl relative z-10">Excess Energy (units)</h3>
            <div className="circle-1 absolute bg-[#6aa4e3] w-[9rem] h-[9rem] bg-opacity-50 z-0 top-2 -right-[4rem] rounded-full"></div>
            <div className="circle-2 absolute bg-[#6aa4e3] w-[9rem] h-[9rem] bg-opacity-50 z-0 -bottom-[0.5rem] -right-[1rem] rounded-full"></div>
          </div>

          <div className="relative hover:scale-[105%] duration-300 shadow-2xl py-14 text-[#FFFFFF] overflow-hidden w-[330px] min-w-[250px]  rounded-xl  flex flex-col justify-center gap-4 pl-10 bg-gradient-to-r from-[#7ff45f] to-[#48d748] dark:bg-[#19202e] ">
            <h1 className="text-6xl ">
              {wallet.length !== 0 ? wallet.accountBalance : "0"}
            </h1>

            <h3 className="text-xl">Wallet Balance (₹)</h3>
            <div className="circle-1 absolute bg-[#7ff45f] w-[9rem] h-[9rem] bg-opacity-50 top-2 -right-[4rem] rounded-full"></div>
            <div className="circle-2 absolute bg-[#7ff45f] w-[9rem] h-[9rem] bg-opacity-50 -bottom-[0.5rem] -right-[1rem] rounded-full"></div>
          </div>
        </div>

        {transactions.length > 0 ? (
          <div className="px-4 py-5">
            <div className="bg-white  dark:bg-[#19202e] shadow-2xl rounded-[1.5rem] px-10 pb-4 mb-8">
              <h1 className=" text-2xl pt-6 pb-2 bg-white dark:bg-[#19202e] ">
                Latest Transactions
              </h1>
              <table className="w-full table-auto ml-1 bg-white dark:bg-[#19202e]">
                <thead className="  ">
                  <tr className="">
                    <td className="py-4 pr-6  tracking-wide">Sr No</td>
                    <td className="py-4 pr-6  tracking-wide">Seller</td>
                    <td className="py-4 pr-6  tracking-wide">Buyer</td>
                    <td className="py-4 pr-6  tracking-wide">Amount</td>
                    <td className="py-4 pr-6  tracking-wide">Tokens</td>
                    <td className="py-4 pr-6  tracking-wide">
                      Transaction Date
                    </td>
                  </tr>
                </thead>
                <tbody className="py-2  text-[#939393] w-full">
                  {transactions.reverse().map((t) => (
                    <>
                      <tr key={t.id} className="text-sm  py-6  ">
                        <td className="py-6 pl-1">{t.id}</td>
                        <td className="py-6 pl-1">{t.seller}</td>
                        <td className="py-6">{t.buyer}</td>
                        <td className="py-6 px-4">{t.amount}</td>
                        <td className="py-6 px-6">{t.tokens}</td>
                        <td className="py-6">{t.timestamp}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : connectWallet.status ? (
          <span className=" text-center flex justify-center text-[2rem] my-10">
            No transactions recorded yet
          </span>
        ) : (
          <span className=" text-center flex justify-center text-[2rem] my-10">
            Connect your wallet to view transactions
          </span>
        )}
      </div>
    </Layout>
  );
};

export default DashBoard;
