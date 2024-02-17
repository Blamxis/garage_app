import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../Context/AuthContext";

function HorairesDash() {
  const { isAuthenticated } = useAuth();
  const [horairesData, setHorairesData] = useState([]);
  const [joursData, setJoursData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem("authToken");

      // Récupérer les données des horaires et des jours
      Promise.all([
        axios.get(`${apiURL}/horaires`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        axios.get(`${apiURL}/jours`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      ])
        .then(([horairesResponse, joursResponse]) => {
          setHorairesData(horairesResponse.data);
          setJoursData(joursResponse.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  // Fonctions pour gérer les horaires
  const handleAddData = async (dataToAdd) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.post(`${apiURL}/admin/horaires`, dataToAdd, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setHorairesData([...horairesData, response.data]);
    } catch (error) {
      console.error("Erreur lors de l'ajout des données :", error);
    }
  };

  const handleEditData = async (dataToEdit) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.put(
        `${apiURL}/admin/horaires/${dataToEdit.Id_horaire}`,
        dataToEdit,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const updatedData = horairesData.map((data) =>
        data.Id_horaire === response.data.Id_horaire ? response.data : data
      );
      setHorairesData(updatedData);
    } catch (error) {
      console.error("Erreur lors de la modification des données :", error);
    }
  };

  const handleDeleteData = async (idToDelete) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.delete(`${apiURL}/admin/horaires/${idToDelete}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const updatedData = horairesData.filter(
        (data) => data.Id_horaire !== idToDelete
      );
      setHorairesData(updatedData);
    } catch (error) {
      console.error("Erreur lors de la suppression des données :", error);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  const horairesAvecJours = associerJoursAvecHoraires(horairesData, joursData);

  const idField = "Id_horaire" && "Id_jours";

  const pageTitle = "Gestion des Horaires - Tableau de bord";
  const pageDescription =
    "Gérez les horaires d'ouverture et de fermeture de votre établissement facilement depuis le tableau de bord.";

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

      {isAuthenticated && (
        <div>
          <h1>Gestion des Horaires et des Jours</h1>
          <EnhancedTable
            columns={[
              {
                id: "NomJour",
                label: "Jours",
                format: (data) => (data.Jour ? data.Jour : "Dimanche"),
              },
              {
                id: "Horaire_ouverture",
                label: "Horaire Ouverture",
                format: (data) => data.Horaire_ouverture,
              },
              {
                id: "Horaire_fermeture",
                label: "Horaire Fermeture",
                format: (data) => data.Horaire_fermeture,
              },
              {
                id: "Horaire_ouverture_aprem",
                label: "Horaire Ouverture Après-midi",
                format: (data) => data.Horaire_ouverture_aprem,
              },
              {
                id: "Horaire_fermeture_aprem",
                label: "Horaire Fermeture Après-midi",
                format: (data) => data.Horaire_fermeture_aprem,
              },
            ]}
            data={horairesAvecJours}
            onAdd={handleAddData}
            onEdit={handleEditData}
            onDelete={handleDeleteData}
            idField={idField}
          />
        </div>
      )}
    </div>
  );
}

export default HorairesDash;

function associerJoursAvecHoraires(horaires, jours) {
  return horaires.map((horaire, index) => {
    const jourCorrespondant = jours.find(
      (jour) => jour.Id_jours === horaire.Id_jours
    );
    return {
      ...horaire,
      Jour: jourCorrespondant ? jourCorrespondant.Nom : "Inconnu",
      key: `${horaire.Id_horaire}_${index}`,
      NomJour: jourCorrespondant ? jourCorrespondant.Nom : "Dimanche",
    };
  });
}
