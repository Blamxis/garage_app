import { Helmet } from 'react-helmet-async';

const NotFound = () => {

    const pageTitle = "Page Non Trouvée - 404 | Votre Entreprise";
    const pageDescription = "La page que vous cherchez semble introuvable.";

    return (
      <div>
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

        <h1>Page Non Trouvée - Erreur 404</h1>
        
      </div>
    );
};
  
export default NotFound;
