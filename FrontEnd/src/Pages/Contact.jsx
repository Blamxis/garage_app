import Footer from "../Components/Footer/Footer";
import FormContact from "../Components/FormContact/FormContact";
import CustomNavbar from "../Components/NavBar/Navbar";
import logoImage from '../assets/Images/Logo_FInal-ok.png'; 

const Contact = () => {
    return (
      <div className="contact-container">
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
