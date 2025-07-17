import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  const paymentMethods = [
    { name: "American Express", color: "bg-blue-600" },
    { name: "Apple Pay", color: "bg-black" },
    { name: "Diners Club", color: "bg-blue-500" },
    { name: "Discover", color: "bg-orange-500" },
    { name: "Google Pay", color: "bg-gray-700" },
    { name: "Klarna", color: "bg-pink-400" },
    { name: "Maestro", color: "bg-blue-600" },
    { name: "Mastercard", color: "bg-red-600" },
    { name: "PayPal", color: "bg-blue-500" },
    { name: "Shop Pay", color: "bg-purple-600" },
    { name: "Union Pay", color: "bg-blue-700" },
    { name: "Visa", color: "bg-blue-800" },
    { name: "Klarna", color: "bg-pink-400" },
    { name: "More", color: "bg-gray-600" },
  ];

  return (
    <footer className="bg-[#edece6] text-[#252423]">
      <div className="px-4 py-16 mx-auto text-center max-w-7xl">
        <h2 className="mb-4 text-2xl font-[400] font-narin tracking-wide md:text-3xl">
          READY TO TAKE YOUR STYLE & DEEN TO NEW HEIGHTS?
        </h2>
        <p className="mb-8 text-lg text-[#252423] font-narin font-[400]">
          We'll let you in on exclusive offers, new drops and updates
        </p>

        <div className="flex flex-col max-w-xl gap-0 mx-auto sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 text-gray-800 bg-white border-0 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-orange-300 sm:rounded-r-none"
          />
          <button
            onClick={handleSubmit}
            className="px-8 py-3 font-medium text-gray-800 transition-colors duration-200 bg-orange-300 rounded-r-sm hover:bg-orange-400 sm:rounded-l-none"
          >
            SIGN UP
          </button>
        </div>
      </div>

      {/*  Footer  */}
      <div className="px-4 border-teal-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <h3 className="mb-6 text-2xl font-light tracking-wider">
                <img src="/logo.png" />
              </h3>
              <p className="leading-relaxed max-w-sm text-[#252423] font-narin font-[400]">
                Influential, innovative and progressive. At AbayaButh, we pride
                ourselves on fusing traditional modest clothing with
                contemporary fashion to stand out rather than fit in.
              </p>
            </div>

            {/* Information Links */}
            <div className="grid grid-cols-1 lg:-ml-16 lg:gap-4 lg:grid-cols-3">
              {" "}
              <div>
                <h4 className="mb-6 text-lg tracking-wide font-[500] font-narin">
                  INFORMATION
                </h4>
                <ul className="space-y-3 font-narin">
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Size Chart
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Feedback
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Loyalty Programme
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              {/* Customer Care Links */}
              <div>
                <h4 className="mb-6 text-lg font-[500] font-narin tracking-wide">
                  CUSTOMER CARE
                </h4>
                <ul className="space-y-3 font-narin">
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      My Account
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Klarna FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Delivery
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Returns Information
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Returns Centre
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      Gift Card
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#252423] transition-colors duration-200 hover:text-white"
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
              {/* Get In Touch */}
              <div>
                <h4 className="mb-6 text-lg font-[500] font-narin tracking-wide">
                  GET IN TOUCH
                </h4>
                <div className="mb-8 space-y-3">
                  <p className="text-[#252423] font-narin">
                    E:{" "}
                    <a
                      href="mailto:orders@abayabuth.com"
                      className="text-[#252423] font-narin transition-colors duration-200 hover:text-orange-300"
                    >
                      orders@abayabuth.com
                    </a>
                  </p>
                  <p className="text-[#252423]">
                    T:{" "}
                    <a
                      href="tel:02031610087"
                      className="text-[#252423] transition-colors duration-200 hover:text-orange-300"
                    >
                      020 3161 0087
                    </a>
                  </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex mb-8 space-x-4">
                  <a
                    href="#"
                    className="text-[#252423] transition-colors duration-200 hover:text-white"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-[#252423] transition-colors duration-200 hover:text-white"
                  >
                    <FaXTwitter size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-[#252423] transition-colors duration-200 hover:text-white"
                  >
                    <FaPinterest size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-[#252423] transition-colors duration-200 hover:text-white"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-[#252423] transition-colors duration-200 hover:text-white"
                  >
                    <FaYoutube size={24} />
                  </a>
                </div>

                {/* Customer Care Hours */}
                <div>
                  <h5 className="mb-4 text-lg font-[500] font-narin tracking-wide">
                    CUSTOMER CARE
                  </h5>
                  <div className="space-y-1 text-[#252423] font-narin">
                    <div className="flex justify-between">
                      <span>Mon - Fri</span>
                      <span>09:30 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>Closed</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-4 py-10 border-teal-800">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            {/* Copyright */}
            <div className="text-sm text-[#252423]">
              © 2025 Esme. All Rights Reserved
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap justify-center gap-2 lg:justify-end">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className={`${method.color} text-white text-xs px-2 py-1 rounded text-center min-w-[50px] h-8 flex items-center justify-center font-medium`}
                >
                  {method.name === "American Express" && "AMEX"}
                  {method.name === "Apple Pay" && "Apple"}
                  {method.name === "Diners Club" && "Diners"}
                  {method.name === "Discover" && "Discover"}
                  {method.name === "Google Pay" && "GPay"}
                  {method.name === "Klarna" && "Klarna"}
                  {method.name === "Maestro" && "Maestro"}
                  {method.name === "Mastercard" && "Master"}
                  {method.name === "PayPal" && "PayPal"}
                  {method.name === "Shop Pay" && "Shop"}
                  {method.name === "Union Pay" && "Union"}
                  {method.name === "Visa" && "Visa"}
                  {method.name === "More" && "•••"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
