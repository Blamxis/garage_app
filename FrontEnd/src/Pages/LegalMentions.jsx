import CustomNavBar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Helmet } from "react-helmet-async";

const LegalMentions = () => {
  const pageTitle = "Mentions Légales - PAT Garage";
  const pageDescription =
    "Consultez les mentions légales de PAT Garage, spécialiste de la vente de services automobiles et de véhicules d'occasion.";

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

      <CustomNavBar />
      <main className="main-content" style={{ padding: "20px" }}>
        <h1>Mentions Légales</h1>
        <p>
          <strong>Éditeur du Site :</strong> PAT Garage, une entreprise
          spécialisée dans la vente de services automobiles, ainsi que dans la
          vente de véhicules d&apos;occasion et de collection à destination des
          particuliers et des professionnels.
        </p>
        <p>
          <strong>Adresse :</strong> 391 Rue-Straed Jean-Marie Tjibaou, 56600
          Lanester, France
        </p>
        <p>
          <strong>Téléphone :</strong> +33 1 23 45 67 89
        </p>
        <p>
          <strong>E-mail :</strong> contact@patgarage.fr
        </p>
        <p>
          <strong>Propriétaire :</strong> Vincent Parrot
        </p>
        <p>
          <strong>SIRET :</strong> 123 456 789 01234
        </p>
        <p>
          <strong>RCS :</strong> Lanester B 123 456 789
        </p>
        <p>
          <strong>TVA intracommunautaire :</strong> FR 01 234567890
        </p>
        <p>
          <strong>Directeur de la publication :</strong> Vincent Parrot, en sa
          qualité de propriétaire.
        </p>
        <p>
          <strong>Hébergement du Site :</strong> Le site est hébergé par Vercel,
          www.vercel.com, 06 31 07 34 26.
        </p>
        <h2>Conditions d’utilisation :</h2>
        <p>
          Le site accessible par l&apos;url www.patgarage.com est exploité dans
          le respect de la législation française. L&apos;utilisation de ce site
          est régie par les présentes conditions générales. En utilisant le
          site, vous reconnaissez avoir pris connaissance de ces conditions et
          les avoir acceptées. Celles-ci pourront être modifiées à tout moment
          et sans préavis par la société PAT Garage.
        </p>
        <h2>Limitation de responsabilité :</h2>
        <p>
          Les informations contenues sur ce site sont aussi précises que
          possible et le site est périodiquement remis à jour, mais peut
          toutefois contenir des inexactitudes, des omissions ou des lacunes. Si
          vous constatez une lacune, erreur ou ce qui paraît être un
          dysfonctionnement, merci de bien vouloir le signaler par email, à
          l’adresse contact@patgarage.fr, en décrivant le problème de la manière
          la plus précise possible.
        </p>
        <h2>Propriété intellectuelle :</h2>
        <p>
          Tous les contenus présents sur le site de PAT Garage, incluant, de
          façon non limitative, graphismes, images, textes, vidéos, animations,
          sons, logos, gifs et icônes ainsi que leur mise en forme sont la
          propriété exclusive de la société à l&apos;exception des marques,
          logos ou contenus appartenant à d&apos;autres sociétés partenaires ou
          auteurs.
        </p>
        <h2>Données personnelles :</h2>
        <p>
          Conformément à la loi &quot;informatique et libertés&quot; du 6
          janvier 1978 modifiée en 2018, vous disposez d&apos;un droit
          d&apos;accès, de rectification, de suppression et d&apos;opposition
          aux données personnelles vous concernant. Pour exercer ce droit,
          adressez votre demande à PAT Garage par email à l’adresse suivante :
          contact@patgarage.fr, ou par courrier postal dûment signé, accompagné
          d&apos;une copie du titre d&apos;identité avec signature du titulaire
          de la pièce, en précisant l&apos;adresse à laquelle la réponse doit
          être envoyée.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default LegalMentions;
