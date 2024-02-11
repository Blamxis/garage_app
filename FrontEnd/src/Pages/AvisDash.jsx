import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

function AvisDash() {
  const { isAuthenticated } = useAuth();
  const [avisData, setAvisData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem('authToken');

      axios.get(`${apiURL}/avis`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }).then(response => {
        setAvisData(response.data);
      }).catch(error => {
        console.error("Erreur lors de la récupération des avis :", error);
      });
    }
  }, [isAuthenticated]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = avisData.map((n) => n.Id_avis);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleAddAvis = (avisDataToAdd) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    axios.post(`${apiURL}/avis`, avisDataToAdd, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    }).then(response => {
      setAvisData([...avisData, response.data]);
    }).catch(error => {
      console.error("Erreur lors de l'ajout de l'avis :", error);
    });
  };

  const handleEditAvis = (avisDataToEdit) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    axios.put(`${apiURL}/avis/${avisDataToEdit.Id_avis}`, avisDataToEdit, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    }).then(response => {
      const updatedData = avisData.map(avis =>
        avis.Id_avis === response.data.Id_avis ? response.data : avis
      );
      setAvisData(updatedData);
    }).catch(error => {
      console.error("Erreur lors de la modification de l'avis :", error);
      console.log(error.response);
    });
  };

  const handleDeleteAvis = (selectedAvisIds) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    const deletePromises = selectedAvisIds.map(avisId =>
      axios.delete(`${apiURL}/avis/${avisId}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
    );

    Promise.all(deletePromises).then(() => {
      const updatedData = avisData.filter(
        avis => !selectedAvisIds.includes(avis.Id_avis)
      );
      setAvisData(updatedData);
    }).catch(error => {
      console.error("Erreur lors de la suppression de l'avis :", error);
    });
  };

  const idField = "Id_avis";

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>Gestion des Avis</h1>
          <EnhancedTable
            columns={[
              { id: "Nom", label: "Nom" },
              { id: "Prenom", label: "Prénom" },
              { id: "Description", label: "Description" },
              { id: "Date", label: "Date" },
              { id: "Note", label: "Note" },
              { id: "Status", label: "Statut" }
            ]}
            data={avisData}
            onAdd={handleAddAvis}
            onEdit={handleEditAvis}
            onDelete={handleDeleteAvis}
            idField={idField}
            onSelectAllClick={handleSelectAllClick}
            numSelected={selected.length}
          />
        </div>
      )}
    </div>
  );
}

export default AvisDash;
