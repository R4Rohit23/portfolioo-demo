import BrandsSection from "../../components/Landing-Page/Brands_Section";
import Categories_Section from "../../components/Landing-Page/Categories_Section";
import Discover_Section from "../../components/Landing-Page/Discover_Section";
import HeroSection from "../../components/Landing-Page/Hero";
import Process_Section from "../../components/Landing-Page/Process_Section";
import Testimonials_Section from "../../components/Landing-Page/Testimonials/Testimonials_Section";

const Home = () => {
  return (
    <div>
      <div className="bg-main-light">
        <HeroSection />
      </div>
      <div className="flex flex-col w-11/12 mx-auto gap-20 mt-20">
        <BrandsSection />
        <Process_Section />
        <Categories_Section />
        <Testimonials_Section />
        <Discover_Section />
      </div>
    </div>
  );
};

export default Home;
