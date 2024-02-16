const express = require('express');
const AvisController = require('../Controllers/AvisController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class AvisRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        // Route pour créer un avis, disponible pour tout utilisateur
        this.router.post('/avis', AvisController.createAvis);

        // Route pour récupérer les avis approuvés, disponible sans authentification spécifique
        this.router.get('/avis/approved', AvisController.getAllApprovedAvis);

        // Routes pour gérer les avis, disponibles pour les admins et les employés
        // Utilisation d'un middleware pour vérifier si l'utilisateur est un admin ou un employé
        this.router.get('/avis', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], AvisController.getAllAvis);
        this.router.get('/avis/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], AvisController.getAvisById);
        this.router.put('/avis/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], AvisController.updateAvis);
        this.router.delete('/avis/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], AvisController.deleteAvis);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AvisRoutes().getRouter();


