import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Rating, Box, Snackbar, Alert } from '@mui/material';
import './AvisForm.scss';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date, setDate] = useState('');
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = date.split('-').reverse().join('/');

    const formData = {
      Nom: nom,
      Prenom: prenom,
      Description: feedback,
      Date: formattedDate,
      Note: rating,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/avis`, formData);
      setSnackbarMessage('Avis soumis avec succès !');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      setRating(0);
      setFeedback('');
      setNom('');
      setPrenom('');
      setDate('');
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'avis :', error);
      setSnackbarMessage('Erreur lors de la soumission de l\'avis.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Box component="form" className="feedback-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Rating
          className="rating"
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          size="large"
        />
        <TextField
          className="form-field"
          label="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <TextField
          className="form-field"
          label="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        <TextField
          className="form-field"
          label="Date (jj/mm/aaaa)"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          className="form-field"
          label="Votre avis"
          multiline
          rows={4}
          variant="outlined"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <Button type="submit" className="submit-button">Envoyer</Button>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackForm;
