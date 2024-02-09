import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

function VoitureDash() {
  // Authentification de l'utilisateur
  const { isAuthenticated } = useAuth();

  // États pour stocker les données des voitures, les éléments sélectionnés et les options de modèle
  const [voituresData, setVoituresData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [modeleOptions, setModeleOptions] = useState([]);

  // Effet pour récupérer les données des voitures, des images et des modèles
  useEffect(() => {
    if (isAuthenticated) {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem("authToken");

      // Fonction pour récupérer les données
      const fetchData = async () => {
        try {
          // Appels parallèles pour récupérer les données des voitures, des images et des modèles
          const [voituresResponse, imagesResponse, modelesResponse] =
            await Promise.all([
              axios.get(`${apiURL}/voitures`, {
                headers: { Authorization: `Bearer ${authToken}` },
              }),
              axios.get(`${apiURL}/admin/images`, {
                headers: { Authorization: `Bearer ${authToken}` },
              }),
              axios.get(`${apiURL}/admin/modeles`, {
                headers: { Authorization: `Bearer ${authToken}` },
              }),
            ]);

          // Transformation des données des voitures avec les noms de modèle
          const voituresWithModelNames = voituresResponse.data.map(
            (voiture) => ({
              ...voiture,
              ModelNom: voiture.Modele?.Nom || "Nom du modèle inconnu",
              images: [],
            })
          );

          // Regroupement des images par ID de voiture
          const imagesByVoitureId = imagesResponse.data.reduce((acc, image) => {
            if (!acc[image.Id_voiture]) {
              acc[image.Id_voiture] = [];
            }
            image.Url = `${apiURL}${image.Url}`;
            acc[image.Id_voiture].push(image);
            return acc;
          }, {});

          // Attribution des images à chaque voiture
          const voituresWithImages = voituresWithModelNames.map((voiture) => ({
            ...voiture,
            images: imagesByVoitureId[voiture.Id_voiture] || [],
          }));

          // Mise à jour des états avec les données récupérées
          setVoituresData(voituresWithImages);
          setModeleOptions(
            modelesResponse.data.map((modele) => ({
              id: modele.Id_modeles,
              nom: modele.Nom,
            }))
          );
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  // Fonction pour gérer la sélection de toutes les voitures
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = voituresData.map((n) => n.Id_voiture);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  // Fonction pour ajouter une voiture
  const handleAddVoiture = (voitureDataToAdd) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");

    axios
      .post(`${apiURL}/voitures`, voitureDataToAdd, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        const newVoiture = response.data;

        const modeleAssocie = modeleOptions.find(
          (m) => m.id === newVoiture.Id_modeles
        );

        const nomDuModele = modeleAssocie
          ? modeleAssocie.Nom
          : "Nom du modèle inconnu";

        const voitureAvecNomDuModele = {
          ...newVoiture,
          ModelNom: nomDuModele,
        };

        setVoituresData((prevVoitures) => [
          ...prevVoitures,
          voitureAvecNomDuModele,
        ]);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la voiture :", error);
      });
  };

  // Fonction pour modifier une voiture
  const handleEditVoiture = (voitureDataToEdit) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");

    axios
      .put(
        `${apiURL}/voitures/${voitureDataToEdit.Id_voiture}`,
        voitureDataToEdit,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((response) => {
        // Trouver les images existantes pour la voiture mise à jour
        const existingVoiture = voituresData.find(
          (voiture) => voiture.Id_voiture === voitureDataToEdit.Id_voiture
        );
        const existingImages = existingVoiture ? existingVoiture.images : [];

        // Construire l'objet voiture mis à jour en incluant les images existantes
        const updatedVoiture = {
          ...response.data,
          ModelNom: response.data.Modele
            ? response.data.Modele.Nom
            : "Nom du modèle inconnu",
          images: existingImages,
        };

        // Mettre à jour l'état avec les données de voiture modifiées
        const updatedData = voituresData.map((voiture) =>
          voiture.Id_voiture === updatedVoiture.Id_voiture
            ? updatedVoiture
            : voiture
        );
        setVoituresData(updatedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification de la voiture :", error);
      });
  };

  // Fonction pour supprimer une voiture
  const handleDeleteVoiture = (selectedVoitureIds) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");

    // Itère sur chaque ID de voiture sélectionné pour la suppression
    const deletePromises = selectedVoitureIds.map((voitureId) =>
      axios.delete(`${apiURL}voitures/${voitureId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
    );

    Promise.all(deletePromises)
      .then(() => {
        // Filtrer les voitures supprimées des données de l'état local
        const updatedData = voituresData.filter(
          (voiture) => !selectedVoitureIds.includes(voiture.Id_voiture)
        );
        setVoituresData(updatedData);
        // Mettre à jour l'état des éléments sélectionnés pour refléter les suppressions
        setSelected(selected.filter((id) => !selectedVoitureIds.includes(id)));
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la suppression de la voiture et de ses images associées :",
          error
        );
      });
  };

  // Fonction pour télécharger des images
  const handleUploadImages = async (voitureId, files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("image", file);
    });
    formData.append("Id_voiture", voitureId);

    try {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem("authToken");

      const response = await axios.post(`${apiURL}/images/upload`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        const newImages = Array.isArray(response.data)
          ? response.data
          : [response.data];

        const updatedVoitures = voituresData.map((voiture) => {
          if (voiture.Id_voiture === voitureId) {
            const updatedImages = [
              ...voiture.images,
              ...newImages.map((img) => ({ Url: img.url || img.Url })),
            ];
            return { ...voiture, images: updatedImages };
          }
          return voiture;
        });

        setVoituresData(updatedVoitures);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload des images :", error);
    }
  };

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>Gestion des Voitures</h1>
          <EnhancedTable
            columns={[
              { id: "ModelNom", label: "Modèle de Voiture" },
              { id: "Annee", label: "Année" },
              { id: "Prix", label: "Prix" },
              { id: "Kilometrage", label: "Kilométrage" },
              {
                id: "Images",
                label: "Images",
                render: (row) => {
                  // Vérifie si la voiture a au moins une image
                  if (row.images && row.images.length > 0) {
                    const firstImage = row.images[0]; // Prendre la première image du tableau
                    return (
                      <img
                        src={`${firstImage.Url}`}
                        alt={`Voiture ${row.Id_voiture} Image`}
                        style={{ width: 90, height: 90, marginRight: 5 }}
                      />
                    );
                  }

                  return "Pas d'illustrations actuellement";
                },
              },
            ]}
            data={voituresData}
            onAdd={handleAddVoiture}
            onEdit={handleEditVoiture}
            onDelete={handleDeleteVoiture}
            onUploadImages={handleUploadImages}
            idField="Id_voiture"
            onSelectAllClick={handleSelectAllClick}
            numSelected={selected.length}
            modelList={modeleOptions}
          />
        </div>
      )}
    </div>
  );
}

export default VoitureDash;
