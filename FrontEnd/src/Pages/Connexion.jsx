import CustomNavbar from "../Components/NavBar/Navbar";
import LoginForm from '../Components/LoginForm/LoginForm';
import logoImage from "../assets/Images/Logo_FInal-ok.png";
import Footer from "../Components/Footer/Footer";
import { Helmet } from 'react-helmet-async';

const Connexion = () => {
    const pageTitle = "Connexion - PAT GARAGE";
    const pageDescription = "Connectez-vous pour accéder à votre espace personnel et profiter de nos services.";

    return (
      <div className="connexion-container">
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
        <div className="login-area">
          <LoginForm />
        </div>
        <div className="contact-info">
          <p>Contactez-nous</p>
          <p>01 02 03 04 05</p>
        </div>
        <div className="social-media-links">
        </div>
        <div className="logo">
          <img src={logoImage} alt="Logo" className="custom-logo" />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
};

export default Connexion;
