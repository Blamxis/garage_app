import CustomNavbar from "../Components/NavBar/Navbar";
import FormServices from "../Components/FormServices/FormServices";
import Footer from "../Components/Footer/Footer";
import RevisImage from '../assets/Images/revision.jpg';

const Revision = () => {
  return (
    <div className="service-container">
      <CustomNavbar />
      <h1>- RÉVISION COMPLÈTE -</h1>
      <div className="content">
        <FormServices serviceType="Révision" />
        <img src={RevisImage} alt="revision" className="sidebar-image"/>
      </div>
      <Footer />
    </div>
  );
};

export default Revision;