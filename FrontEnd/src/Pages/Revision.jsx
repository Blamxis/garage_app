import CustomNavbar from "../Components/NavBar/Navbar";
import FormServices from "../Components/FormServices/FormServices";
import Footer from "../Components/Footer/Footer";
import RevisImage from '../assets/Images/revision.jpg';
import { Helmet } from 'react-helmet-async';

const Revision = () => {

  const pageTitle = "Révision Complète - PAT Garage";
  const pageDescription = "Profitez d'un service de révision complet pour votre véhicule. Entretien et inspection de qualité.";

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
