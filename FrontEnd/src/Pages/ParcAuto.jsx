import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from '../Components/NavBar/Navbar';
import CarCard from '../Components/CarCard/CarCard';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Footer from '../Components/Footer/Footer';

const ParcAuto = () => {
  const [annonces, setAnnonces] = useState([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filterType, setFilterType] = useState('modele');
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAnnoncesAndVoitures = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiURL}/annonces`);
        setAnnonces(response.data);
        setFilteredAnnonces(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces', error);
        setError('Une erreur est survenue lors du chargement des annonces.');
        setIsLoading(false);
      }
    };

    fetchAnnoncesAndVoitures();
  }, [apiURL]);

  useEffect(() => {
    filterAnnonces();
  }, [filterValue, filterType, annonces]);

  const handleCardClick = (id) => {
    navigate(`/parc-auto/${id}`);
  };

  const filterAnnonces = () => {
    const value = filterValue.toLowerCase();
    const filtered = annonces.filter(annonce => {
      const voiture = annonce.Voiture;
      switch (filterType) {
        case 'modele':
          return voiture.Modele.Nom.toLowerCase().includes(value);
        case 'annee':
          return voiture.Annee.toString().includes(value);
        case 'kilometrage': {
          const maxKilometrage = parseInt(value, 10);
          return isNaN(maxKilometrage) || voiture.Kilometrage <= maxKilometrage;
        } 
        case 'prix': {
          const maxPrix = parseFloat(value);
          return isNaN(maxPrix) || voiture.Prix <= maxPrix;
        }
        default:
          return true;
      }
    });

    setFilteredAnnonces(filtered);
  };

  return (
    <div className="page-container">
      <CustomNavbar />
      <div className="parc-auto-container">
        <h1 className="parc-auto-title">- VÉHICULES D&apos;OCCASION -</h1>
        <div className="filters">
          <FormControl className="filter-select">
            <InputLabel id="filter-type-select-label">Filtrer par</InputLabel>
            <Select
              labelId="filter-type-select-label"
              id="filter-type-select"
              value={filterType}
              label="Filtrer par"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="modele">Modèles</MenuItem>
              <MenuItem value="annee">Année</MenuItem>
              <MenuItem value="kilometrage">Kilométrage</MenuItem>
              <MenuItem value="prix">Prix</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="filter-input"
            label="Recherche"
            variant="outlined"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        <div className="annonce-counter">
          {filteredAnnonces.length} voiture(s) en vente
        </div>
        {isLoading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredAnnonces.length > 0 ? (
          <Grid container spacing={2}>
            {filteredAnnonces.map(annonce => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={annonce.Id_annonces}>
                <CarCard annonce={annonce} onClick={() => handleCardClick(annonce.Id_annonces)} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>Je n&apos;ai pas compris votre demande, veuillez être plus précis...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ParcAuto;
