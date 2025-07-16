const Main = () => {
  return (
    <section
      className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: "url('/main.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black/10" />

      {/* <div className="relative z-10 px-4 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Welcome to Our World
        </h1>
        <p className="mb-6 text-lg md:text-xl">
          Discover nature, beauty, and serenity like never before.
        </p>
        <button className="px-6 py-3 font-semibold text-black transition bg-white rounded-full hover:bg-gray-200">
          Get Started
        </button>
      </div> */}
    </section>
  );
};

export default Main;
