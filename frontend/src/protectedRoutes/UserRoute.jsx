import { useAuth } from "@/context/authContext";
import { useWallet } from "@/context/walletContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { FadeLoader, RingLoader } from "react-spinners";

const UserRoute = () => {
  const { auth } = useAuth();
  const [ok, setOk] = useState(false);
  const { setWalletState, setConnectWallet } = useWallet();
  const navigate = useNavigate();

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkAuth = async () => {
      const config = {
        headers: {
          Authorization: auth.token,
        },
      };

      const { data } = await axios.get(
        `${backend_url}/api/v1/auth/user-auth`,
        config
      );

      if (data) {
        setOk(data.ok);
      }
    };

    if (auth.token) {
      checkAuth();
    }
  }, [auth.token]);

  //   useEffect(() => {
  //     if (!ok) {
  //       var timer = setTimeout(() => {
  //         navigate("/auth");
  //         toast.error("You need to be logged in to continue");
  //       }, 3000);
  //     }

  //     return () => clearTimeout(timer);
  //   }, [ok]);

  useEffect(() => {
    return () => {
      setWalletState({
        provider: null,
        signer: null,
        contract: null,
      });
      setConnectWallet({
        status: false,
        accountAddress: null,
      });
    };
  }, []);

  return ok ? (
    <Outlet />
  ) : (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <FadeLoader loading={true} color="#1EDE25" />
    </div>
  );
};

export default UserRoute;
