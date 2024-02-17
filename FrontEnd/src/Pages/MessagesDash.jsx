import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { Helmet } from "react-helmet-async";

function MessagesDash() {
  const { isAuthenticated } = useAuth();
  const [messagesData, setMessagesData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const apiURL = import.meta.env.VITE_API_URL;
      const authToken = localStorage.getItem("authToken");

      axios
        .get(`${apiURL}/messages`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((response) => {
          setMessagesData(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des messages :", error);
        });
    }
  }, [isAuthenticated]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = messagesData.map((n) => n.Id_message);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex >= 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleAddMessage = (messageDataToAdd) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");

    axios
      .post(`${apiURL}/messages`, messageDataToAdd, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setMessagesData([...messagesData, response.data]);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du message :", error);
      });
  };

  const handleEditMessage = (messageDataToEdit) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");

    axios
      .put(
        `${apiURL}/messages/${messageDataToEdit.Id_messages}`,
        messageDataToEdit,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((response) => {
        const updatedData = messagesData.map((message) =>
          message.Id_messages === response.data.Id_messages
            ? response.data
            : message
        );
        setMessagesData(updatedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du message :", error);
      });
  };

  const handleDeleteMessage = (selectedMessageIds) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const authToken = localStorage.getItem("authToken");

    const deletePromises = selectedMessageIds.map((messageId) =>
      axios.delete(`${apiURL}/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
    );

    Promise.all(deletePromises)
      .then(() => {
        const updatedData = messagesData.filter(
          (message) => !selectedMessageIds.includes(message.Id_messages)
        );
        setMessagesData(updatedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du message :", error);
      });
  };

  const idField = "Id_messages";

  const pageTitle = "Gestion des Messages - PAT Garage";
  const pageDescription =
    "Gérez efficacement les messages clients avec PAT Garage.";

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
          <h1>Gestion des Messages</h1>
          <EnhancedTable
            columns={[
              { id: "Objet", label: "Objet" },
              { id: "Type", label: "Type" },
              { id: "Nom", label: "Nom" },
              { id: "Prenom", label: "Prénom" },
              { id: "Email", label: "Email" },
              { id: "Telephone", label: "Téléphone" },
              { id: "Description", label: "Description" },
            ]}
            data={messagesData}
            onAdd={handleAddMessage}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
            idField={idField}
            onSelect={handleClick}
            onSelectAllClick={handleSelectAllClick}
            numSelected={selected.length}
          />
        </div>
      )}
    </div>
  );
}

export default MessagesDash;
