import { useState, useEffect } from "react";
import { FiPlus, FiMinus, FiX, FiHeart } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdQrScanner } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

const ShopSection = () => {
  const [selectedPack, setSelectedPack] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCart } = useCart();

  // Category filters state with normalized keys
  const [filters, setFilters] = useState({
    collection: [],
    producttype: [],
    material: [],
    price: [],
    stock: [],
    lengthinches: [],
  });

  const products = [
    {
      id: 1,
      name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY",
      price: 628.0,
      image: "/shop1.webp",
      description: `
        - Helps promote skin firmness and elasticity
        - Helps reduce fine lines and wrinkles
        - Helps improve skin deep hydration
        - Supports in improving skin softness and reduces roughness
        - Helps protect body cells against oxidative stress
        - Contributes to strengthen the body's natural defences
        - Contributes to enhance immunity
      `,
      pack: 1,
      collection: "Summer 2025",
      productType: "Supplement",
      material: "Collagen",
      priceRange: "500-700",
      stock: "In Stock",
      length: "5",
    },
    {
      id: 2,
      name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY",
      price: 942.0,
      image: "/shop2.webp",
      description: `
        - Helps promote skin firmness and elasticity
        - Helps reduce fine lines and wrinkles
        - Helps improve skin deep hydration
        - Supports in improving skin softness and reduces roughness
        - Helps protect body cells against oxidative stress
        - Contributes to strengthen the body's natural defences
        - Contributes to enhance immunity
      `,
      pack: 2,
      collection: "Winter 2025",
      productType: "Supplement",
      material: "Collagen",
      priceRange: "900-1000",
      stock: "In Stock",
      length: "6",
    },
    {
      id: 3,
      name: "Esmé Collagen Supplement BEAUTY THROUGH IMMUNITY",
      price: 1318.0,
      image: "/section2.webp",
      description: `
        - Helps promote skin firmness and elasticity
        - Helps reduce fine lines and wrinkles
        - Helps improve skin deep hydration
        - Supports in improving skin softness and reduces roughness
        - Helps protect body cells against oxidative stress
        - Contributes to strengthen the body's natural defences
        - Contributes to enhance immunity
      `,
      pack: 3,
      collection: "Summer 2025",
      productType: "Supplement",
      material: "Collagen",
      priceRange: "1300-1400",
      stock: "Out of Stock",
      length: "7",
    },
  ];

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const key = category.toLowerCase().replace(/[^a-z0-9]/g, "");
      const updatedCategory = prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value];
      return { ...prev, [key]: updatedCategory };
    });
  };

  const applyFilters = (product) => {
    const { collection, productType, material, priceRange, stock, length } =
      product;
    const hasCollection =
      filters.collection.length === 0 ||
      filters.collection.includes(collection);
    const hasProductType =
      filters.producttype.length === 0 ||
      filters.producttype.includes(productType);
    const hasMaterial =
      filters.material.length === 0 || filters.material.includes(material);
    const hasPrice =
      filters.price.length === 0 ||
      filters.price.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });
    const hasStock =
      filters.stock.length === 0 || filters.stock.includes(stock);
    const hasLength =
      filters.lengthinches.length === 0 ||
      filters.lengthinches.includes(length);
    return (
      hasCollection &&
      hasProductType &&
      hasMaterial &&
      hasPrice &&
      hasStock &&
      hasLength
    );
  };

  const filteredProducts = selectedPack
    ? products.filter(
        (product) => product.pack === selectedPack && applyFilters(product)
      )
    : products.filter(applyFilters);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: `AED ${product.price.toFixed(2)}`,
      image1: product.image,
      quantity: product.quantity || 1,
    });
  };

  const openModal = (product) => {
    setSelectedProduct({ ...product, quantity: 1 });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  // Toggle filter panel on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Close filter panel when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFilterOpen && !event.target.closest(".filter-panel")) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Mobile Filter Toggle Button */}
        <button
          className="lg:hidden p-3 bg-[#9C98BE] text-white rounded-md mb-4"
          onClick={toggleFilter}
        >
          {isFilterOpen ? "Close Filters" : "Open Filters"}
        </button>

        {/* Filter Panel */}
        <motion.div
          className={`filter-panel lg:w-1/4 w-full p-6 bg-gray-50 rounded-lg shadow-md ${
            isFilterOpen ? "block" : "hidden lg:block"
          }`}
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="mt-6 mb-4 text-xl font-bold text-gray-800">Filters</h3>
          <div className="mb-4 border-b border-gray-200"></div>
          {[
            { name: "Collection", options: ["Summer 2025", "Winter 2025"] },
            { name: "Product Type", options: ["Supplement"] },
            { name: "Material", options: ["Collagen"] },
            { name: "Price", options: ["500-700", "900-1000", "1300-1400"] },
            { name: "Stock", options: ["In Stock", "Out of Stock"] },
            { name: "Length (Inches)", options: ["5", "6", "7"] },
          ].map((category) => (
            <div key={category.name} className="mb-6">
              <h4 className="mb-3 text-base font-[500] font-narin text-gray-700">
                {category.name}
              </h4>
              <ul className="space-y-2">
                {category.options.map((option) => (
                  <li key={option}>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters[
                          category.name.toLowerCase().replace(/[^a-z0-9]/g, "")
                        ].includes(option)}
                        onChange={() =>
                          handleFilterChange(category.name, option)
                        }
                        className="w-4 h-4 text-[#9C98BE] font-narin font-[400] rounded focus:ring-[#9C98BE]"
                      />
                      <span className="text-gray-600">{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button
            className="w-full px-4 py-2 mt-4 font-narin font-[500] text-white bg-[#9C98BE] rounded-md hover:bg-[#8A86AD] transition-colors"
            onClick={() =>
              setFilters({
                collection: [],
                producttype: [],
                material: [],
                price: [],
                stock: [],
                lengthinches: [],
              })
            }
          >
            Clear All Filters
          </button>
        </motion.div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="relative overflow-hidden bg-white rounded-lg shadow-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative w-full h-64 sm:h-80"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                  <motion.div
                    className="absolute inset-0 transition-opacity duration-300 bg-black bg-opacity-0 hover:bg-opacity-20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.button
                      className="absolute p-2 transition-colors bg-white rounded-full shadow-md top-4 right-4 hover:bg-gray-100"
                      onClick={() => openModal(product)}
                      whileHover={{ scale: 1.1 }}
                    >
                      <IoMdQrScanner className="text-gray-600" size={20} />
                    </motion.button>
                    <div className="flex justify-center">
                      <motion.button
                        className="absolute  bottom-4  mx-4 w-64 py-2 text-white bg-[#9C98BE] rounded-md hover:bg-[#8A86AD]"
                        onClick={() => handleAddToCart(product)}
                        whileHover={{ scale: 1.05 }}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xl font-bold text-[#9C98BE]">
                    AED {product.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600">14 vials x 15 ml</p>
                  <p className="text-gray-500">Pack of {product.pack}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="w-full max-w-5xl p-6 mx-4 bg-white rounded-lg shadow-xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="lg:w-1/2">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="object-cover w-full rounded-lg h-80 lg:h-96"
                  />
                </div>
                <div className="flex flex-col lg:w-1/2">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                      {selectedProduct.name}
                    </h2>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={closeModal}
                    >
                      <FiX size={24} />
                    </button>
                  </div>
                  <p className="mb-4 text-gray-600">
                    14 vials x 15 ml
                    <br />
                    <span className="font-bold text-[#9C98BE]">
                      AED {selectedProduct.price.toFixed(2)}
                    </span>
                    <br />
                    Pack of {selectedProduct.pack}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-gray-700">
                    {selectedProduct.description}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <button
                      className="p-2 bg-[#9C98BE] text-white rounded-full hover:bg-[#8A86AD] transition-colors"
                      onClick={() =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          quantity: Math.max(1, (prev.quantity || 1) - 1),
                        }))
                      }
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="text-lg font-semibold">
                      {selectedProduct.quantity || 1}
                    </span>
                    <button
                      className="p-2 bg-[#9C98BE] text-white rounded-full hover:bg-[#8A86AD] transition-colors"
                      onClick={() =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          quantity: (prev.quantity || 1) + 1,
                        }))
                      }
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="flex-1 px-4 py-3 text-white bg-[#9C98BE] rounded-md hover:bg-[#8A86AD] transition-colors"
                      onClick={() => handleAddToCart(selectedProduct)}
                    >
                      Add to Cart
                    </button>
                    <motion.button
                      className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FiHeart className="text-gray-600" size={20} />
                    </motion.button>
                  </div>
                  <div className="mt-6">
                    <span className="text-sm font-bold text-gray-800">
                      SHARE THIS PRODUCT
                    </span>
                    <div className="flex gap-4 mt-2">
                      <button className="text-gray-500 hover:text-[#9C98BE] transition-colors">
                        <FaFacebook size={20} />
                      </button>
                      <button className="text-gray-500 hover:text-[#9C98BE] transition-colors">
                        <FaTwitter size={20} />
                      </button>
                      <button className="text-gray-500 hover:text-[#9C98BE] transition-colors">
                        <FaLinkedin size={20} />
                      </button>
                      <button className="text-gray-500 hover:text-[#9C98BE] transition-colors">
                        <FaWhatsapp size={20} />
                      </button>
                      <button className="text-gray-500 hover:text-[#9C98BE] transition-colors">
                        <MdEmail size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopSection;
