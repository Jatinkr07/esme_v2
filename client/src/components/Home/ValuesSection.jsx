const ValuesSection = () => {
  const values = [
    {
      title: "UNPARALLELED QUALITY",
      description:
        "Our hijabs & accessories are made to last from best-in-class materials. You won't find them anywhere else.",
    },
    {
      title: "MADE WITH A MISSION",
      description:
        "Our mission is to create a world where every woman feels comfortable and confident.",
    },
    {
      title: "COMMUNITY COMES FIRST",
      description:
        "We exist to celebrate YOU, with great products and uplifting content to enrich your life and nourish your soul.",
    },
  ];

  return (
    <div className="container px-4 py-12 mx-auto bg-[#FFF]">
      <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
        {values.map((value, index) => (
          <div key={index} className="p-6">
            <h3 className="mb-4 text-xl font-narin font-[500] text-gray-800">
              {value.title}
            </h3>
            <p className="font-narin font-normal text-base text-[#5b5a59]">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuesSection;
