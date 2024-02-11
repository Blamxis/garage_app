const express = require('express');
const ModeleController = require('../Controllers/ModeleController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class ModeleRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        // Route pour créer un nouveau modèle, disponible pour l'admin et l'employé
        this.router.post('/modeles', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ModeleController.createModele);

        // Routes pour gérer les modèles, disponibles à la fois pour l'admin et l'employé
        // La vérification du rôle se fait désormais via une méthode unique isEmployeeOrAdmin pour simplifier
        this.router.get('/modeles', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ModeleController.getAllModeles);
        this.router.get('/modeles/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ModeleController.getModeleById);
        this.router.put('/modeles/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ModeleController.updateModele);
        this.router.delete('/modeles/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ModeleController.deleteModele);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ModeleRoutes().getRouter();

