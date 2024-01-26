import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Checkbox, IconButton,
  Toolbar, Typography, Tooltip, Box, Button, Dialog, DialogContent, DialogActions, TextField, Snackbar,
  useTheme, useMediaQuery
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import './EnhancedTable.scss';

const EnhancedTableHead = ({ onSelectAllClick, numSelected, rowCount, columns }) => (
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

const EnhancedTableToolbar = ({ numSelected, onAdd }) => (
  <Toolbar className='custom-toolbar'>
    {numSelected > 0 ? (
      <Typography color="inherit" variant="subtitle1" component="div">
        {numSelected} sélectionné(s)
      </Typography>
    ) : (
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Tableau de Gestions
      </Typography>
    )}
    <Tooltip title="Ajouter">
      <Button startIcon={<AddIcon />} onClick={onAdd} color='warning'>
        Ajouter
      </Button>
    </Tooltip>
  </Toolbar>
);

const DataRowCard = ({ row, columns, onEdit, onDelete, onSelect, isSelected, idField }) => (
  <Box className="data-row-card" margin={2} boxShadow={2} p={2}>
    <Checkbox
      checked={isSelected}
      onChange={() => onSelect(row[idField])}
    />
    {columns.map((column) => (
      <Typography key={column.id} gutterBottom>
        <strong>{column.label}:</strong> {row[column.id]}
      </Typography>
    ))}
    <Box display="flex" justifyContent="flex-end">
      <IconButton onClick={() => onEdit(row)}><EditIcon /></IconButton>
      <IconButton onClick={() => onDelete([row[idField]])} color="error"><DeleteIcon /></IconButton>
    </Box>
  </Box>
);

const EnhancedTable = ({ columns, data, onAdd, onEdit, onDelete, idField }) => {
  const [selected, setSelected] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [newData, setNewData] = useState({});
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");
  const [isUpdateSuccessOpen, setIsUpdateSuccessOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n[idField]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex >= 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

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
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleAddDialogOpen = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
    setNewData({});
  };

  const handleAddDialogSave = () => {
    onAdd(newData);
    handleAddDialogClose();
    setUpdateSuccessMessage("Ajout réussie !");
    setIsUpdateSuccessOpen(true);
  };

  const handleEditDialogOpen = (dataItem) => {
    setCurrentData(dataItem);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    setCurrentData({});
  };

  const handleEditDialogSave = () => {
    onEdit(currentData);
    handleEditDialogClose();
    setUpdateSuccessMessage("Mise à jour réussie !");
    setIsUpdateSuccessOpen(true);
  };

  const handleDeleteDialogOpen = (id) => {
    setSelected([id]);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(selected);
    setSelected([]);
    handleDeleteDialogClose();
    setUpdateSuccessMessage("Suppression réussie !");
    setIsUpdateSuccessOpen(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isMobile ? (
        <Box>
          <Toolbar>
            <Tooltip title="Ajouter">
              <Button startIcon={<AddIcon />} onClick={handleAddDialogOpen} color="primary">
                Ajouter
              </Button>
            </Tooltip>
          </Toolbar>
          {data.map(row => (
            <DataRowCard
              key={row[idField]}
              row={row}
              columns={columns}
              onEdit={() => handleEditDialogOpen(row)}
              onDelete={() => handleDeleteDialogOpen(row [idField])}
              onSelect={handleSelect}
              isSelected={selected.indexOf(row[idField]) !== -1}
              idField={idField}
            />
          ))}
        </Box>
      ) : (
        <Paper sx={{ mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} onAdd={handleAddDialogOpen} />
          <Table className='custom-table'>
            <EnhancedTableHead className='custom-table-head'
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
              columns={columns}
            />
            <TableBody>
              {data.map((row) => {
                const isItemSelected = selected.indexOf(row[idField]) !== -1;
                return (
                  <TableRow className='custom-table-row'
                    hover
                    onClick={(event) => handleClick(event, row[idField])}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row[idField]}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell className='custom-table-cell' key={column.id}>{row[column.id]}</TableCell>
                    ))}
                    <TableCell>
                      <IconButton onClick={() => handleEditDialogOpen(row)}><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDeleteDialogOpen()} color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
        <DialogContent>
          {columns.map((column) => (
            <TextField
              key={column.id}
              label={column.label}
              value={newData[column.id] || ''}
              onChange={(e) => setNewData({ ...newData, [column.id]: e.target.value })}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAddDialogSave} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <DialogContent>
          {columns.map((column) => (
            <TextField
              key={column.id}
              label={column.label}
              value={currentData[column.id] || ''}
              onChange={(e) => setCurrentData({ ...currentData, [column.id]: e.target.value })}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleEditDialogSave} color="success">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogContent>
          <Typography>
            Confirmer la suppression de {selected.length} élément(s) ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={isUpdateSuccessOpen} autoHideDuration={4000} onClose={() => setIsUpdateSuccessOpen(false)}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          {updateSuccessMessage}
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
  idField: PropTypes.string.isRequired,
};

export default EnhancedTable;
