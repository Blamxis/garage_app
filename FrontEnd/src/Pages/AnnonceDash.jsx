import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

function AnnoncesDash() {
  const { isAuthenticated, userId } = useAuth();
  const [annoncesData, setAnnoncesData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [voitureList, setVoitureList] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem('authToken');
  
      const fetchAnnonces = axios.get(`${apiURL}/annonces`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
  
      const fetchVoitures = axios.get(`${apiURL}/voitures?include=model`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
  
      Promise.all([fetchAnnonces, fetchVoitures]).then(([annoncesResponse, voituresResponse]) => {
        setAnnoncesData(annoncesResponse.data);
        console.log("Annonces récupérées :", annoncesResponse.data);
  
        const annoncesVoitureIds = annoncesResponse.data.map(a => a.Id_voiture);
        const updatedVoitureList = voituresResponse.data.filter(voiture => 
          !annoncesVoitureIds.includes(voiture.Id_voiture)
        ).map(voiture => ({
          ...voiture,
          Modele: voiture.Modele ? voiture.Modele.Nom : 'Modèle inconnu'
        }));
  
        setVoitureList(updatedVoitureList);
        console.log("Voitures mises à jour :", updatedVoitureList);
      }).catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
      });
    }
  }, [isAuthenticated]);

  const handleAddAnnonce = async (annonceDataToAdd) => {
    try {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem('authToken');
  
      const annonceDataWithUserId = { ...annonceDataToAdd, Id_user: userId };
  
      const response = await axios.post(`${apiURL}/annonces`, annonceDataWithUserId, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
  
      if (Array.isArray(annoncesData)) {
        
        setAnnoncesData([...annoncesData, response.data]);
      } else {
        
        setAnnoncesData([response.data]);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce :", error);
    }
  };


  const handleEditAnnonce = async (annonceDataToEdit) => {
    try {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem('authToken');

      const response = await axios.put(`${apiURL}/annonces/${annonceDataToEdit.Id_annonces}`, annonceDataToEdit, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });

      const updatedData = annoncesData.map(annonce =>
        annonce.Id_annonces === response.data.ID_annonces ? response.data : annonce
      );
      setAnnoncesData(updatedData);
    } catch (error) {
      console.error("Erreur lors de la modification de l'annonce :", error);
    }
  };

  const handleDeleteAnnonce = async (selectedAnnonceIds) => {
    try {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem('authToken');

      const deletePromises = selectedAnnonceIds.map(annonceId =>
        axios.delete(`${apiURL}/annonces/${annonceId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        })
      );

      await Promise.all(deletePromises);

      const updatedData = annoncesData.filter(
        annonce => !selectedAnnonceIds.includes(annonce.Id_annonces)
      );
      setAnnoncesData(updatedData);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = annoncesData.map((n) => n.Id_annonces);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const idField = "Id_annonces";

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>Gestion des Annonces</h1>
          <EnhancedTable
            columns={[
              { id: "Nom", label: "Nom" },
              { id: "Date_publication", label: "Date de publication" },
              { id: "Id_voiture", label: "Voiture", render: (row) => {
                const voiture = voitureList.find(v => v.Id_voiture === row.Id_voiture);
                return voiture ? voiture.Modele : 'Modèle inconnu';} 
              },
              { id: "Id_user", label: "Utilisateur", defaultValue: userId, readOnly: true },
              { id: "IsVisible", label: "Visible" }
            ]}
            
            data={annoncesData}
            onAdd={handleAddAnnonce}
            onEdit={handleEditAnnonce}
            onDelete={handleDeleteAnnonce}
            idField={idField}
            onSelectAllClick={handleSelectAllClick}
            numSelected={selected.length}
            userId={userId}
            voitureList={voitureList}
          />
        </div>
      )}
    </div>
  );
}

export default AnnoncesDash;
