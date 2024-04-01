import ArtistSidebar from "../../components/Artist-Listing/Sidebar";
// import Footer from "../../common/Footer";

const ArtistListing = () => {
  return (
    <div className="bg-slate-50 h-[90vh]">
      <div className="w-11/12 mx-auto">
        <ArtistSidebar />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default ArtistListing;
