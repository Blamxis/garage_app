import CustomNavbar from "../Components/NavBar/Navbar";
import FormServices from "../Components/FormServices/FormServices";
import Footer from "../Components/Footer/Footer";
import mecanoImage from '../assets/Images/mecano.jpg';

const Mecanique = () => {
  return (
    <div className="service-container">
      <CustomNavbar />
      <h1>- MÉCANIQUE DE PRÉCISION -</h1>
      <div className="content">
        <FormServices serviceType="Mécanique" />
        <img src={mecanoImage} alt="mecano" className="sidebar-image"/>
      </div>
      <Footer />
    </div>
  );
};

export default Mecanique;

