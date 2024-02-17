import CustomNavbar from "../Components/NavBar/Navbar";
import FormServices from "../Components/FormServices/FormServices";
import Footer from "../Components/Footer/Footer";
import { Helmet } from 'react-helmet-async';
import mecanoImage from '../assets/Images/mecano.jpg';

const Mecanique = () => {
  const pageTitle = "Services de Mécanique - PAT Garage";
  const pageDescription = "Découvrez nos services de mécanique de précision chez PAT Garage.";

  return (
    <div className="service-container">
      <Helmet>
        {/* Métadonnées standards */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

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

