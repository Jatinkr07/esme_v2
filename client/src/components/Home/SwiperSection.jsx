/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SwiperSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      title: "ABSOLUTELY AMAZING",
      content:
        "I have purchased a couple of abayas from this site and they are absolutely amazing. The quality, fit (modest), is great.",
      author: "M. BIBI",
      rating: 5,
    },
    {
      id: 2,
      title: "OUTSTANDING QUALITY",
      content:
        "The fabric quality is exceptional and the designs are exactly what I was looking for. Perfect for everyday wear and special occasions.",
      author: "SARAH K.",
      rating: 5,
    },
    {
      id: 3,
      title: "HIGHLY RECOMMEND",
      content:
        "Fast shipping, beautiful packaging, and the abaya fits perfectly. I will definitely be ordering more from this collection.",
      author: "FATIMA A.",
      rating: 5,
    },
    {
      id: 4,
      title: "PERFECT FIT",
      content:
        "Finally found abayas that fit well and are truly modest. The attention to detail in the stitching is remarkable.",
      author: "AISHA M.",
      rating: 5,
    },
    {
      id: 5,
      title: "EXCELLENT SERVICE",
      content:
        "Great customer service and beautiful products. The quality exceeded my expectations and the delivery was prompt.",
      author: "ZARA H.",
      rating: 5,
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        className={`text-2xl ${
          i < rating ? "text-orange-300" : "text-gray-300"
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
      >
        ★
      </motion.span>
    ));
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-orange-200 rounded-full w-96 h-96 opacity-20"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-orange-200 rounded-full w-96 h-96 opacity-20"></div>
        <div className="absolute w-64 h-64 transform -translate-y-1/2 bg-orange-300 rounded-full top-1/2 left-1/4 opacity-10"></div>
        <div className="absolute w-48 h-48 bg-orange-300 rounded-full bottom-1/4 right-1/4 opacity-10"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Main testimonial container */}
          <div
            className="relative flex items-center justify-center h-96"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    nextSlide();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevSlide();
                  }
                }}
                className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <div className="max-w-2xl p-8 mx-auto text-center border border-orange-200 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl md:p-12">
                  <motion.h2
                    className="mb-6 text-2xl font-bold tracking-wide text-gray-800 md:text-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {testimonials[currentIndex].title}
                  </motion.h2>

                  <motion.p
                    className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {testimonials[currentIndex].content}
                  </motion.p>

                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    <p className="font-semibold tracking-wider text-gray-700">
                      {testimonials[currentIndex].author}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute z-20 p-3 text-gray-700 transition-all duration-300 transform -translate-y-1/2 rounded-full shadow-lg left-4 top-1/2 bg-white/80 hover:bg-white hover:text-orange-600 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <FaArrowLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute z-20 p-3 text-gray-700 transition-all duration-300 transform -translate-y-1/2 rounded-full shadow-lg right-4 top-1/2 bg-white/80 hover:bg-white hover:text-orange-600 hover:scale-110"
              aria-label="Next testimonial"
            >
              <FaArrowRight size={24} />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-orange-400 scale-125"
                    : "bg-orange-200 hover:bg-orange-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="mt-6 text-center">
            <span className="text-sm font-medium text-gray-600">
              {currentIndex + 1} / {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperSection;
