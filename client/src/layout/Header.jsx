import { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiTruck,
} from "react-icons/fi";
import { useTranslation } from "../utils/i18n";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState("");

  const searchRef = useRef(null);
  const langDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const { getTotalItems, toggleCart } = useCart();
  const cartQuantity = getTotalItems();

  const { t } = useTranslation(currentLang);

  const isAuthenticated = false;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setShowLangDropdown(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setShowLangDropdown(false);
  };

  const navigationItems = [
    { key: "shop", label: t("navbar.shop"), path: "/shop" },
    {
      key: "needs",
      label: t("navbar.needs"),
      children: t("navbar.dropdownsData.needs"),
    },
    {
      key: "effectiveness",
      label: t("navbar.effectiveness"),
      children: t("navbar.dropdownsData.effectiveness"),
    },
    {
      key: "innovations",
      label: t("navbar.innovations"),
      children: t("navbar.dropdownsData.innovations"),
    },
    {
      key: "story",
      label: t("navbar.story"),
      children: t("navbar.dropdownsData.story"),
    },
  ];

  const profileMenuItems = isAuthenticated
    ? [
        { key: "account", label: t("navbar.myAccount"), path: "/account" },
        { key: "logout", label: t("navbar.logout"), path: "/logout" },
      ]
    : t("navbar.dropdownsData.profile");

  const searchResults = {
    products: [
      {
        id: 1,
        name: "Esmé BEAUTY THROUGH IMMUNITY",
        size: "14 vials x 15 ml",
        path: "/product/1",
      },
      { id: 2, name: "Vitamin C Serum", size: "30ml", path: "/product/2" },
    ],
    blogs: [
      { id: 1, title: "Beauty Tips for Healthy Skin", path: "/blog/1" },
      { id: 2, title: "The Science Behind Immunity", path: "/blog/2" },
    ],
  };

  const filteredResults = searchValue.trim()
    ? {
        products: searchResults.products.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        ),
        blogs: searchResults.blogs.filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        ),
      }
    : { products: [], blogs: [] };

  const DropdownContent = ({ items }) => (
    <div className="absolute top-full left-0 bg-white p-4 min-w-[200px] z-50">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="block px-3 py-2 text-gray-700 transition-colors rounded-md font-[500] font-narin cursor-pointer hover:text-purple-400"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  const SearchBox = () => (
    <div className="absolute right-0 z-50 p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full w-80">
      <div className="relative mb-4">
        <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
        <input
          type="text"
          placeholder={t("navbar.searchPlaceholder")}
          value={searchValue}
          reuse
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {searchValue.trim() && (
        <div className="flex">
          <div className="w-1/2 pr-2">
            <h5 className="mb-2 font-semibold text-blue-600">
              {t("navbar.products")}
            </h5>
            {filteredResults.products.length > 0 ? (
              filteredResults.products.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="block py-1 cursor-pointer hover:text-blue-600"
                >
                  <div className="text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.size}</div>
                </Link>
              ))
            ) : (
              <p className="text-xs text-gray-400">
                {t("navbar.noProductsFound")}
              </p>
            )}
          </div>
          <div className="w-1/2 pl-2">
            <h5 className="mb-2 font-semibold text-blue-600">
              {t("navbar.blogs")}
            </h5>
            {filteredResults.blogs.length > 0 ? (
              filteredResults.blogs.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="block py-1 text-sm cursor-pointer hover:text-blue-600"
                >
                  {item.title}
                </Link>
              ))
            ) : (
              <p className="text-xs text-gray-400">
                {t("navbar.noBlogsFound")}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const MobileNavItem = ({ item, isActive, onClick }) => (
    <div className="border-b border-blue-400">
      {item.path ? (
        <Link
          to={item.path}
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="font-semibold text-white">{item.label}</span>
        </Link>
      ) : (
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={onClick}
        >
          <span className="font-semibold text-white">{item.label}</span>
          {item.children && <FiChevronDown className="text-white" />}
        </div>
      )}
      {item.children && isActive && (
        <div className="px-6 pb-4 bg-blue-700">
          {item.children.map((child, index) => (
            <Link
              key={index}
              to={child.path}
              className="block py-2 text-blue-100 cursor-pointer hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <img src="/logo.png" alt="Brand Logo" className="w-auto h-14" />
            </Link>
          </div>

          <nav className="items-center hidden space-x-10 lg:flex">
            {navigationItems.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setHoveredNavItem(item.key)}
                onMouseLeave={() => setHoveredNavItem("")}
              >
                {item.children ? (
                  <>
                    <button className="flex items-center text-lg font-[500] text-gray-800 hover:text-gray-900 transition-colors">
                      {item.label}
                      <FiChevronDown className="ml-1" />
                    </button>
                    {hoveredNavItem === item.key && (
                      <DropdownContent items={item.children} />
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="text-lg font-semibold text-gray-800 transition-colors hover:text-purple-300"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="items-center hidden space-x-1 lg:flex">
            <div className="relative" ref={langDropdownRef}>
              <button
                className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
              >
                {currentLang === "en" ? "EN" : "AR"}
                <FiChevronDown className="ml-1" />
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                    onClick={() => handleLanguageChange("en")}
                  >
                    English
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                    onClick={() => handleLanguageChange("ar")}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>

            <div className="relative" ref={searchRef}>
              <button
                className="p-2 text-gray-700 transition-colors hover:text-blue-600"
                onClick={() => setShowSearch(!showSearch)}
              >
                <FiSearch size={20} />
              </button>
              {showSearch && <SearchBox />}
            </div>

            <div className="relative">
              <button
                className="p-2 text-gray-700 transition-colors hover:text-blue-600"
                onClick={toggleCart}
              >
                <FiShoppingCart size={20} />
                {cartQuantity > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                    {cartQuantity}
                  </span>
                )}
              </button>
            </div>

            <button className="p-2 text-gray-700 transition-colors hover:text-blue-600">
              <img src="/navIcon.svg" className="w-6 h-6" />
            </button>

            <div className="relative" ref={profileDropdownRef}>
              <button
                className="p-2 text-gray-700 transition-colors hover:text-blue-600"
                onMouseEnter={() => setShowProfileDropdown(true)}
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <img src="/navIcon2.svg" className="w-6 h-6" />
              </button>
              {showProfileDropdown && (
                <div
                  className="absolute top-0 right-0 mt-8 bg-white rounded-lg z-50 min-w-[200px]"
                  onMouseEnter={() => setShowProfileDropdown(true)}
                  onMouseLeave={() => setShowProfileDropdown(false)}
                >
                  <DropdownContent items={profileMenuItems} />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:hidden">
            <div className="relative flex-1 mr-4">
              <div className="relative">
                <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder={t("navbar.searchPlaceholder")}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {searchValue.trim() && showSearch && <SearchBox />}
            </div>

            <div className="relative">
              <button
                className="p-2 text-gray-700 transition-colors hover:text-blue-600"
                onClick={toggleCart}
              >
                <FiShoppingCart size={20} />
                {cartQuantity > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full bgred-500 -top-1 -right-1">
                    {cartQuantity}
                  </span>
                )}
              </button>
            </div>

            <button
              className="p-2 text-gray-700 transition-colors hover:text-blue-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 nominative"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`fixed top-0 ${
              currentLang === "ar" ? "left-0" : "right-0"
            } h-full w-80 bg-blue-600 shadow-lg transform transition-transform duration-300 ease-in-out`}
          >
            <div className="flex items-center justify-between p-4 bg-blue-600 border-b border-blue-400">
              <span className="font-bold text-white">Menu</span>
              <button
                className="p-2 text-white transition-colors hover:text-blue-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex flex-col">
              {navigationItems.map((item) => (
                <MobileNavItem
                  key={item.key}
                  item={item}
                  isActive={activeDropdown === item.key}
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === item.key ? "" : item.key
                    )
                  }
                />
              ))}

              <div className="p-4 border-t border-blue-400">
                <div className="flex space-x-2">
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentLang === "en"
                        ? "bg-white text-blue-600"
                        : "bg-blue-700 text-white hover:bg-blue-800"
                    }`}
                    onClick={() => handleLanguageChange("en")}
                  >
                    English
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentLang === "ar"
                        ? "bg-white text-blue-600"
                        : "bg-blue-700 text-white hover:bg-blue-800"
                    }`}
                    onClick={() => handleLanguageChange("ar")}
                  >
                    العربية
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSearch && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setShowSearch(false)}
        />
      )}
    </header>
  );
};

export default Header;
