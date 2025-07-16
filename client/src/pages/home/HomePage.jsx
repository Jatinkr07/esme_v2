import Collections from "../../components/Home/Collections";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import Main from "../../components/Home/Main";
import MainBanner from "../../components/Home/MainBanner";
import Section from "../../components/Home/Section";
import ShopSection from "../../components/Home/ShopSection";
import SwiperSection from "../../components/Home/SwiperSection";
import ValuesSection from "../../components/Home/ValuesSection";

const HomePage = () => {
  return (
    <div>
      <Main />
      <MainBanner />
      <ShopSection />
      <FeaturedProducts />
      <ValuesSection />
      <Section />
      <SwiperSection />
      <Collections />
    </div>
  );
};

export default HomePage;
