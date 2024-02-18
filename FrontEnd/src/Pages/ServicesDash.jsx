import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { Helmet } from 'react-helmet-async';

function ServicesDash() {
  const { isAuthenticated } = useAuth();
  const [servicesData, setServicesData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem('authToken');

      axios.get(`${apiURL}/admin/services`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }).then(response => {
        setServicesData(Array.isArray(response.data) ? response.data : []);
      }).catch(error => {
        console.error("Erreur lors de la récupération des services :", error);
      });
    }
  }, [isAuthenticated]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = servicesData.map((n) => n.id);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleAddService = (serviceDataToAdd) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    axios.post(`${apiURL}/admin/services`, serviceDataToAdd, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    }).then(response => {
      setServicesData([...servicesData, response.data]);
    }).catch(error => {
      console.error("Erreur lors de l'ajout du service :", error);
    });
  };

  const handleEditService = (serviceDataToEdit) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    axios.put(`${apiURL}/admin/services/${serviceDataToEdit.Id_services}`, serviceDataToEdit, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    }).then(response => {
      const updatedData = servicesData.map(service =>
        service.id === response.data.id ? response.data : service
      );
      setServicesData(updatedData);
    }).catch(error => {
      console.error("Erreur lors de la modification du service :", error);
    });
  };

  const handleDeleteService = (selectedServiceIds) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    const deletePromises = selectedServiceIds.map(serviceId =>
      axios.delete(`${apiURL}/admin/services/${serviceId}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
    );

    Promise.all(deletePromises).then(() => {
      const updatedData = servicesData.filter(
        service => !selectedServiceIds.includes(service.id)
      );
      setServicesData(updatedData);
    }).catch(error => {
      console.error("Erreur lors de la suppression des services :", error);
    });
  };

  const idField = "Id_serv";

  const pageTitle = "Gestion des Services - Votre Entreprise";
  const pageDescription = "Gérez les services proposés par votre entreprise de manière efficace et organisée.";

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
          <h1>Gestion des Services</h1>
          <EnhancedTable
            columns={[
              { id: "Nom", label: "Nom" },
              { id: "Type", label: "Type" },
            ]}
            data={servicesData}
            onAdd={handleAddService}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
            idField={idField}
            onSelectAllClick={handleSelectAllClick}
            numSelected={selected.length}
          />
        </div>
      )}
    </div>
  );
}

export default ServicesDash;
