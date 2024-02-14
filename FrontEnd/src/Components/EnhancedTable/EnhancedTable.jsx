import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MuiAlert from "@mui/material/Alert";
import "./EnhancedTable.scss";

const EnhancedTableHead = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  columns,
}) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
      {columns.map((column) => (
        <TableCell key={column.id}>{column.label}</TableCell>
      ))}
      <TableCell>Actions</TableCell>
    </TableRow>
  </TableHead>
);

const DataRowCard = ({
  row,
  columns,
  onEdit,
  onDelete,
  onSelect,
  isSelected,
  idField,
}) => (
  <div className="data-row-card">
    <div className="data-row-card-content">
      {columns.map((column) => (
        <div key={column.id} className="data-row-card-item">
          <strong>{column.label}:</strong> {row[column.id]}
        </div>
      ))}
    </div>
    <div className="data-row-card-actions">
      <Checkbox
        checked={isSelected}
        onChange={() => onSelect(row[idField])}
        inputProps={{ "aria-label": `select row ${row[idField]}` }}
      />
      <IconButton color="primary" onClick={() => onEdit(row)}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={() => onDelete([row[idField]])}>
        <DeleteIcon />
      </IconButton>
    </div>
  </div>
);

const EnhancedTable = ({
  columns,
  data,
  modelList,
  onAdd,
  onEdit,
  onDelete,
  onUploadImages,
  idField,
  userId,
  voitureList,
}) => {
  const [selected, setSelected] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newData, setNewData] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");
  const [isUpdateSuccessOpen, setIsUpdateSuccessOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [currentItemIdForUpload, setCurrentItemIdForUpload] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Gestionnaire pour la sélection de toutes les lignes
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n[idField]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // Gestionnaire pour la sélection d'une ligne individuelle
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  // Gestionnaire pour ouvrir le dialogue d'ajout
  const handleAddDialogOpen = () => {
    setIsAddDialogOpen(true);
  };

  // Gestionnaire pour fermer le dialogue d'ajout
  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
    setNewData({});
  };

  // Gestionnaire pour enregistrer les données ajoutées
  const handleAddDialogSave = () => {
    try {
      const voitureDataToAdd = {
        ...newData,
        ModelNom: newData.ModelNom || "",
      };
      onAdd(voitureDataToAdd);
      handleAddDialogClose();
      setUpdateSuccessMessage("Ajout réussi !");
      setIsUpdateSuccessOpen(true);
      setError("");
    } catch {
      setError("Échec de l'ajout : " + error.message);
    }
  };

  // Gestionnaire pour ouvrir le dialogue d'édition
  const handleEditDialogOpen = (dataItem) => {
    setCurrentData(dataItem);
    setIsEditDialogOpen(true);
  };

  // Gestionnaire pour fermer le dialogue d'édition
  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    setCurrentData({});
  };

  // Gestionnaire pour enregistrer les données éditées
  const handleEditDialogSave = () => {
    try {
      const voitureDataToEdit = {
        ...currentData,
        ModelNom: currentData.ModelNom || "",
      };
      onEdit(voitureDataToEdit);
      handleEditDialogClose();
      setUpdateSuccessMessage("Mise à jour réussie !");
      setIsUpdateSuccessOpen(true);
      setError("");
    } catch {
      setError("Échec de la mise à jour : " + error.message);
    }
  };

  // Gestionnaire pour ouvrir le dialogue de confirmation de suppression
  const handleDeleteDialogOpen = (id) => {
    setSelected([id]);
    setIsDeleteDialogOpen(true);
  };

  // Gestionnaire pour fermer le dialogue de confirmation de suppression
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  // Gestionnaire pour confirmer la suppression
  const handleDeleteConfirm = async () => {
    try {
      await onDelete(selected);
      setSelected([]);
      handleDeleteDialogClose();
      setUpdateSuccessMessage("Suppression réussie !");
      setIsUpdateSuccessOpen(true);
      setError("");
    } catch {
      setError("Échec de la suppression : " + error.message);
    }
  };

  const handleUploadDialogOpen = (id) => {
    setCurrentItemIdForUpload(id);
    setIsUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setIsUploadDialogOpen(false);
  };

  const handleFileSelect = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUploadSave = async () => {
    handleUploadDialogClose();
    if (selectedFiles.length > 0 && currentItemIdForUpload) {
      try {
        onUploadImages(currentItemIdForUpload, selectedFiles);
        setUpdateSuccessMessage("Les images ont été uploadées avec succès.");
      } catch (error) {
        console.error("Erreur lors de l'upload des images :", error);
      }
    } else {
      console.error("Aucun fichier sélectionné ou ID de voiture manquant.");
    }
    setSelectedFiles([]);
    setCurrentItemIdForUpload(null);
  };
  
  return (
    <Box sx={{ width: "100%" }}>
      {/* Bouton Ajouter visible en tout temps au-dessus du contenu */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddDialogOpen}
          color="warning"
        >
          Ajouter
        </Button>
      </Box>

      <Paper sx={{ mb: 2 }}>
        {isMobile ? (
          // Affichage mobile : DataRowCard pour chaque élément de données
          data.map((row) => (
            <DataRowCard
              key={row[idField]}
              row={row}
              columns={columns}
              onEdit={() => handleEditDialogOpen(row)}
              onDelete={() => handleDeleteDialogOpen(row[idField])}
            />
          ))
        ) : (
          // Affichage desktop : Table avec EnhancedTableToolbar et EnhancedTableHead
          <>
            <Table className="custom-table">
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={data.length}
                columns={columns}
              />
              <TableBody>
                {data.length > 0 ? (
                  data.map((row) => {
                    const isItemSelected =
                      selected.indexOf(row[idField]) !== -1;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[idField]}
                        selected={isItemSelected}
                        className="custom-table-row"
                      >
                        <TableCell
                          padding="checkbox"
                          className="custom-table-cell"
                        >
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) =>
                              handleClick(event, row[idField])
                            }
                          />
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            className="custom-table-cell"
                          >
                            {column.id === "Id_voiture"
                              ? row.voiture?.Modele?.Nom || "Modèle inconnu"
                              : column.render
                              ? column.render(row)
                              : row[column.id] ?? "N/A"}
                          </TableCell>
                        ))}
                        <TableCell className="custom-table-cell">
                          <IconButton onClick={() => handleEditDialogOpen(row)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteDialogOpen(row[idField])}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleUploadDialogOpen(row[idField])}
                            color="primary"
                          >
                            <PhotoCameraIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length + 2} align="center">
                      Aucune données disponible
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
      </Paper>

      {/* Add Dialog */}

      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
        <DialogContent>
          {columns.map((column) => {
            if (column.id === "ModelNom") {
              return (
                <FormControl key={column.id} fullWidth margin="normal">
                  <InputLabel>{column.label}</InputLabel>
                  <Select
                    label={column.label}
                    value={newData[column.id] || ""}
                    onChange={(e) =>
                      setNewData({ ...newData, [column.id]: e.target.value })
                    }
                  >
                    <MenuItem value="" disabled>
                      Sélectionnez un modèle
                    </MenuItem>
                    {modelList.map((model) => (
                      <MenuItem key={model.id} value={model.nom}>
                        {model.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            } else if (column.id === "Id_voiture") {
              return (
                <FormControl key="Id_voiture" fullWidth margin="normal">
                  <InputLabel>Voiture</InputLabel>
                  <Select
                    label="Voiture"
                    value={newData.Id_voiture || ""}
                    onChange={(e) =>
                      setNewData({ ...newData, Id_voiture: e.target.value })
                    }
                  >
                    <MenuItem value="" disabled>
                      Sélectionnez une voiture
                    </MenuItem>
                    {voitureList.map((voiture) => (
                      <MenuItem
                        key={voiture.Id_voiture}
                        value={voiture.Id_voiture}
                      >
                        {voiture.Modele ? voiture.Modele.Nom : "Modèle inconnu"}{" "}
                        {voiture.Nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            } else {
              return (
                <TextField
                  key={column.id}
                  label={column.label}
                  value={
                    column.id === "Id_user" ? userId : newData[column.id] || ""
                  }
                  onChange={(e) =>
                    setNewData({ ...newData, [column.id]: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="error">
            Annuler
          </Button>
          <Button onClick={handleAddDialogSave} color="success">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}

      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <DialogContent>
          {columns.map((column) => {
            // Condition spécifique pour le champ Id_user
            if (column.id === "Id_user") {
              return (
                <TextField
                  key={column.id}
                  label={column.label}
                  // Utilisez defaultValue ou value pour afficher la valeur actuelle
                  defaultValue={userId}
                  // Rendez le champ en lecture seule
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              );
            } else if (column.id === "Id_voiture") {
              // Votre logique existante pour le champ Id_voiture
              return (
                <FormControl key="Id_voiture" fullWidth margin="normal">
                  <InputLabel>Voiture</InputLabel>
                  <Select
                    label="Voiture"
                    value={currentData[column.id] || ""}
                    onChange={(e) =>
                      setCurrentData({
                        ...currentData,
                        [column.id]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="" disabled>
                      Sélectionnez une voiture
                    </MenuItem>
                    {voitureList.map((voiture) => (
                      <MenuItem
                        key={voiture.Id_voiture}
                        value={voiture.Id_voiture}
                      >
                        {voiture.Modele ? voiture.Modele.Nom : "Modèle inconnu"}{" "}
                        {voiture.Nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            } else if (column.id === "ModelNom") {
              // Votre logique existante pour le champ ModelNom
              return (
                <FormControl key={column.id} fullWidth margin="normal">
                  <InputLabel>{column.label}</InputLabel>
                  <Select
                    label={column.label}
                    value={currentData[column.id] || ""}
                    onChange={(e) =>
                      setCurrentData({
                        ...currentData,
                        [column.id]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="" disabled>
                      Sélectionnez un modèle
                    </MenuItem>
                    {modelList.map((model) => (
                      <MenuItem key={model.id} value={model.nom}>
                        {model.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            } else {
              // Logique pour les autres champs
              return (
                <TextField
                  key={column.id}
                  label={column.label}
                  value={currentData[column.id] || ""}
                  onChange={(e) =>
                    setCurrentData({
                      ...currentData,
                      [column.id]: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="error">
            Annuler
          </Button>
          <Button onClick={handleEditDialogSave} color="success">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/*Delete Dialog*/}

      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet élément ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="error">
            Annuler
          </Button>
          <Button onClick={handleDeleteConfirm} color="success" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Dialog */}

      <Dialog open={isUploadDialogOpen} onClose={handleUploadDialogClose}>
        <DialogContent>
          <DialogContentText>Téléchargez vos images.</DialogContentText>
          <input type="file" multiple onChange={handleFileSelect} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose} color="error">
            Annuler
          </Button>
          <Button onClick={handleUploadSave} color="success">
            {" "}
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Success*/}

      <Snackbar
        open={isUpdateSuccessOpen}
        autoHideDuration={4000}
        onClose={() => setIsUpdateSuccessOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          {updateSuccessMessage}
        </MuiAlert>
      </Snackbar>

      {/* SnackBar Error */}

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUploadImages: PropTypes.func,
  idField: PropTypes.string.isRequired,
  modelList: PropTypes.array,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  voitureList: PropTypes.array,
};

export default EnhancedTable;
