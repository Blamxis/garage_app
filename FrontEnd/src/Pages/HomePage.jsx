import CustomNavbar from "../Components/Navbar";
import backgroundImage from "../assets/Images/background_Camaro_SS_69.jpg";
import logoImage from "../assets/Images/Logo_FInal-ok.png";
import Mecano from "../assets/Images/Mécanicien.jpg";

const HomePage = () => {
  const scrollToSection = () => {
    document.getElementById("section-id").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <CustomNavbar />
      <div
        className="background-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <img src={logoImage} alt="Logo" className="centered-logo" />
        <button onClick={scrollToSection} className="scroll-button">
        <span className="arrow-down"></span>
        </button>
      </div>
      <div id="section-id" className="about">
        <div className="content-wrapper">
          <div className="image-section">
            <img src={Mecano} alt="Portrait" className="centered-portrait" />
          </div>
          <div className="text-section">
            <h2>Qui Sommes-Nous ?</h2>
            <p>Je suis Vincent Parrot , le fondateur et passionné de l automobile qui a donné naissance à cet atelier. Depuis notre ouverture, nous avons placé la confiance de nos clients au cœur de notre mission.<br /></p>
            <p>Chez nous, chaque moteur, chaque roue, chaque écrou est traité avec le respect qu il mérite. Nous ne nous contentons pas de réparer des véhicules, nous les ramenons à la vie. C est l âme de l automobile qui nous inspire.<br /></p>
            <p>Que vous veniez pour une simple révision ou pour un projet de restauration ambitieux, vous pouvez être assuré que notre équipe d experts, formée à l ancienne et toujours à l affût des dernières technologies, mettra tout en œuvre pour surpasser vos attentes.</p>
          </div>
        </div>
      </div>
      <div className="services-section">
        <h2>- DÉCOUVREZ NOS PRESTATIONS -</h2>
        <p>Bienvenue au Garage Automobile PAT, votre destination ultime pour tous vos besoins en matière d automobile. Nous sommes fiers de vous offrir une gamme complète 
          de services qui couvrent chaque aspect de votre voiture, de la mécanique à la carrosserie, de la révision minutieuse à la vente de véhicules d occasion.</p>
        <h3>Mécanique de Précision :</h3>
        <p>Notre équipe d experts en mécanique met son savoir-faire au service de votre véhicule. Que ce soit pour une réparation, un entretien régulier ou un diagnostic complexe, nous sommes équipés pour relever tous les défis.</p>
        <h3>Carrosserie d Excellence :</h3>
        <p>Des chocs mineurs aux réparations majeures, notre équipe de carrossiers hautement qualifiés redonnera à votre voiture son aspect d origine. Nous utilisons des techniques modernes et des matériaux de qualité pour des résultats impeccables.</p>
        <h3>Révision Complète :</h3>
        <p>Votre sécurité est notre priorité. Nos techniciens effectuent des révisions exhaustives, inspectant chaque composant de votre véhicule pour s assurer qu il fonctionne de manière optimale.</p>
        <h3>Vente de Véhicules d Occasion :</h3>
        <p>En quête d un nouveau compagnon de route ? Notre sélection soigneusement choisie de véhicules d occasion répondra à tous les besoins et préférences. Chaque voiture est minutieusement inspectée et entretenue pour vous garantir une expérience de conduite fiable.</p>
      </div>
    </div>
  );
};

export default HomePage;
