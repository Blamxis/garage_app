import CustomNavbar from "../Components/NavBar/Navbar";
import LoginForm from '../Components/LoginForm/LoginForm';
import logoImage from "../assets/Images/Logo_FInal-ok.png";
import Footer from "../Components/Footer/Footer";


const Connexion = () => {
    return (
      <div className="connexion-container">
        <CustomNavbar />
        <div className="login-area">
          <LoginForm />
        </div>
        <div className="contact-info">
          <p>Contactez-nous</p>
          <p>01 02 03 04 05</p>
        </div>
        <div className="social-media-links">
          {/* Ici, utilisez les icônes appropriées ou des images */}
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
