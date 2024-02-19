import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { Switch } from "@mui/material";
import { Helmet } from "react-helmet-async";

function AnnoncesDash() {
  const { isAuthenticated, userId } = useAuth();
  const [annoncesData, setAnnoncesData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [voitureList, setVoitureList] = useState([]);
  const [allVoitures, setAllVoitures] = useState([]);

  const apiURL = import.meta.env.VITE_API_URL;
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnnoncesAndVoitures();
    }
  }, [isAuthenticated]);

  const fetchAnnoncesAndVoitures = async () => {
    try {
      const annoncesResponse = await axios.get(
        `${apiURL}/annonces?includeInvisible=true`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const voituresResponse = await axios.get(
        `${apiURL}/voitures?include=model`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setAnnoncesData(
        Array.isArray(annoncesResponse.data) ? annoncesResponse.data : []
      );
      setAllVoitures(
        Array.isArray(voituresResponse.data) ? voituresResponse.data : []
      );

      const voitureIdsUsed = annoncesResponse.data.map((a) => a.Id_voiture);
      const updatedVoitureList = voituresResponse.data.filter(
        (voiture) => !voitureIdsUsed.includes(voiture.Id_voiture)
      );
      setVoitureList(updatedVoitureList);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const handleAddAnnonce = async (annonceDataToAdd) => {
    try {
      await axios.post(
        `${apiURL}/annonces`,
        { ...annonceDataToAdd, Id_user: userId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      fetchAnnoncesAndVoitures();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce:", error);
    }
  };

  const handleEditAnnonce = async (annonceDataToEdit) => {
    try {
      await axios.put(
        `${apiURL}/annonces/${annonceDataToEdit.Id_annonces}`,
        annonceDataToEdit,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      fetchAnnoncesAndVoitures();
    } catch (error) {
      console.error("Erreur lors de la modification de l'annonce:", error);
    }
  };

  const handleDeleteAnnonce = async (selectedAnnonceIds) => {
    try {
      await Promise.all(
        selectedAnnonceIds.map((annonceId) =>
          axios.delete(`${apiURL}/annonces/${annonceId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
        )
      );
      fetchAnnoncesAndVoitures();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce:", error);
    }
  };

  const handleVisibilityChange = async (id, currentVisibility) => {
    try {
      await axios.put(
        `${apiURL}/annonces/${id}`,
        { IsVisible: !currentVisibility },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      fetchAnnoncesAndVoitures();
    } catch (error) {
      console.error("Erreur lors de la modification de la visibilité:", error);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked && Array.isArray(annoncesData)) {
      const newSelecteds = annoncesData.map((n) => n.Id_annonces);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const pageTitle = "Dashboard - Gestion des Annonces";
  const pageDescription =
    "Administrez les annonces de voitures facilement depuis le tableau de bord.";

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

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      <div>
        {isAuthenticated && (
          <div>
            <h1>Gestion des Annonces</h1>
            <EnhancedTable
              columns={[
                { id: "Nom", label: "Nom" },
                { id: "Date_publication", label: "Date de publication" },
                {
                  id: "Id_voiture",
                  label: "Voiture",
                  render: (row) => {
                    const voiture = allVoitures.find(
                      (v) => v.Id_voiture === row.Id_voiture
                    );
                    return voiture ? voiture.Modele.Nom : "Modèle inconnu";
                  },
                },
                { id: "Carburant", label: "Carburant" },
                { id: "Transmission", label: "Transmission" },
                {
                  id: "Id_user",
                  label: "Utilisateur",
                  defaultValue: userId,
                  readOnly: true,
                },
                {
                  id: "IsVisible",
                  label: "Visible",
                  render: (row) => (
                    <Switch
                      checked={row.IsVisible}
                      onChange={() =>
                        handleVisibilityChange(row.Id_annonces, row.IsVisible)
                      }
                    />
                  ),
                },
              ]}
              data={annoncesData}
              onAdd={handleAddAnnonce}
              onEdit={handleEditAnnonce}
              onDelete={handleDeleteAnnonce}
              idField="Id_annonces"
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
              userId={userId}
              voitureList={voitureList}
              allVoitures={allVoitures}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AnnoncesDash;
