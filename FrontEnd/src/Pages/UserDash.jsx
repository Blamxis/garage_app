import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable"; 
import axios from "axios";
import { useAuth } from "../Context/AuthContext";


// Gestion de l'affichage des données dans le dashboard

function UserDash() {
  const { isAuthenticated } = useAuth();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem('authToken');

      axios
        .get(`${apiURL}user/admin/users`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données des utilisateurs :",
            error
          );
        });
    }
  }, [isAuthenticated]);

  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData.map((n) => n[idField]);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  // Gestion de l'ajout d'un utilisateur

  const handleAddUser = (userDataToAdd) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    axios
      .post(`${apiURL}user/admin/users`, userDataToAdd, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then((response) => {
        setUserData([...userData, response.data]);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      });
  };

  // Gestion de Modification d'un Utilisateur

  const handleEditUser = (userDataToEdit) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    axios
      .put(`${apiURL}user/admin/users/${userDataToEdit.Id_user}`, userDataToEdit, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then((response) => {
        const updatedData = userData.map((user) =>
          user.Id_user === response.data.Id_user ? response.data : user
        );
        setUserData(updatedData);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la modification de l'utilisateur :",
          error
        );
      });
  };

  // Gestion de supression d'un utilisateur 
  
  const handleDeleteUser = (selectedUserIds) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem('authToken');

    const deletePromises = selectedUserIds.map((userId) =>
      axios.delete(`${apiURL}user/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    );

    Promise.all(deletePromises)
      .then(() => {
        const updatedData = userData.filter(
          (user) => !selectedUserIds.includes(user.Id_user)
        );
        setUserData(updatedData);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la suppression des utilisateurs :",
          error
        );
      });
  };

  const idField = "Id_user";

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>GESTION UTILISATEURS</h1>
          <EnhancedTable
            columns={[
              { id: "Nom", label: "Nom" },
              { id: "Prenom", label: "Prénom" },
              { id: "Email", label: "Email" },
              { id: "Mdp", label: "Mot de passe"},
              { id: "Id_role", label: "ID Rôle" },
            ]}
            data={userData}
            onAdd={handleAddUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            idField={idField}
            onSelectAllClick={handleSelectAllClick}
            numSelected={selected.length}
          />
        </div>
      )}
    </div>
  );
}

export default UserDash;




