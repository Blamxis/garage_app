const express = require('express');
const PossederOptionController = require('../Controllers/VoitureEquipementsController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class PossederOptionRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        // Admin & Employee
        this.router.post('/posseder-options', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], PossederOptionController.createEquipementToVoiture);
        this.router.get('/posseder-options', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], PossederOptionController.getAllPossederOptions);
        this.router.delete('/posseder-options/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], PossederOptionController.deleteEquipementFromVoiture);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new PossederOptionRoutes().getRouter();
