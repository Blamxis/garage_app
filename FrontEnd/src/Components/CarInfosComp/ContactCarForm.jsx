import { useState } from 'react';
import axios from 'axios'; 
import PropTypes from 'prop-types'; 
import { Dialog, DialogContent, TextField, Button, DialogTitle, Box } from '@mui/material';


const ContactForm = ({ open, onClose, defaultSubject }) => {
  
  const [formData, setFormData] = useState({
    Nom: '',
    Prenom: '',
    Email: '',
    Telephone: '',
    Description: '',
    Objet: defaultSubject, 
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [showSnackbar, setShowSnackbar] = useState(false); 

  // Fonction de gestion du changement des champs de formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setIsLoading(true); 

    try {
      const apiURL = import.meta.env.VITE_API_URL; 
      const response = await axios.post(`${apiURL}messages`, { 
        ...formData,
        Type: 'voitures', 
      });

      if (response.status === 201) { 
        setSnackbarMessage('Votre message a été envoyé avec succès.'); 
        setShowSnackbar(true); 
        setTimeout(() => {
          setShowSnackbar(false); 
          setFormData({ 
            Nom: '',
            Prenom: '',
            Email: '',
            Telephone: '',
            Description: '',
            Objet: defaultSubject,
          });
        }, 3000); 
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

    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Formulaire de Contact pour {formData.Objet}</DialogTitle> 
      <DialogContent> 
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Modèle et Année"
            name="Objet"
            value={formData.Objet}
            onChange={handleChange}
            margin="normal"
            InputProps={{ readOnly: true }}
          />
          <TextField
            fullWidth
            label="Nom"
            name="Nom"
            value={formData.nom}
            onChange={handleChange}
            margin="normal"
            required 
          />
          <TextField
            fullWidth
            label="Prénom"
            name="Prenom"
            value={formData.prenom}
            onChange={handleChange}
            margin="normal"
            required 
          />
          <TextField
            fullWidth
            label="Email"
            name="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required 
          />
          <TextField
            fullWidth
            label="Téléphone"
            name="Telephone"
            value={formData.telephone}
            onChange={handleChange}
            margin="normal"
            required 
          />
          <TextField
            fullWidth
            label="Message"
            name="Description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required 
            multiline 
            rows={4}
          />
          <Box textAlign="right" mt={2}> 
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              {isLoading ? 'Envoi en cours...' : 'Envoyer'} 
            </Button>
          </Box>
        </form>

        {showSnackbar && (
          <div className="snackbar">
            {snackbarMessage}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};


ContactForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  defaultSubject: PropTypes.string,
};

export default ContactForm;
