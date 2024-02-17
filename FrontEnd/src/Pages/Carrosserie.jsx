import CustomNavbar from "../Components/NavBar/Navbar";
import FormServices from "../Components/FormServices/FormServices";
import Footer from "../Components/Footer/Footer";
import CarrossImage from '../assets/Images/carrosserie.jpg';
import { Helmet } from 'react-helmet-async';

const Carrosserie = () => {
  const pageTitle = "Carrosserie d'Excellence";
  const pageDescription = "Profitez de services de carrosserie d'excellence pour votre véhicule. Réparation, peinture et plus encore.";

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
