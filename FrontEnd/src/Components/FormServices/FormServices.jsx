import { useState } from 'react';
import ServiceSelector from './ServiceSelector';
import axios from 'axios';
import PropTypes from 'prop-types';
import './FormServices.scss'; 

const FormServices = ({ serviceType }) => {
  const [selectedService, setSelectedService] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleServiceSelect = (event) => {
    setSelectedService(event.target.value);
  };

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTelephoneChange = (event) => {
    setTelephone(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = {
      Objet: selectedService,
      Type: serviceType,
      Nom: nom,
      Prenom: prenom,
      Email: email,
      Telephone: telephone,
      Description: description,
    };

    try {
      const apiURL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiURL}/messages`, formData);

      if (response.status === 201) {
        setSnackbarMessage('Votre message a été envoyé avec succès !');
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000); 
        setSelectedService(''); 
        setNom('');
        setPrenom('');
        setEmail('');
        setTelephone('');
        setDescription('');
      } else {
        setSnackbarMessage('Une erreur est survenue lors de l\'envoi du formulaire.');
        setShowSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('Erreur de connexion au serveur. Veuillez réessayer plus tard.');
      setShowSnackbar(true);
      console.error('Erreur de connexion au serveur :', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="custom-form">
        <h2>Contactez Nous :</h2>
        <ServiceSelector serviceType={serviceType} onServiceSelect={handleServiceSelect} />

        <input
          type="text"
          id="Nom"
          name="Nom"
          value={nom}
          onChange={handleNomChange}
          placeholder="Nom"
          required
        />

        <input
          type="text"
          id="Prenom"
          name="Prenom"
          value={prenom}
          onChange={handlePrenomChange}
          placeholder="Prénom"
          required
        />

        <input
          type="email"
          id="Email"
          name="Email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />

        <input
          type="tel"
          id="Telephone"
          name="Telephone"
          value={telephone}
          onChange={handleTelephoneChange}
          placeholder="Téléphone"
          required
        />

        <textarea
          id="Description"
          name="Description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description..."
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Envoi en cours...' : 'Soumettre'}
        </button>
      </form>
      {showSnackbar && (
        <div className="snackbar">
          {snackbarMessage}
        </div>
      )}
    </div>
  );
};

FormServices.propTypes = {
  serviceType: PropTypes.string.isRequired,
};

export default FormServices;
