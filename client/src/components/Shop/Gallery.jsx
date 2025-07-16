/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  "/shop1.webp",
  "/shop2.webp",
  "/shop1.webp",
  "/shop2.webp",
  "/shop1.webp",
  "/shop2.webp",
  "/shop1.webp",
  "/shop2.webp",
  "/shop1.webp",
  "/shop2.webp",
  "/shop1.webp",
  "/shop2.webp",
];

export default function GallerySection() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="w-full px-4 py-12 text-center bg-white">
      <h2 className="mb-8 text-3xl font-bold">Gallery</h2>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
        modules={[Navigation, Autoplay]}
        className="w-full "
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[24rem] overflow-hidden shadow-lg group">
              <img
                src={src}
                alt={`Gallery ${index}`}
                className="w-full h-auto"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/50"
                onClick={() => setSelectedImg(src)}
              >
                <div className="flex items-center justify-center w-12 h-12 text-white rounded-full">
                  <MdRemoveRedEye size={16} />
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-4xl p-4">
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute z-50 text-3xl text-white top-4 right-4"
              >
                <IoClose />
              </button>
              <motion.img
                src={selectedImg}
                alt="Preview"
                className="w-full h-[40rem] object-contain rounded-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
