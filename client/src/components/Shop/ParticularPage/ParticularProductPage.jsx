import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
  ShareAltOutlined,
  CloseOutlined,
  DownloadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Modal, Button, Rate, Collapse } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const { Panel } = Collapse;

const useCart = () => ({
  addToCart: (item) => console.log("Added to cart:", item),
  items: [],
  getTotalItems: () => 0,
});

const ParticularProductPage = () => {
  const [selectedColor, setSelectedColor] = useState("Khaki Olive");
  const [selectedSize, setSelectedSize] = useState("54");
  const [selectedFit, setSelectedFit] = useState("SLIM FIT");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Ensure currentImageIndex is a state
  const [isSizeGuideVisible, setIsSizeGuideVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "PREMIUM EMIRATI THOBE - SMOKY TAUPE",
      price: 7200.0,
      currency: "Rs.",
      colors: [
        {
          name: "Khaki Olive",
          hex: "#8B7355",
          images: ["/shop1.webp", "/shop2.webp", "/shop1.webp"],
        },
        {
          name: "Steel Blue",
          hex: "#4682B4",
          images: ["/shop1.webp", "/shop1.webp"],
        },
        { name: "Cream", hex: "#F5F5DC", images: ["/shop1.webp"] },
        {
          name: "Charcoal",
          hex: "#36454F",
          images: ["/shop1.webp"],
        },
        {
          name: "Sandy Brown",
          hex: "#F4A460",
          images: ["/shop1.webp"],
        },
        {
          name: "Burgundy",
          hex: "#800020",
          images: ["/shop1.webp"],
        },
        { name: "Navy", hex: "#000080", images: ["/shop1.webp"] },
        {
          name: "Smoky Taupe",
          hex: "#9C8B7A",
          images: ["/shop1.webp"],
        },
      ],
      sizes: [
        { size: "54", available: true },
        { size: "56", available: true },
        { size: "58", available: true },
        { size: "60", available: true },
        { size: "62", available: true },
        { size: "64", available: false },
      ],
      fits: ["SLIM FIT", "STANDARD FIT", "REGULAR FIT"],
      description:
        "Elevate your wardrobe with our Premium Emirati Thobe in sophisticated Smoky Taupe. Crafted from premium cotton blend fabric, this thobe combines traditional elegance with contemporary comfort.",
      features: [
        "Premium cotton blend fabric",
        "Traditional embroidered details",
        "Comfortable loose fit",
        "Easy care machine washable",
        "Available in multiple colors",
      ],
      collection: "Traditional",
      productType: "Thobe",
      material: "Cotton Blend",
      priceRange: "7000-8000",
      stock: "In Stock",
      rating: 4.8,
      reviews: 156,
      image: "/api/placeholder/600/800",
    },
  ];

  const allProducts = [
    ...products,
    {
      id: 2,
      name: "Classic White Thobe",
      price: 6500.0,
      currency: "Rs.",
      collection: "Classic",
      productType: "Thobe",
      material: "Cotton",
      priceRange: "6000-7000",
      stock: "In Stock",
      image: "/api/placeholder/300/400",
    },
    {
      id: 3,
      name: "Black Premium Thobe",
      price: 8000.0,
      currency: "Rs.",
      collection: "Premium",
      productType: "Thobe",
      material: "Silk Blend",
      priceRange: "8000-9000",
      stock: "Out of Stock",
      image: "/api/placeholder/300/400",
    },
  ];

  const currentProduct = products[0];
  const currentColor = currentProduct.colors.find(
    (c) => c.name === selectedColor
  );
  const currentImages = currentColor?.images || [];

  // Size guide data
  const sizeGuideData = {
    standardFit: [
      {
        size: "52",
        shoulder: "17",
        chest: "23",
        sleeve: "22",
        length: "52",
        neck: "15",
      },
      {
        size: "54",
        shoulder: "18",
        chest: "25",
        sleeve: "22.5",
        length: "54",
        neck: "15.5",
      },
      {
        size: "56",
        shoulder: "18.5",
        chest: "24",
        sleeve: "23",
        length: "56",
        neck: "16",
      },
      {
        size: "58",
        shoulder: "19.5",
        chest: "25",
        sleeve: "24",
        length: "58",
        neck: "17",
      },
      {
        size: "60",
        shoulder: "20",
        chest: "26",
        sleeve: "24.5",
        length: "60",
        neck: "17.5",
      },
      {
        size: "62",
        shoulder: "20",
        chest: "26",
        sleeve: "25",
        length: "62",
        neck: "17.5",
      },
      {
        size: "64",
        shoulder: "21",
        chest: "27",
        sleeve: "27",
        length: "64",
        neck: "18",
      },
    ],
    slimFit: [
      {
        size: "52",
        shoulder: "17",
        chest: "21",
        sleeve: "22",
        length: "52",
        neck: "15",
      },
      {
        size: "54",
        shoulder: "17.5",
        chest: "21",
        sleeve: "22.75",
        length: "54",
        neck: "15.5",
      },
      {
        size: "56",
        shoulder: "18",
        chest: "22",
        sleeve: "23.25",
        length: "56",
        neck: "16",
      },
      {
        size: "58",
        shoulder: "18",
        chest: "22",
        sleeve: "24.5",
        length: "58",
        neck: "17",
      },
      {
        size: "60",
        shoulder: "19",
        chest: "23",
        sleeve: "24.5",
        length: "60",
        neck: "17.5",
      },
      {
        size: "62",
        shoulder: "19",
        chest: "22",
        sleeve: "25.25",
        length: "62",
        neck: "17.5",
      },
      {
        size: "64",
        shoulder: "19.5",
        chest: "23",
        sleeve: "26",
        length: "64",
        neck: "18",
      },
    ],
    regularFit: [
      {
        size: "52",
        shoulder: "17.5",
        chest: "24",
        sleeve: "22.5",
        length: "52",
        neck: "15.5",
      },
      {
        size: "54",
        shoulder: "18.5",
        chest: "26",
        sleeve: "23",
        length: "54",
        neck: "16",
      },
      {
        size: "56",
        shoulder: "19",
        chest: "27",
        sleeve: "23.5",
        length: "56",
        neck: "16.5",
      },
      {
        size: "58",
        shoulder: "20",
        chest: "28",
        sleeve: "24.5",
        length: "58",
        neck: "17",
      },
      {
        size: "60",
        shoulder: "20.5",
        chest: "29",
        sleeve: "25",
        length: "60",
        neck: "17.5",
      },
      {
        size: "62",
        shoulder: "21",
        chest: "30",
        sleeve: "25.5",
        length: "62",
        neck: "18",
      },
      {
        size: "64",
        shoulder: "21.5",
        chest: "31",
        sleeve: "26.5",
        length: "64",
        neck: "18.5",
      },
    ],
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${currentProduct.id}_${selectedColor}_${selectedSize}_${selectedFit}`,
      name: currentProduct.name,
      price: currentProduct.price,
      currency: currentProduct.currency,
      color: selectedColor,
      size: selectedSize,
      fit: selectedFit,
      quantity: quantity,
      image: currentImages[0],
    };
    addToCart(cartItem);
  };

  const handleImageClick = () => {
    setIsImageModalVisible(true);
    setZoomLevel(1); // Reset zoom level when opening modal
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentImages[currentImageIndex];
    link.download = `${currentProduct.name}-${selectedColor}-${currentImageIndex}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3)); // Max zoom: 3x
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5)); // Min zoom: 0.5x
  };

  const accordionItems = [
    {
      key: "1",
      label: "Product Description",
      children: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {currentProduct.description}
          </p>
          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {currentProduct.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Delivery & Returns",
      children: (
        <div className="space-y-4 text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">Delivery Information:</h4>
            <ul className="space-y-1">
              <li>• Standard Delivery: 3-5 business days</li>
              <li>• Express Delivery: 1-2 business days</li>
              <li>• Free delivery on orders above Rs. 5,000</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Returns Policy:</h4>
            <ul className="space-y-1">
              <li>• 30-day return policy</li>
              <li>• Items must be in original condition</li>
              <li>• Free returns for defective items</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Right Side: Product Images */}
          <div className="lg:w-[60%]">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {currentImages.length === 1 ? (
                  <div className="col-span-2">
                    <div className=" bg-gray-100  rounded-lg overflow-hidden cursor-pointer">
                      <img
                        src={currentImages[0] || "/api/placeholder/600/800"}
                        alt={currentProduct.name}
                        className="w-full h-full object-cover"
                        onClick={handleImageClick}
                      />
                    </div>
                  </div>
                ) : (
                  currentImages.map((image, index) => (
                    <div key={index} className="col-span-1">
                      <div className="h-[70vh] bg-gray-100  overflow-hidden cursor-pointer">
                        <img
                          src={image || "/api/placeholder/600/800"}
                          alt={`${currentProduct.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onClick={handleImageClick}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Left Side: Product Info and Accordion */}
          <div className="lg:w-[40%]">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Product Info */}
              <div>
                <h1 className="text-xl lg:text-[1.3rem] font-[400] tracking-wider font-narin text-gray-900 mb-2">
                  {currentProduct.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-sm font-[400] font-narin text-gray-900">
                    {currentProduct.currency} {currentProduct.price.toFixed(2)}
                  </span>
                  {/*<div className="flex items-center space-x-2">
                    <Rate disabled defaultValue={currentProduct.rating} />
                    <span className="text-xs text-gray-500">
                      ({currentProduct.reviews} reviews)
                    </span>
                  </div> */}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-[400] font-narin mb-3">
                  Colour: {selectedColor}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color.name);
                      }}
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedColor === color.name
                          ? "border-gray-900 ring-2 ring-offset-2 ring-gray-400"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-[400]">Length (Inches)</h3>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {currentProduct.sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption.size)}
                      disabled={!sizeOption.available}
                      className={`px-4 py-2 text-sm border font-narin font-[400] ${
                        selectedSize === sizeOption.size
                          ? "bg-[#F3EDEA] text-black border-gray-400"
                          : sizeOption.available
                          ? "border-gray-300 hover:border-gray-400"
                          : "border-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {sizeOption.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fit Selection */}
              {/*<div>
                <h3 className="text-sm font-medium mb-3">Fit</h3>
                <div className="flex gap-2">
                  {currentProduct.fits.map((fit) => (
                    <button
                      key={fit}
                      onClick={() => setSelectedFit(fit)}
                      className={`px-4 py-2 text-sm border rounded-md ${
                        selectedFit === fit
                          ? "bg-teal-700 text-white border-teal-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div> */}

              <Button
                type="link"
                className="p-0 text-sm text-black font-narin font-[400]"
                onClick={() => setIsSizeGuideVisible(true)}
              >
                📏 Size Guide
              </Button>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-[400] font-narin">
                    Quantity:
                  </span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:bg-gray-100"
                    >
                      <MinusOutlined />
                    </button>
                    <span className="px-4 py-1 min-w-[50px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <PlusOutlined />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    className="flex-1 text-black hover:text-black hover:bg-[#F3EDEA]  bg-[#F3EDEA]"
                  >
                    ADD TO BAG
                  </Button>
                  <Button
                    size="large"
                    icon={<HeartOutlined />}
                    className="px-4"
                  />
                </div>

                <div className="text-sm font-narin font-[300] text-gray-600">
                  Pay in 4 interest-free instalments of Rs.{" "}
                  {(currentProduct.price / 4).toFixed(2)}.
                  <button className="text-teal-700 hover:underline ml-1">
                    Learn more
                  </button>
                </div>
              </div>

              {/* Share */}
              <div>
                <span className="text-sm font-[400] font-narin block mb-2">
                  SHARE THIS PRODUCT
                </span>
                <Button icon={<ShareAltOutlined />} type="text" />
              </div>

              {/* Accordion for Product Description and Delivery */}
              <Collapse
                accordion
                expandIconPosition="end"
                className="bg-white"
                expandIcon={({ isActive }) => (
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PlusOutlined />
                  </motion.div>
                )}
              >
                {accordionItems.map((item) => (
                  <Panel
                    header={item.label}
                    key={item.key}
                    className="font-narin font-[400] text-base"
                  >
                    {item.children}
                  </Panel>
                ))}
              </Collapse>
            </div>
          </div>
        </div>

        {/* Related Products */}
      </div>

      {/* Image Modal with Swiper */}
      <Modal
        open={isImageModalVisible}
        footer={null}
        onCancel={() => setIsImageModalVisible(false)}
        className="image-modal"
        closeIcon={<CloseOutlined className="text-white" />}
        style={{ top: 0, padding: 0 }}
        bodyStyle={{ padding: 0, background: "rgba(0, 0, 0, 0.9)" }}
        width="100%"
        wrapClassName="full-screen-modal"
      >
        <div className="relative w-full h-screen bg-black bg-opacity-90 flex items-center justify-center">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop={true}
            slidesPerView={1}
            onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
            initialSlide={currentImageIndex}
            className="w-full h-full"
          >
            {currentImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={image || "/api/placeholder/600/800"}
                    alt={`${currentProduct.name} ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transition: "transform 0.2s",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-4 left-4 flex space-x-2 z-10">
            <Button
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              className="text-white bg-gray-800 hover:bg-gray-700"
            />
            <Button
              icon={<ZoomInOutlined />}
              onClick={handleZoomIn}
              className="text-white bg-gray-800 hover:bg-gray-700"
            />
            <Button
              icon={<ZoomOutOutlined />}
              onClick={handleZoomOut}
              className="text-white bg-gray-800 hover:bg-gray-700"
            />
          </div>
        </div>
      </Modal>

      {/* Size Guide Modal */}
      <Modal
        title="PREMIUM EMIRATI THOBE - SMOKY TAUPE"
        open={isSizeGuideVisible}
        onCancel={() => setIsSizeGuideVisible(false)}
        footer={null}
        width={800}
        className="size-guide-modal"
      >
        <div className="space-y-6">
          <p className="text-center text-sm text-gray-600">Size Charts</p>

          <Collapse defaultActiveKey={["standard"]}>
            <Panel header="Standard Fit" key="standard">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Size</th>
                      <th className="text-left py-2">Shoulder</th>
                      <th className="text-left py-2">Chest</th>
                      <th className="text-left py-2">Sleeve</th>
                      <th className="text-left py-2">Length</th>
                      <th className="text-left py-2">Neck</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuideData.standardFit.map((row, index) => (
                      <tr
                        key={row.size}
                        className={index % 2 === 0 ? "bg-gray-50" : ""}
                      >
                        <td className="py-2">{row.size}</td>
                        <td className="py-2">{row.shoulder}</td>
                        <td className="py-2">{row.chest}</td>
                        <td className="py-2">{row.sleeve}</td>
                        <td className="py-2">{row.length}</td>
                        <td className="py-2">{row.neck}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel header="Slim Fit" key="slim">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Size</th>
                      <th className="text-left py-2">Shoulder</th>
                      <th className="text-left py-2">Chest</th>
                      <th className="text-left py-2">Sleeve</th>
                      <th className="text-left py-2">Length</th>
                      <th className="text-left py-2">Neck</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuideData.slimFit.map((row, index) => (
                      <tr
                        key={row.size}
                        className={index % 2 === 0 ? "bg-gray-50" : ""}
                      >
                        <td className="py-2">{row.size}</td>
                        <td className="py-2">{row.shoulder}</td>
                        <td className="py-2">{row.chest}</td>
                        <td className="py-2">{row.sleeve}</td>
                        <td className="py-2">{row.length}</td>
                        <td className="py-2">{row.neck}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel header="Regular Fit" key="regular">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Size</th>
                      <th className="text-left py-2">Shoulder</th>
                      <th className="text-left py-2">Chest</th>
                      <th className="text-left py-2">Sleeve</th>
                      <th className="text-left py-2">Length</th>
                      <th className="text-left py-2">Neck</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuideData.regularFit.map((row, index) => (
                      <tr
                        key={row.size}
                        className={index % 2 === 0 ? "bg-gray-50" : ""}
                      >
                        <td className="py-2">{row.size}</td>
                        <td className="py-2">{row.shoulder}</td>
                        <td className="py-2">{row.chest}</td>
                        <td className="py-2">{row.sleeve}</td>
                        <td className="py-2">{row.length}</td>
                        <td className="py-2">{row.neck}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </Collapse>

          <div className="space-y-4 text-sm">
            <h4 className="font-semibold">HOW TO MEASURE YOUR THOBE</h4>
            <p>
              Lay out a similar garment you own flat on the floor or on a table.
              Using a soft measuring tape, take the following measurements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium">1. Shoulder</h5>
                  <p className="text-gray-600">
                    Measure from the point of sleeve attachment at the top of
                    the shoulder on one side, to the same point on the other
                    side.
                  </p>
                </div>

                <div>
                  <h5 className="font-medium">2. Chest</h5>
                  <p className="text-gray-600">
                    Measure immediately underneath the armhole, across the chest
                    of the garment.
                  </p>
                </div>

                <div>
                  <h5 className="font-medium">3. Sleeve</h5>
                  <p className="text-gray-600">
                    Measure the length of the sleeve from the point of its
                    attachment at the top of the shoulder, to the end of the
                    cuff hem.
                  </p>
                </div>

                <div>
                  <h5 className="font-medium">4. Length</h5>
                  <p className="text-gray-600">
                    Measure down the center back of the garment, from the bottom
                    of the neckline until the end of the hem at the bottom of
                    the garment.
                  </p>
                </div>

                <div>
                  <h5 className="font-medium">5. Neck</h5>
                  <p className="text-gray-600">
                    Take and wind your neck at the height, where your collar, if
                    buttoned, would be. This measurement should be taken along
                    the lower section of the neck, below the Adam's apple.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-48 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Measurement Diagram</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <style jsx global>{`
        .ant-modal .ant-modal-content {
          padding: 0px !important;
        }
      `}</style>
    </div>
  );
};

export default ParticularProductPage;
