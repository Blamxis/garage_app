import CustomNavbar from "../Components/NavBar/Navbar";
import FormServices from "../Components/FormServices/FormServices";
import Footer from "../Components/Footer/Footer";
import CarrossImage from '../assets/Images/carrosserie.jpg';

const Carrosserie = () => {
  return (
    <div className="service-container">
      <CustomNavbar />
      <h1>- CARROSSERIE D&apos;EXCELLENCE -</h1>
      <div className="content">
        <FormServices serviceType="Carrosserie" />
        <img src={CarrossImage} alt="carrosserie" className="sidebar-image"/>
      </div>
      <Footer />
    </div>
  );
};

export default Carrosserie;