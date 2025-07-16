/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";

const Collections = () => {
  const collections = [
    {
      id: 1,
      title: "The Monthly Drop",
      description:
        "The freshest prints, hot off the press. Brand-new hijabs drop here on the first Tuesday of every month at 11 a.m. EST, so be the first to snag the latest!",
      buttonText: "THE MONTHLY DROP",
      image: "/shop1.webp",
      bgColor: "bg-[#F4F2EA]",
    },
    {
      id: 2,
      title: "Shop By Color",
      description:
        "Looking for a specific shade of blue? Or how about a green hijab? Find the perfect hue for every mood, in the fabric you love most.",
      buttonText: "SHOP BY COLOR",
      image: "/shop2.webp",
      bgColor: "bg-[#F4F2EA]",
    },
    {
      id: 3,
      title: "New to Hijab?",
      description:
        "Whether you're a seasoned hijabi or just starting out with hijab, having the right basics makes all the difference.",
      buttonText: "GETTING STARTED",
      image: "/section2.webp",
      bgColor: "bg-[#F4F2EA]",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="px-4 py-16 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-[500] font-narin text-gray-900 md:text-5xl">
            Collections We Love
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="cursor-pointer group"
            >
              <div
                className={`${collection.bgColor} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="relative overflow-hidden h-[28rem]">
                  <motion.div
                    variants={imageVariants}
                    whileHover="hover"
                    className="w-full h-full"
                  >
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>

                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="mb-4 text-2xl font-[600] font-narin text-gray-800">
                    {collection.title}
                  </h3>

                  <p className="mb-6 text-sm font-narin font-[500] leading-relaxed text-gray-600">
                    {collection.description}
                  </p>

                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    className="flex items-center gap-2 text-sm font-medium text-gray-800 transition-colors duration-200 group/button hover:text-gray-600"
                  >
                    <span className="tracking-wider">
                      {collection.buttonText}
                    </span>
                    <motion.div
                      className="text-gray-500 transition-colors duration-200 group-hover/button:text-gray-700"
                      whileHover={{ x: 3 }}
                    >
                      <FaArrowRightLong size={16} />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom spacing */}
        <div className="mt-16" />
      </div>
    </section>
  );
};

export default Collections;
