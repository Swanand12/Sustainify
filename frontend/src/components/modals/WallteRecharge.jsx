import React from "react";
import { FiLink } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WallteRecharge = () => {
  const rechargeWallet = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-2 border-[#6564e7] bg-transparent text-[#6564e7] hover:bg-[#6564e7] hover:text-white duration-300 px-3 py-1.5 rounded-lg flex gap-2 items-center">
          <FiLink /> Wallet Recharge
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl text-[#6564e7]  mb-5 ">
            Wallet Recharge
          </DialogTitle>
        </DialogHeader>
        <button
          onClick={rechargeWallet}
          className="text-lg rounded-lg hover:opacity-90 text-black  mt-8 py-2 text-white bg-[#6564e7] text-center tracking-wide"
        >
          Proceed
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default WallteRecharge;
