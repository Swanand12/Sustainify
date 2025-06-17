import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const FAQs = () => {
  const faqsdata = [
    {
      question: "What is Sustainify, and how does it work?",
      answer:
        "Sustainify is a sustainable infrastructure platform for decentralized green energy trading using blockchain technology. It allows users to buy and sell excess solar energy directly with others through a secure peer-to-peer network, ensuring efficient, transparent transactions without a centralized authority.",
    },
    {
      question: "What is Sustainify, and how does it work?",
      answer:
        "Sustainify is a sustainable infrastructure platform for decentralized green energy trading using blockchain technology. It allows users to buy and sell excess solar energy directly with others through a secure peer-to-peer network, ensuring efficient, transparent transactions without a centralized authority.",
    },
    {
      question: "What is Sustainify, and how does it work?",
      answer:
        "Sustainify is a sustainable infrastructure platform for decentralized green energy trading using blockchain technology. It allows users to buy and sell excess solar energy directly with others through a secure peer-to-peer network, ensuring efficient, transparent transactions without a centralized authority.",
    },
    {
      question: "What is Sustainify, and how does it work?",
      answer:
        "Sustainify is a sustainable infrastructure platform for decentralized green energy trading using blockchain technology. It allows users to buy and sell excess solar energy directly with others through a secure peer-to-peer network, ensuring efficient, transparent transactions without a centralized authority.",
    },
    {
      question: "What is Sustainify, and how does it work?",
      answer:
        "Sustainify is a sustainable infrastructure platform for decentralized green energy trading using blockchain technology. It allows users to buy and sell excess solar energy directly with others through a secure peer-to-peer network, ensuring efficient, transparent transactions without a centralized authority.",
    },
  ];
  return (
    <div className="py-[10rem] px-[10rem] ">
      <motion.div
        className="mb-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 1.0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-[3rem] text-[#42cdf8] font-[400]  mb-8  tracking-wide">
          FAQ's
        </h1>
      </motion.div>
      <motion.div
        className=" flex flex-col gap-6"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
      >
        {faqsdata.map((f, i) => (
          <Accordion
            className="bg-[#f8f8f8] dark:bg-[#19202e] rounded-lg  "
            key={i}
            type="single"
            collapsible
          >
            <AccordionItem
              className="accordion   mx-10  rounded-lg "
              value={`item-${i}`}
            >
              <AccordionTrigger className="accordion-trigger bg-[#f8f8f8]  dark:bg-[#19202e] text-lg font-[400]  text-[#42cdf8]">
                <p className="flex items-center gap-4">
                  <FaCircleArrowRight />
                  {f.question}
                </p>
              </AccordionTrigger>
              <AccordionContent className=" bg-[#f8f8f8]  dark:bg-[#19202e] pt-4 font-normal">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </motion.div>
    </div>
  );
};

export default FAQs;
