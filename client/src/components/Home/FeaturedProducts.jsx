/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  FiHeart,
  FiShoppingCart,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCart } from "../../context/CartContext";

const FeaturedProducts = () => {
  const [favorites, setFavorites] = useState({});
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: "TWO PIECE OPEN ABAYA WITH SLIP",
      subtitle: "MINT",
      price: "£56.00",
      image1: "/shop1.webp",
      image2: "/shop2.webp",
      colors: [
        "#000000",
        "#4A5568",
        "#2D3748",
        "#553C9A",
        "#744210",
        "#2F855A",
      ],
      isNew: true,
    },
    {
      id: 2,
      name: "TWO PIECE OPEN ABAYA WITH SLIP",
      subtitle: "OLIVE GREEN",
      price: "£56.00",
      image1: "/shop1.webp",
      image2: "/shop2.webp",
      colors: [
        "#553C9A",
        "#000000",
        "#2D3748",
        "#744210",
        "#2F855A",
        "#4A5568",
      ],
      isNew: true,
    },
    {
      id: 3,
      name: "TWO PIECE OPEN ABAYA WITH SLIP",
      subtitle: "WHITE",
      price: "£56.00",
      image1: "/shop1.webp",
      image2: "/shop2.webp",
      colors: [
        "#000000",
        "#4A5568",
        "#2D3748",
        "#553C9A",
        "#744210",
        "#2F855A",
      ],
      isNew: true,
    },
    {
      id: 4,
      name: "GIRLS TWO PIECE OPEN ABAYA WITH",
      subtitle: "SLIP WHITE",
      price: "£45.00",
      image1: "/shop1.webp",
      image2: "/shop2.webp",
      colors: ["#000000", "#2D3748", "#E53E3E", "#C53030"],
      isNew: true,
    },
    {
      id: 5,
      name: "GIRLS TWO PIECE OPEN ABAYA",
      subtitle: "SLIP TEA PINK",
      price: "£45.00",
      image1: "/shop1.webp",
      image2: "/shop2.webp",
      colors: ["#000000", "#4A5568", "#E53E3E", "#C53030"],
      isNew: true,
    },
    {
      id: 6,
      name: "TWO PIECE OPEN ABAYA WITH SLIP",
      subtitle: "WHITE",
      price: "£56.00",
      image1: "/shop1.webp",
      image2: "/shop2.webp",
      colors: [
        "#000000",
        "#4A5568",
        "#2D3748",
        "#553C9A",
        "#744210",
        "#2F855A",
      ],
      isNew: true,
    },
    {
      id: 7,
      name: "GIRLS TWO PIECE OPEN ABAYA WITH",
      subtitle: "SLIP WHITE",
      price: "£45.00",
      image1: "/shop1.webp",
      image2: "/shop2.webp",
      colors: ["#000000", "#2D3748", "#E53E3E", "#C53030"],
      isNew: true,
    },
    {
      id: 8,
      name: "GIRLS TWO PIECE OPEN ABAYA",
      subtitle: "SLIP TEA PINK",
      price: "£45.00",
      image1: "/shop1.webp",
      image2: "/shop2.webp",
      colors: ["#000000", "#4A5568", "#E53E3E", "#C53030"],
      isNew: true,
    },
  ];

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="relative cursor-pointer w-[250px] mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full h-[400px] overflow-hidden bg-gray-100 rounded-lg">
          {product.isNew && (
            <motion.div
              className="absolute z-10 px-3 py-1 text-xs font-medium text-gray-700 bg-white rounded-full shadow top-4 left-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              NEW IN
            </motion.div>
          )}

          <motion.button
            className="absolute z-10 p-2 rounded-full shadow top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => toggleFavorite(product.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiHeart
              className={`text-lg ${
                favorites[product.id]
                  ? "text-red-500 fill-current"
                  : "text-gray-600"
              }`}
            />
          </motion.button>

          <div className="relative w-full h-full">
            <motion.img
              src={product.image1}
              alt="default"
              className="absolute top-0 left-0 object-cover w-full h-full"
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.img
              src={product.image2}
              alt="hover"
              className="absolute top-0 left-0 object-cover w-full h-full"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <motion.div
            className="absolute bottom-4 right-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="p-3 text-white bg-black rounded-full shadow-lg hover:bg-gray-800"
              onClick={() => handleAddToCart(product)}
            >
              <FiShoppingCart className="text-lg" />
            </button>
          </motion.div>
        </div>

        <motion.div
          className="mt-4 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.subtitle}</p>
          <p className="text-lg font-semibold text-gray-900">{product.price}</p>

          <div className="flex items-center mt-2 space-x-2">
            {product.colors.map((color, i) => (
              <motion.button
                key={i}
                className="w-4 h-4 border-2 border-gray-300 rounded-full hover:border-gray-400"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
            <motion.button
              className="flex items-center justify-center w-4 h-4 bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xs font-bold text-gray-400">+</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative w-full px-4 py-20 mx-auto max-w-9xl">
      {/* Navigation Buttons */}
      <div className="absolute z-20 -translate-y-1/2 left-4 top-1/2">
        <div className="swiper-button-prev !w-12 !h-12 !rounded-full !bg-white shadow hover:!bg-gray-100 flex items-center justify-center !text-black">
          <FiChevronLeft className="text-xl" />
        </div>
      </div>
      <div className="absolute z-20 -translate-y-1/2 right-4 top-1/2">
        <div className="swiper-button-next !w-12 !h-12 !rounded-full !bg-white shadow hover:!bg-gray-100 flex items-center justify-center !text-black">
          <FiChevronRight className="text-xl" />
        </div>
      </div>

      {products.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: ".swiper-pagination",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
            1280: { slidesPerView: 5, spaceBetween: 10 },
          }}
          className="product-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="flex justify-center">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
          <div className="mt-6 swiper-pagination"></div>
        </Swiper>
      )}

      <style jsx>{`
        .product-swiper .swiper-pagination-bullet {
          background: #e2e8f0 !important;
          width: 10px;
          height: 10px;
          opacity: 1 !important;
          margin: 0 4px;
        }
        .product-swiper .swiper-pagination-bullet-active {
          background: #1a202c !important;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          display: none;
        }
        .swiper-button-prev,
        .swiper-button-next {
          pointer-events: auto !important;
          cursor: pointer !important;
        }
        .swiper-slide {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;
