import { useState } from 'react';
import axios from 'axios';
import './FormContact.scss'; 

const FormContact = () => {
  const [formData, setFormData] = useState({
    Objet: '',
    Nom: '',
    Prenom: '',
    Email: '',
    Telephone: '',
    Description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const apiURL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiURL}/messages`, {
        ...formData,
        Type: 'contact',
      });

      if (response.status === 201) {
        setSnackbarMessage('Votre message a été envoyé avec succès.');
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000);
        setFormData({
          Objet: '',
          Nom: '',
          Prenom: '',
          Email: '',
          Telephone: '',
          Description: '',
        });
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
        <input
          type="text"
          name="Objet"
          value={formData.Objet}
          onChange={handleChange}
          placeholder="Objet"
          required
        />
        <input
          type="text"
          name="Nom"
          value={formData.Nom}
          onChange={handleChange}
          placeholder="Nom"
          required
        />
        <input
          type="text"
          name="Prenom"
          value={formData.Prenom}
          onChange={handleChange}
          placeholder="Prénom"
          required
        />
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          name="Telephone"
          value={formData.Telephone}
          onChange={handleChange}
          placeholder="Téléphone"
          required
        />
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Description..."
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Envoi en cours...' : 'Envoyer'}
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

export default FormContact;
