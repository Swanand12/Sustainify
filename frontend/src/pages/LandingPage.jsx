import Layout from "@/components/Layout";
import React from "react";
import ParticlesComponent from "@/particles/particles";
import { motion } from "framer-motion";
import Testimonials from "./landingPageComponents/Testimonials";
import Services from "./landingPageComponents/Services";
import FAQs from "./landingPageComponents/FAQs";
import Footer from "./landingPageComponents/Footer";
import ContactUs from "./landingPageComponents/ContactUs";
import Team from "./landingPageComponents/Team";
// import Lenis from "lenis";
// import { useEffect } from "react";

const LandingPage = () => {
  // useEffect(() => {
  //   // Initialize Lenis
  //   const lenis = new Lenis({
  //     wrapper: document.getElementById("landing_page"),
  //   });
  //   console.log("swanand");

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // });

  return (
    <Layout>
      <div
        id="landing_page"
        className="Home text-black relative  font-[500]  bg-gradient-to-r from-[#002a50]  to-black dark:before:opacity-50 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-0 "
      >
        <div className="flex text-white ">
          <ParticlesComponent id="particles" />
          <div className="flex justify-center text-white py-[12rem] w-full ">
            <div className="flex w-[75%] flex-col gap-[2rem]">
              <motion.h1
                className="relative leading-[45px] text-[2.5rem] text-[#36d9c4]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                Be part of a world where energy belongs to everyone.
              </motion.h1>

              <motion.p
                className="relative font-[400]  text-lg mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              >
                Imagine a world where energy flows directly from rooftops to
                homes, from sunlight to socket—all within your community. At
                Sustainify, we make that world possible. With just a bid, you
                unlock clean, local energy shared by neighbors and powered by
                trust.
                {/* Whether you're a provider or a user, together we’re building an energy ecosystem that’s greener, fairer, and faster. Power up with us and transform how energy flows—simple, sustainable, and seamless. */}
              </motion.p>

              <motion.button
                type="button"
                className="relative px-4 text-[#36d9c4] border border-[#36d9c4] shadow-xl tracking-wider font-bold w-[10rem] py-3 rounded-full "
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
              >
                KNOW MORE
              </motion.button>
            </div>
          </div>
          <img
            className=" h-[90vh] ms-auto relative"
            src="/src/assets/tree.png"
            alt="tree-image"
          />
        </div>

        <div className="sticky bg-white dark:bg-[#0c0f17] dark:text-white">
          <Services />
          <div className="py-[7rem] px-[10rem]  flex gap-5 justify-center">
            <motion.div
              className="about-box2   shadow-md rounded-xl w-[90%] flex overflow-hidden gap-8 "
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <img
                className="w-[50%] rounded-br-[70%] "
                src="/src/assets/about-image.jpeg"
                alt="about-2-image"
              />
              <div className="flex flex-col ">
                <div className="p-8 pr-16 ">
                  <h1 className="text-[3rem] text-[#36d9c4]  mb-6">About us</h1>

                  <p className="font-[400] mb-12">
                    Sustainify is an innovative platform designed to transform
                    the energy landscape by connecting local energy producers
                    and consumers through a peer-to-peer bidding system. We
                    harness the power of blockchain technology to create a
                    transparent, secure, and efficient marketplace for renewable
                    energy, empowering communities to share their surplus energy
                    and access affordable clean power. At Sustainify, we believe
                    in a sustainable future where energy is not just consumed
                    but shared and valued.
                    <br />
                    <br />
                    Our platform fosters collaboration among neighbors, promotes
                    environmental stewardship, and drives economic resilience.
                    By bridging the gap between prosumers and consumers,
                    Sustainify is not just a service; it’s a movement toward a
                    cleaner, more interconnected world. Join us in redefining
                    energy access—where every bid helps power a greener
                    tomorrow!
                  </p>
                  {/* <button type="button" className=" py-3   bg-transparent text-[#36d9c4] border border-[#36d9c4] px-5 rounded-full flex items-center gap-2">
                              Join Us
                              <FiArrowUpRight className="text-lg" />
                           </button> */}
                </div>
              </div>
            </motion.div>
          </div>
          <Testimonials />
          <Team />
          <FAQs />
          <ContactUs />

          {/* <div className="py-[10rem] flex flex-col items-center gap-7">
                  <h1 className="last-section-1 text-3xl  text-[#36d9c4]">Subscribe Now to get started</h1>
                  <p className="last-section-2  text-center tracking-wider text-sm w-[600px]">
                     Subscribe now to start your journey with renewable energy. Access expert solutions, reduce your carbon footprint, and save on energy costs today!
                  </p>
                  <div className=" flex gap-3">
                     <input type="text" placeholder="Enter Email" className="last-section-3-1 placeholder-[#36d9c4] w-[300px] border border-[#36d9c4] bg-transparent  py-4 pl-6 rounded-full" />
                     <button type="button" className="last-section-3-2 py-3   bg-[#171717] text-[#36d9c4] border border-[#36d9c4] px-5 rounded-full flex items-center gap-2">
                        Subscribe
                        <FiArrowUpRight className="text-lg" />
                     </button>
                  </div>
               </div> */}

          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
