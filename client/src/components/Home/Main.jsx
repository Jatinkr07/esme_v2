/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const MainSection = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slideData = [
    {
      image: "/maino.jpg",
      text: "SUMMER BREEZE, ABAYA EASE",
      subText: "New Collection Out Now",
      buttonText: "SHOP NOW",
    },
    {
      image: "/mainn.jpg",
      text: "SUMMER BREEZE, ABAYA EASE 2",
      subText: "New Collection Out Now",
      buttonText: "SHOP NOW",
    },
  ];

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
      swiperRef.current.swiper.on("slideChange", () => {
        setActiveIndex(swiperRef.current.swiper.realIndex);
      });
    }
  }, []);

  const progressCircleStyle = (index) => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: activeIndex === index ? "#4B5563" : "#D1D5DB",
    transition: "background-color 0.3s",
    display: "inline-block",
    margin: "0 5px",
  });

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          prevEl: ".prev",
          nextEl: ".next",
        }}
        loop={true}
        className="w-full h-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <motion.div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${slide.image})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <div className="absolute inset-0 flex items-center justify-start pl-10 text-white bg-black bg-opacity-50">
              <div className="mx-12">
                <motion.h1
                  className="text-5xl font-[400] tracking-wide text-white font-narin"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  {slide.text}
                </motion.h1>
                <motion.p
                  className="text-xl text-white pt-14 font-narin font-[400]"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1 }}
                >
                  {slide.subText}
                </motion.p>
                <motion.button
                  className="px-6 py-3 mt-6 text-black rounded bg-[#F4F2EA]"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 1 }}
                >
                  {slide.buttonText}
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="absolute z-10 p-2 text-3xl text-black transform -translate-y-1/2 prev left-5 top-1/2">
        <IoIosArrowBack />
      </button>
      <button className="absolute z-10 p-2 text-3xl text-black transform -translate-y-1/2 next right-5 top-1/2">
        <IoIosArrowForward />
      </button>
      {/* Circular Navigation Progress */}
      <div className="absolute z-10 flex space-x-2 transform -translate-x-1/2 bottom-5 left-1/2">
        {slideData.map((_, index) => (
          <div key={index} style={progressCircleStyle(index)} />
        ))}
      </div>
    </section>
  );
};

export default MainSection;
