const Section = () => {
  return (
    <div className="py-10 mx-auto max-w-7xl">
      <div className="grid items-center grid-cols-1 md:grid-cols-1">
        {/* First One */}
        <div className="flex flex-col items-center md:flex-row-reverse">
          <div className="p-4 md:w-1/2">
            <h3 className="mb-4 text-2xl font-[700] font-narin text-gray-800">
              Little Magnet, Big Impact
            </h3>
            <p className="mb-6 font-narin font-[400] text-gray-600">
              Finally, hijab magnets strong enough to actually replace pins! We
              fused all the function and security of a traditional safety pin
              with the convenience of an ultra-strong magnet that won't snag
              even the most delicate fabrics. The perfect gift for a friend — or
              for yourself.
            </p>
            <button className="px-6 py-3 text-white font-narin font-[400] transition duration-300 bg-black hover:bg-gray-800">
              SHOP MAGNETS
            </button>
          </div>
          <div className="p-4 md:w-1/2">
            <img
              src="/section1.jpg"
              alt="Mission Product"
              className="w-full h-auto"
            />
          </div>
        </div>{" "}
        <div className="flex flex-col items-center md:flex-row">
          <div className="p-4 md:w-1/2">
            <h3 className="mb-4 text-2xl font-[700] font-narin text-gray-800">
              Underscarves For All
            </h3>
            <p className="mb-6 text-gray-600 font-narin font-[400]">
              Our underscarves are made of cutting-edge textiles with built-in
              skincare, like anti-microbial properties and sun protection, and
              cater to a variety of hair types and fabric preferences.
              Thoughtful details contain your hair with a custom fit that feels
              weightless, secure, and never stifling. Say hello to your new
              go-to.
            </p>
            <button className="px-6 font-narin font-[400] py-3 text-white transition duration-300 bg-black  text hover:bg-gray-800">
              SHOP UNDERSCARVES
            </button>
          </div>
          <div className="p-4 md:w-1/2">
            <img
              src="/section2.webp"
              alt="Quality Product"
              className="w-full h-auto "
            />
          </div>
        </div>
        {/* Second One */}
      </div>
    </div>
  );
};

export default Section;
