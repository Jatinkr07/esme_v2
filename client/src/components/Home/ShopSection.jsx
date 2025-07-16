/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Metallic Underscarf - Moondust",
    price: "Rs. 3,500.00",
    image1: "/shop1.webp",
    image2: "/shop2.webp",
  },
  {
    id: 2,
    name: "Metallic Underscarf - Brushed Platinum",
    price: "Rs. 3,500.00",
    image1: "/shop1.webp",
    image2: "/shop2.webp",
  },
  {
    id: 3,
    name: "Everyday Chiffon Hijab - Haute Pink",
    price: "Rs. 1,800.00",
    image1: "/shop1.webp",
    image2: "/shop2.webp",
  },
  {
    id: 4,
    name: "Everyday Chiffon Hijab - Deep Fig",
    price: "Rs. 1,800.00",
    image1: "/shop1.webp",
    image2: "/shop2.webp",
  },
];

const ShopSection = () => {
  return (
    <div className="py-8 mx-auto bg-[#F3EDEA]">
      <h2 className="mb-6 text-3xl text-center font-[500] font-narin">
        Shop The Latest
      </h2>
      <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:py-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative overflow-hidden group"
          >
            <div className="relative">
              <img
                src={product.image1}
                alt={product.name}
                className="object-cover w-full transition-opacity duration-300 h-[28rem]"
              />
              <img
                src={product.image2}
                alt={`${product.name} Hover`}
                className="absolute top-0 left-0 object-cover w-full transition-opacity duration-300 opacity-0 h-[28rem] group-hover:opacity-100"
              />
              <button className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-black text-sm font-narin font-[400] rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Quick Shop
              </button>
            </div>
            <div className="p-4 text-start font-narin">
              <p className="text-base">{product.name}</p>
              <p className="font-[500] ">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button className="px-6 py-2 text-lg text-white bg-black font-narin font-[400]">
          View all
        </button>
      </div>
    </div>
  );
};

export default ShopSection;
