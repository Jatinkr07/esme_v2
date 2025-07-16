/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const CartSidebar = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  console.log("Cart isOpen:", isOpen); // Debug log

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      visibility: "visible",
    },
    closed: {
      opacity: 0,
      visibility: "hidden",
    },
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price.replace(/[£$AED\s]/g, ""));
    return `AED ${numericPrice.toFixed(2)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={closeCart}
          />
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 right-0 z-50 w-full h-full max-w-lg bg-white shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Shopping Cart
                </h2>
                <button
                  onClick={closeCart}
                  className="p-2 text-gray-500 transition-colors rounded-full hover:text-gray-700 hover:bg-gray-100"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <div className="mb-4 text-6xl">🛒</div>
                    <p className="text-lg">Your cart is empty</p>
                    <p className="mt-2 text-sm">
                      Add some products to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center p-4 space-x-4 rounded-lg bg-gray-50"
                      >
                        <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-200 rounded-lg">
                          <img
                            src={item.image1 || "/shop1.webp"}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.subtitle}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className="text-sm font-medium text-gray-900">
                              {formatPrice(item.price)}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              Pack of 1
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-red-500 rounded hover:text-red-700 hover:bg-red-50"
                          >
                            <FiTrash2 size={16} />
                          </button>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="p-1 text-gray-500 rounded hover:text-gray-700 hover:bg-gray-200"
                            >
                              <FiMinus size={16} />
                            </button>
                            <span className="w-8 text-sm font-medium text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="p-1 text-gray-500 rounded hover:text-gray-700 hover:bg-gray-200"
                            >
                              <FiPlus size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {items.length > 0 && (
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="lg:text-2xl font-[600] font-narin text-gray-900">
                        Subtotal:
                      </span>
                      <span className="text-lg text-gray-900 font-narin font-[500]">
                        AED {getTotalPrice().toFixed(2)}
                      </span>
                    </div>

                    <div className="flex lg:gap-44 font-narin font-[600]">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-2 py-3 font-medium text-[#9C98BE] transition-colors border hover:text-[#fff]  border-[#9C98BE] bg-[#fff] rounded-lg hover:bg-[#9C98BE]"
                      >
                        View Cart
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-2 py-3 font-medium text-[#9C98BE] transition-colors hover:text-[#fff] border border-[#9C98BE] bg-[#fff] rounded-lg hover:bg-[#9C98BE]"
                      >
                        Checkout
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
