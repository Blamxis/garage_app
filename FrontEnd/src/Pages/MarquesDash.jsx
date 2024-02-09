import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

function MarquesDash() {
  const { isAuthenticated } = useAuth();
  const [marquesData, setMarquesData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem('authToken');

      axios.get(`${apiURL}/admin/marques`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }).then(response => {
        setMarquesData(response.data);
      }).catch(error => {
        console.error("Erreur lors de la récupération des marques :", error);
      });
    }
  }, [isAuthenticated]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = marquesData.map((n) => n.id);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleAddMarque = (marqueDataToAdd) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    axios.post(`${apiURL}/marques`, marqueDataToAdd, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    }).then(response => {
      setMarquesData([...marquesData, response.data]);
    }).catch(error => {
      console.error("Erreur lors de l'ajout de la marque :", error);
    });
  };

  const handleEditMarque = (marqueDataToEdit) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    axios.put(`${apiURL}/admin/marques/${marqueDataToEdit.Id_marques}`, marqueDataToEdit, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    }).then(response => {
      console.log("Réponse de la mise à jour :", response);
      const updatedData = marquesData.map(marque =>
        marque.Id_marques === response.data.Id_marques ? response.data : marque
      );
      setMarquesData(updatedData);
    }).catch(error => {
      console.error("Erreur lors de la modification de la marque :", error);
    });
  };

  const handleDeleteMarque = (selectedMarqueIds) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    const deletePromises = selectedMarqueIds.map(marqueId =>
      axios.delete(`${apiURL}/admin/marques/${marqueId}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
    );

    Promise.all(deletePromises).then(() => {
      const updatedData = marquesData.filter(
        marque => !selectedMarqueIds.includes(marque.Id_marques)
      );
      setMarquesData(updatedData);
    }).catch(error => {
      console.error("Erreur lors de la suppression de la marque :", error);
    });
  };

  const idField = "Id_marques";

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>Gestion des Marques</h1>
          <EnhancedTable
            columns={[
              { id: "Nom", label: "Nom" }
            ]}
            data={marquesData}
            onAdd={handleAddMarque}
            onEdit={handleEditMarque}
            onDelete={handleDeleteMarque}
            idField={idField}
            onSelectAllClick={handleSelectAllClick}
            numSelected={selected.length}
          />
        </div>
      )}
    </div>
  );
}

export default MarquesDash;
