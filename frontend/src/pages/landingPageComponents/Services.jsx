import React from "react";
import { motion } from "framer-motion";
import { TbTransfer } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { GiSolarPower } from "react-icons/gi";
import { MdSupportAgent } from "react-icons/md";
import { MdElectricalServices } from "react-icons/md";
import { TbTransactionRupee } from "react-icons/tb";

const Services = () => {
  const servicesData = [
    {
      icon: <TbTransfer className="text-[4rem]" />,
      title: "P-2-P Energy Bidding",
      content:
        "Empower your energy choices with our revolutionary peer-to-peer bidding system. Sustainify connects local energy producers with consumers in a dynamic marketplace where surplus energy can be sold, fostering a sense of community and ensuring that clean, renewable power is just a bid away.",
      delay: 0,
    },
    {
      icon: <IoMdTime className="text-[4rem]" />,
      title: "Real-Time Energy Monitoring",
      content:
        "Stay ahead of your energy game with real-time monitoring. Our intuitive dashboard provides live updates on your energy production and consumption, enabling you to track performance, identify trends, and optimize your usage for maximum efficiency. Knowledge is power—literally!",
      delay: 0.4,
    },
    {
      icon: <GiSolarPower className="text-[4rem]" />,
      title: "Solar Panel Installation Support",
      content:
        "Embark on your renewable energy journey with confidence! Sustainify offers guidance and support for the installation of solar panels, connecting you with trusted local installers. Our team provides you with the resources needed to choose the right solar solution for your home, maximising your energy independence and sustainability.",
      delay: 0.8,
    },
    {
      icon: <MdElectricalServices className="text-[4rem]" />,
      title: "Seamless Integration",
      content:
        "Integrate Sustainify effortlessly with your existing home energy systems and infrastructure grid. Our platform connects with various devices and technologies, enabling easy optimization of energy flow. Enjoy real-time insights, automate energy management, and engage with local peers, making renewable energy adoption smooth and efficient for a sustainable future.",
      delay: 0,
    },
    {
      icon: <TbTransactionRupee className="text-[4rem]" />,
      title: "Secured Transactions",
      content:
        "Experience peace of mind with our blockchain-secured transactions. Every energy bid and sale is traceable and tamper-proof, ensuring complete transparency and trust within the Sustainify marketplace. Your energy transactions are safe with us",
      delay: 0.4,
    },
    {
      icon: <MdSupportAgent className="text-[4rem]" />,
      title: "Dedicated Customer Support",
      content:
        "Were here for you! Our customer support team is committed to providing assistance and guidance at every step of your Sustainify journey. Whether you have technical questions, need help with transactions, or want to learn more about our platform, we’re just a message away!",
      delay: 0.8,
    },
  ];

  return (
    <div className="flex flex-col font-[400]   py-[4rem] px-[8rem]">
      <motion.div
        className="mb-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 1.0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-[3rem] text-[#42cdf8]  mb-2  tracking-wide">
          Why choose us
        </h1>
        <p className=" w-[60%]  text-center">
          Sustainify enables secure, peer-to-peer green energy bidding through
          blockchain, offering efficient energy bidding, transactions, and
          direct consumer-prosumer exchanges for a sustainable, cost-effective
          future.
        </p>
      </motion.div>
      <div className=" flex gap-[1rem] mt-6  flex-wrap justify-center">
        {servicesData.map((s, i) => (
          <motion.div
            key={i}
            className=" dark:bg-[#19202e] py-6 px-8 rounded-xl  text-center shadow-lg w-[400px]"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: s.delay, ease: "easeOut" }}
          >
            <div className="flex flex-col  text-[#42cdf8] items-center gap-6 my-5">
              {s.icon}
              <h1 className="text-[1.5rem]   ">{s.title}</h1>
            </div>
            <p className="text-sm font-normal">{s.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
