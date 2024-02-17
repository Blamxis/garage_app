import { Helmet } from 'react-helmet-async';
import CustomNavbar from "../Components/NavBar/Navbar";
import StarRatingForm from '../Components/AvisForm/AvisForm';
import Footer from '../Components/Footer/Footer';

const Avis = () => {
    const pageTitle = "Votre Avis";
    const pageDescription = "Partagez votre expérience et aidez-nous à améliorer notre service en laissant un avis.";

    return (
        <div className="page-avis">
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
            <h1>- LAISSER NOUS UN AVIS -</h1>
            <StarRatingForm />
            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
};

export default Avis;

