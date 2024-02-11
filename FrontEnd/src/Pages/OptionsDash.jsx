import { useState, useEffect } from "react";
import EnhancedTable from "../Components/EnhancedTable/EnhancedTable";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

function OptionsDash() {
    const { isAuthenticated } = useAuth();
    const [optionsData, setOptionsData] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchOptionsData();
        }
    }, [isAuthenticated]);

    const fetchOptionsData = () => {
        const apiURL = import.meta.env.VITE_API_URL;
        const authToken = localStorage.getItem('authToken');

        axios.get(`${apiURL}/equipement-options`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        }).then(response => {
            setOptionsData(response.data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des options :", error);
        });
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = optionsData.map((n) => n.Id_option);
            setSelected(newSelecteds);
        } else {
            setSelected([]);
        }
    };

    const handleAddOption = (optionDataToAdd) => {
        const apiURL = import.meta.env.VITE_API_URL;
        const authToken = localStorage.getItem('authToken');

        axios.post(`${apiURL}/equipement-options`, optionDataToAdd, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        }).then(response => {
            setOptionsData([...optionsData, response.data]);
            fetchOptionsData(); 
        }).catch(error => {
            console.error("Erreur lors de l'ajout de l'option :", error);
        });
    };

    const handleEditOption = (optionDataToEdit) => {
        const apiURL = import.meta.env.VITE_API_URL;
        const authToken = localStorage.getItem('authToken');

        axios.put(`${apiURL}/equipement-options/${optionDataToEdit.Id_options}`, optionDataToEdit, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        }).then(() => {
            fetchOptionsData(); 
        }).catch(error => {
            console.error("Erreur lors de la modification de l'option :", error);
        });
    };

    const handleDeleteOption = (selectedOptionIds) => {
        const apiURL = import.meta.env.VITE_API_URL;
        const authToken = localStorage.getItem('authToken');

        const deletePromises = selectedOptionIds.map(optionId =>
            axios.delete(`${apiURL}/equipement-options/${optionId}`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            })
        );

        Promise.all(deletePromises).then(() => {
            fetchOptionsData();
        }).catch(error => {
            console.error("Erreur lors de la suppression de l'option :", error);
        });
    };

    const idField = "Id_options";

    return (
        <div>
            {isAuthenticated && (
                <div>
                    <h1>Gestion des Options d Équipement</h1>
                    <EnhancedTable
                        columns={[
                            { id: "Nom", label: "Nom" }
                        ]}
                        data={optionsData}
                        onAdd={handleAddOption}
                        onEdit={handleEditOption}
                        onDelete={handleDeleteOption}
                        idField={idField}
                        onSelectAllClick={handleSelectAllClick}
                        numSelected={selected.length}
                    />
                </div>
            )}
        </div>
    );
}

export default OptionsDash;