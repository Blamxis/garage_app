import { useState, useEffect } from 'react';
import axios from 'axios';

const Horaires = () => {
  const [horaires, setHoraires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    setLoading(true);

    axios.get(`${apiURL}/horaires`)
      .then(response => {
        setHoraires(response.data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  const formatHoraires = (horaire) => {
    const formatHeure = (heure) => {
      const completTime = heure.split(':');
      const [hour, minute] = completTime;
      return `${hour}:${minute}`;
    }
    const horairesMatin = `${formatHeure(horaire.Horaire_ouverture)}-${formatHeure(horaire.Horaire_fermeture)}`;
    const horairesAprem = horaire.Horaire_ouverture_aprem && horaire.Horaire_fermeture_aprem
      ? `/${formatHeure(horaire.Horaire_ouverture_aprem)}-${formatHeure(horaire.Horaire_fermeture_aprem)}`
      : '';

    return `${horairesMatin}${horairesAprem}`;
  };

  return (
    <ul className="horaires-list container">
      {horaires.map((horaire, index) => (
        <li key={`${horaire.Id_horaire}-${index}`} className="left-column">
          {horaire.Jour ? (
            <div>
              <span className="description">{horaire.Jour.Nom} : </span>
              <span className="time">{formatHoraires(horaire)}</span>
            </div>
          ) : (
            <div>
              <span className="description">Dimanche : </span> 
              <span className="time">Fermé</span> 
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Horaires;
