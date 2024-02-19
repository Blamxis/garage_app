import { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "../Components/NavBar/Navbar";
import { useParams } from "react-router-dom";
import ContactForm from "../Components/CarInfosComp/ContactCarForm";
import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Typography,
  Button,
  Box,
  Grid,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import Footer from "../Components/Footer/Footer";

const CarInfos = () => {
  const [annonce, setAnnonce] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const { id } = useParams();
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAnnonceDetails = async () => {
      try {
        const response = await axios.get(`${apiURL}/annonces/${id}`);
        setAnnonce(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'annonce",
          error
        );
      }
    };

    fetchAnnonceDetails();
  }, [id, apiURL]);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (!annonce) {
    return (
      <>
        <CustomNavbar />
        <Box textAlign="center" sx={{ my: 5 }}>
          <Typography>Chargement des détails de l&apos;annonce...</Typography>
        </Box>
        <Footer />
      </>
    );
  }

  const pageTitle = annonce
    ? `Détails de ${annonce.Voiture.Modele.Nom}`
    : "Chargement...";
  const pageDescription = annonce
    ? `Découvrez les détails de ${annonce.Voiture.Modele.Nom}, année ${annonce.Voiture.Annee}.`
    : "Détails de l'annonce en cours de chargement...";
  const ogImageUrl = annonce
    ? `${apiURL}${annonce.Voiture.Images[0].Url}`
    : "https://www.votre-site-web.com/default-image.jpg";

  return (
    <>
      <Helmet>
        {/* Métadonnées standards */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      <CustomNavbar />
      <Container maxWidth="lg" className="carInfoContainer">
        <Grid container spacing={4} alignItems="center" className="carInfoGrid">
          <Grid item xs={12} md={6} className="carSlider">
            <Slider {...settings}>
              {Array.isArray(annonce.Voiture.Images) && annonce.Voiture.Images.map((img, index) => (
                <Box key={index} className="imageBox">
                  <img
                    src={`${apiURL}${img.Url}`}
                    alt={`Image de ${annonce.Voiture.Modele.Nom}`}
                    className="carImage"
                  />
                </Box>
              ))}
            </Slider>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="carInfoCard">
              <CardContent>
                <Typography variant="h4" gutterBottom className="carModel">
                  {annonce.Voiture.Modele.Nom}
                </Typography>
                <Typography variant="h6" className="carYear">
                  Année: {annonce.Voiture.Annee}
                </Typography>
                <Typography variant="h6" className="carMileage">
                  Kilométrage: {annonce.Voiture.Kilometrage} km
                </Typography>
                <Typography variant="h6" className="carPrice">
                  Prix:{" "}
                  <span className="priceValue">{annonce.Voiture.Prix} € </span>
                </Typography>
                <Typography variant="h6" className="carFuel">
                  Carburant: {annonce.Carburant}
                </Typography>
                <Typography variant="h6" className="carTransmission">
                  Transmission: {annonce.Transmission}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  mt={2}
                  className="contactButtonBox"
                >
                  <Button
                    variant="contained"
                    onClick={handleOpenForm}
                    className="contactButton"
                  >
                    Contact
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <ContactForm
          open={openForm}
          onClose={handleCloseForm}
          defaultSubject={`${annonce.Voiture.Modele.Nom} - ${annonce.Voiture.Annee}`}
          className="contactForm"
        />
      </Container>
      <Footer />
    </>
  );
};

export default CarInfos;
