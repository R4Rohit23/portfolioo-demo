import JoinUsImage from "../../assets/JoinUs.jpg";

const Process_Section = () => {
  return (
    <div className="flex justify-between gap-10 ">
      <img src={JoinUsImage} className="w-full max-h-96 h-full" />
      <div className="w-[60%] flex flex-col justify-between">
        <h1 className="text-4xl font-semibold uppercase">Process To Join Us</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, iste
          magni rerum consequatur alias ipsam dignissimos aperiam vero ut nobis
          excepturi tempora cumque ea sed pariatur asperiores sint mollitia
          harum.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, iste
          magni rerum consequatur alias ipsam dignissimos aperiam vero ut nobis
          excepturi tempora cumque ea sed pariatur asperiores sint mollitia
          harum.
        </p>
        <div className="flex gap-5 ">
            <button className="bg-main text-black text-lg font-semibold py-2 px-8 rounded-md">Find Talent</button>
            <button className="text-black border-2 border-black text-lg font-semibold py-2 px-8 rounded-md">Find Work</button>
            
        </div>
      </div>
    </div>
  );
};

export default Process_Section;
