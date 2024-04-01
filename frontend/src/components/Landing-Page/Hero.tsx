import HeroBanner from "../../assets/HeroBanner.webp";
import InputField from "../../common/InputField";
import { CiSearch } from "react-icons/ci";

const HeroSection = () => {
  return (
    <div className="w-11/12 mx-auto h-screen flex items-center -mt-20">
      <div className="flex flex-col gap-8">
        <h1 className="text-6xl capitalize font-bold">
          Discover <br/> the ideal freelance service <span className="italic">instantly.</span>
        </h1>
        <div className="flex">
          <InputField type="text" label="Explore Available Services" />
          <button className="bg-black text-white p-4 rounded-lg">
            <CiSearch />
          </button>
        </div>
      </div>

      <div className="max-w-2xl">
        <img src={HeroBanner} />
      </div>
    </div>
  );
};

export default HeroSection;
