import GraphicsDesignerIcon from "../../assets/Categories/web-design.png";
import Landscape from "../../assets/Categories/Landscape.png";
import MotionGraphics from "../../assets/Categories/Motion-Graphics.png";
import ProductDesigner from "../../assets/Categories/Product-Designer.png";
import Photographer from "../../assets/Categories/camera.png";
import WebDesigner from "../../assets/Categories/coding.png";
import InteriorDesigner from "../../assets/Categories/furbishing.png";
import UIUX from "../../assets/Categories/ui.png";
import VideoEditor from "../../assets/Categories/video-editing.png";
import VR from "../../assets/Categories/vr-glasses.png";

const Categories_Section = () => {
  const categroies1 = [
    {
      title: "Graphics Designer",
      icon: GraphicsDesignerIcon,
    },
    {
      title: "Photographer",
      icon: Photographer,
    },
    {
      title: "Interior Designer",
      icon: InteriorDesigner,
    },
    {
      title: "Web Designer",
      icon: WebDesigner,
    },
    {
      title: "UI/UX Designer",
      icon: UIUX,
    },
    {
      title: "Motion Graphics Artists",
      icon: MotionGraphics,
    },
    {
      title: "Video Editors",
      icon: VideoEditor,
    },
    {
      title: "VR/AR Artist",
      icon: VR,
    },
    {
      title: "Product Designer",
      icon: ProductDesigner,
    },
    {
      title: "Landscape Designer",
      icon: Landscape,
    },
  ];

  return (
    <main>
      <h1 className="text-3xl font-semibold">Search Talent By Categories</h1>
      <section className="mt-10">
        <div className="grid grid-cols-5 gap-10">
          {categroies1.map((category) => (
            <div
              key={category.title}
              className="flex flex-col items-center justify-center"
            >
              <img
                src={category.icon.toString()}
                alt={category.title}
                className="w-10 h-10"
              />
              <h2>{category.title}</h2>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Categories_Section;
