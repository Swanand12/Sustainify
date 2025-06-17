import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FaStar } from "react-icons/fa6";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "John Doe",
      imagePath: "/src/assets/john.jpg",
      expertise: "Web Designer",
      review:
        "Our platform offers expert consultation and comprehensive energy audits to optimize energy production & consumption. Our team of specialists helps producers and consumers maximize efficiency by assessing solar panel performance & energy usage patterns.",
    },
    {
      name: "Robert yen",
      imagePath: "/src/assets/robert.jpeg",
      expertise: "Full Stack Developer",
      review:
        "Our platform offers expert consultation and comprehensive energy audits to optimize energy production & consumption. Our team of specialists helps producers and consumers maximize efficiency by assessing solar panel performance & energy usage patterns.",
    },
    {
      name: "Karen Dsouza",
      imagePath: "/src/assets/karen.webp",
      expertise: "Blockchain Expert",
      review:
        "Our platform offers expert consultation and comprehensive energy audits to optimize energy production & consumption. Our team of specialists helps producers and consumers maximize efficiency by assessing solar panel performance & energy usage patterns.",
    },
    {
      name: "Alex Jenner",
      imagePath: "/src/assets/alex.jpg",
      expertise: "Machinery Expert",
      review:
        "Our platform offers expert consultation and comprehensive energy audits to optimize energy production & consumption. Our team of specialists helps producers and consumers maximize efficiency by assessing solar panel performance & energy usage patterns.",
    },
    {
      name: "John Doe",
      imagePath: "/src/assets/john.jpg",
      expertise: "Web Designer",
      review:
        "Our platform offers expert consultation and comprehensive energy audits to optimize energy production & consumption. Our team of specialists helps producers and consumers maximize efficiency by assessing solar panel performance & energy usage patterns.",
    },
    {
      name: "John Doe",
      imagePath: "/src/assets/john.jpg",
      expertise: "Web Designer",
      review:
        "Our platform offers expert consultation and comprehensive energy audits to optimize energy production & consumption. Our team of specialists helps producers and consumers maximize efficiency by assessing solar panel performance & energy usage patterns.",
    },
  ];

  return (
    <div className="flex flex-col items-center font-[400]   p-[10rem]">
      <motion.div
        className="mb-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 1.0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-[3rem] text-[#42cdf8]  mb-4  tracking-wide">
          Testimonials
        </h1>
      </motion.div>
      <motion.div
        className="w-full "
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent className="py-10">
            {testimonialsData.map((t, i) => (
              <CarouselItem key={i} className=" basis-1/3">
                <div className="w-[350px]  dark:bg-[#19202e] mx-auto py-10 px-8 shadow-lg  rounded-xl  text-center ">
                  <div className="flex  mb-10 items-center">
                    <img
                      className="rounded-full hover:scale-[110%] duration-300 h-[6rem] w-[6rem] object-cover "
                      src={t.imagePath}
                      alt={`${t.name}-image}]`}
                    />
                    <div className="flex ml-10  text-start flex-col">
                      <h1 className="text-xl text-[#42cdf8] font-[500] mb-1">
                        {t.name}
                      </h1>
                      <p className="text-gray-400 mb-2">{t.expertise}</p>
                      <div className="flex text-yellow-400 text-lg">
                        {[1, 2, 3, 4, 5].map((_) => (
                          <FaStar />
                        ))}
                      </div>
                    </div>
                  </div>
                  <i className=" tracking-wide text-sm">{t.review}</i>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </div>
  );
};

export default Testimonials;
