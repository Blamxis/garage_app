import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

function ModeleDash() {
  const { isAuthenticated } = useAuth();
  const [modelesData, setModelesData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem('authToken');

      axios.get(`${apiURL}/modeles`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }).then(response => {
        setModelesData(response.data);
      }).catch(error => {
        console.error("Erreur lors de la récupération des modèles :", error);
      });
    }
  }, [isAuthenticated]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = modelesData.map((n) => n.Id_modeles);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleAddModele = (modeleDataToAdd) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    axios.post(`${apiURL}/modeles`, modeleDataToAdd, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    }).then(response => {
      setModelesData([...modelesData, response.data]);
    }).catch(error => {
      console.error("Erreur lors de l'ajout du modèle :", error);
    });
  };

  const handleEditModele = (modeleDataToEdit) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    axios.put(`${apiURL}/modeles/${modeleDataToEdit.Id_modeles}`, modeleDataToEdit, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    }).then(response => {
      const updatedData = modelesData.map(modele =>
        modele.Id_modeles === response.data.Id_modeles ? response.data : modele
      );
      setModelesData(updatedData);
    }).catch(error => {
      console.error("Erreur lors de la modification du modèle :", error);
    });
  };

  const handleDeleteModele = (selectedModeleIds) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    const deletePromises = selectedModeleIds.map(modeleId =>
      axios.delete(`${apiURL}/modeles/${modeleId}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
    );

    Promise.all(deletePromises).then(() => {
      const updatedData = modelesData.filter(
        modele => !selectedModeleIds.includes(modele.Id_modeles)
      );
      setModelesData(updatedData);
    }).catch(error => {
      console.error("Erreur lors de la suppression du modèle :", error);
    });
  };

  const idField = "Id_modeles";

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>Gestion des Modèles</h1>
          <EnhancedTable
            columns={[
              { id: "Nom", label: "Nom" }
            ]}
            data={modelesData}
            onAdd={handleAddModele}
            onEdit={handleEditModele}
            onDelete={handleDeleteModele}
            idField={idField}
            onSelectAllClick={handleSelectAllClick}
            numSelected={selected.length}
          />
        </div>
      )}
    </div>
  );
}

export default ModeleDash;
