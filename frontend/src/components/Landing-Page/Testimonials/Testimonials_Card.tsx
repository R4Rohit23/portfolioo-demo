import DummyProfile from "../../../assets/Dummy-Profile-Image.png";

const Testimonials_Card = () => {
  return (
    <div className="border-2 shadow-md p-4">
      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aliquam
        repellat temporibus saepe minus architecto eligendi error, quasi a nam
        reiciendis magni at, officia voluptatum totam cupiditate sapiente
        incidunt. Cumque?
      </h2>
      <div className="flex items-center mt-5 gap-5">
        <img src={DummyProfile} className="w-10 h-10" />
        <div className="flex flex-col">
          <p>John Deo</p>
          <p className="text-sm text-gray-400">Marketing Manger, ATC</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials_Card;
