import MetaLogo from "../../assets/Meta-Logo.png";
import NetflixLogo from "../../assets/NetflixLogo.png";
import PGLogo from "../../assets/P&G_logo.png";
import PayPalLogo from "../../assets/PayPal-Logo.png";
import AppleLogo from "../../assets/Apple_logo_black.svg";

const BrandsSection = () => {
  const Brands = [MetaLogo, AppleLogo, NetflixLogo, PGLogo, PayPalLogo];

  return (
    <div className="flex justify-between gap-20 items-center">
      <h1 className="text-3xl min-w-40 font-bold">Trusted By</h1>
      <div className="w-full flex justify-between">
        {Brands.map((brand, index) => (
          <div key={index}>
            <img src={brand} alt={brand} className="w-40 h-20 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsSection;
