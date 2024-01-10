const express = require('express');
const VoitureController = require('../Controllers/VoitureController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class VoitureRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        // Route pour créer une nouvelle voiture (disponible pour admin et employé)
        this.router.post('/voitures', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], VoitureController.createVoiture);

        // Routes disponibles uniquement pour l'admin
        this.router.get('/admin/voitures', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], VoitureController.getAllVoitures);
        this.router.get('/admin/voitures/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], VoitureController.getVoitureById);
        this.router.put('/admin/voitures/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], VoitureController.updateVoiture);
        this.router.delete('/admin/voitures/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], VoitureController.deleteVoiture);

        // Routes disponibles pour les employés
        this.router.get('/employee/voitures', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], VoitureController.getAllVoitures);
        this.router.get('/employee/voitures/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], VoitureController.getVoitureById);
        this.router.put('/employee/voitures/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], VoitureController.updateVoiture);
        this.router.delete('/employee/voitures/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], VoitureController.deleteVoiture);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new VoitureRoutes().getRouter();
