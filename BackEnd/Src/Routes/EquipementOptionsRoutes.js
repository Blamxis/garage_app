const express = require('express');
const EquipementOptionsController = require('../Controllers/EquipementOptionsController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class EquipementOptionsRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        // Admin et Employé
        this.router.post('/equipement-options', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], EquipementOptionsController.createEquipementOptions);
        this.router.get('/equipement-options', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], EquipementOptionsController.getAllEquipementOptions);
        this.router.get('/equipement-options/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], EquipementOptionsController.getAllEquipementOptionsById);
        this.router.put('/equipement-options/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], EquipementOptionsController.updateEquipementOptions);
        this.router.delete('/equipement-options/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], EquipementOptionsController.deleteEquipementOptions);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new EquipementOptionsRoutes().getRouter();
