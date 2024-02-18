import { useRef } from "react";
import PropTypes from "prop-types";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarCard = ({ annonce, onClick }) => {
  // Utilisation d'une référence pour accéder aux méthodes du Slider
  const sliderRef = useRef();
  const images = Array.isArray(annonce.Voiture.Images) ? annonce.Voiture.Images : [];


  // Configuration pour le Slider
  const settings = {
    dots: images.length > 1,
    infinite: images.length > 1,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 200,
  };

  const handleMouseEnter = () => images.length > 1 && sliderRef.current.slickPlay();
  const handleMouseLeave = () => images.length > 1 && sliderRef.current.slickPause();

  return (
    <Card 
      className="car-card" 
      onClick={onClick} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      style={{ cursor: 'pointer' }}
    >
      {images.length > 0 ? (
        <Slider ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <CardMedia
                component="img"
                height="280"
                image={`${import.meta.env.VITE_API_URL}${image.Url}`}
                alt={`${annonce.Voiture.Modele.Nom} image ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <CardMedia
          component="img"
          height="280"
          alt="Image par défaut"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {annonce.Voiture.Modele.Nom} - {annonce.Voiture.Annee}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {annonce.Voiture.Kilometrage.toLocaleString()} km - {annonce.Carburant} - {annonce.Transmission}
        </Typography>
        <Typography variant="body2">
          {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(annonce.Voiture.Prix)}
        </Typography>
      </CardContent>
    </Card>
  );
};

CarCard.propTypes = {
  annonce: PropTypes.shape({
    Voiture: PropTypes.shape({
      Modele: PropTypes.shape({
        Nom: PropTypes.string.isRequired,
      }).isRequired,
      Kilometrage: PropTypes.number.isRequired,
      Annee: PropTypes.number.isRequired,
      Prix: PropTypes.number.isRequired,
      Images: PropTypes.arrayOf(
        PropTypes.shape({
          Url: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
    Carburant: PropTypes.string.isRequired,
    Transmission: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

export default CarCard;
