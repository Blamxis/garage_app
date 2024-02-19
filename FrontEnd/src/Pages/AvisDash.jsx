import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
      const authToken = localStorage.getItem("authToken");

      axios
        .get(`${apiURL}/avis`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((response) => {
          setAvisData(Array.isArray(response.data) ? response.data : []);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des avis :", error);
        });
    }
  }, [isAuthenticated]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked && Array.isArray(avisData)) {
      const newSelecteds = avisData.map((n) => n.Id_avis);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleAddAvis = (avisDataToAdd) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");

    axios
      .post(`${apiURL}/avis`, avisDataToAdd, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setAvisData([...avisData, response.data]);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'avis :", error);
      });
  };

  const handleEditAvis = (avisDataToEdit) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");

    axios
      .put(`${apiURL}/avis/${avisDataToEdit.Id_avis}`, avisDataToEdit, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        const updatedData = Array.isArray(avisData) && avisData.map((avis) =>
          avis.Id_avis === response.data.Id_avis ? response.data : avis
        );
        setAvisData(updatedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification de l'avis :", error);
        console.log(error.response);
      });
  };

  const handleDeleteAvis = (selectedAvisIds) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");

    const deletePromises = Array.isArray(selectedAvisIds) && selectedAvisIds.map((avisId) =>
      axios.delete(`${apiURL}/avis/${avisId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
    );

    Promise.all(deletePromises)
      .then(() => {
        const updatedData = avisData.filter(
          (avis) => !selectedAvisIds.includes(avis.Id_avis)
        );
        setAvisData(updatedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'avis :", error);
      });
  };

  const idField = "Id_avis";

  const pageTitle = "Gestion des Avis - Tableau de bord";
  const pageDescription =
    "Modifiez, ajoutez ou supprimez des avis sur votre tableau de bord.";

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
            <h1>Gestion des Avis</h1>
            <EnhancedTable
              columns={[
                { id: "Nom", label: "Nom" },
                { id: "Prenom", label: "Prénom" },
                { id: "Description", label: "Description" },
                { id: "Date", label: "Date" },
                { id: "Note", label: "Note" },
                { id: "Status", label: "Statut" },
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
    </>
  );
}

export default AvisDash;
