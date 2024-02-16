import CustomNavbar from "../Components/NavBar/Navbar";
import StarRatingForm from '../Components/AvisForm/AvisForm';
import Footer from '../Components/Footer/Footer';

const Avis = () => {
    return (
        <div className="page-avis">
            <CustomNavbar />
            <h1>- LAISSER NOUS UN AVIS -</h1>
            <StarRatingForm />
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
};

export default Avis;