import Footer from "../Components/Footer/Footer";
import FormContact from "../Components/FormContact/FormContact";
import CustomNavbar from "../Components/NavBar/Navbar";
import logoImage from '../assets/Images/Logo_FInal-ok.png'; 
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const pageTitle = "Contactez-nous - PAT GARAGE";
    const pageDescription = "Contactez-nous pour toute question, demande de service ou renseignements.";

    return (
      <div className="contact-container">
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
        <div className="contact-header">
          <h1>- CONTACT -</h1>
        </div>
        <div className="content">
          <div className="form-contact">
            <FormContact />
          </div>
          <img src={logoImage} alt="Logo" className="contact-logo" />
        </div>
        <Footer />
      </div>
    );
};

export default Contact;

