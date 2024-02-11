const express = require('express');
const MarqueController = require('../Controllers/MarqueController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class MarqueRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        // Route pour créer une nouvelle marque, disponible pour l'admin et l'employé
        this.router.post('/marques', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], MarqueController.createMarque);

        // Routes pour gérer les marques, disponibles à la fois pour l'admin et l'employé
        // La vérification du rôle se fait désormais via une méthode unique isEmployeeOrAdmin pour simplifier
        this.router.get('/marques', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], MarqueController.getAllMarques);
        this.router.get('/marques/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], MarqueController.getMarqueById);
        this.router.put('/marques/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], MarqueController.updateMarque);
        this.router.delete('/marques/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], MarqueController.deleteMarque);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new MarqueRoutes().getRouter();

