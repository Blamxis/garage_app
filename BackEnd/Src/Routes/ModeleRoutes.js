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
        // Route pour créer un nouveau modèle (disponible pour admin et employé)
        this.router.post('/modeles', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ModeleController.createModele);

        // Routes disponibles uniquement pour l'admin
        this.router.get('/admin/modeles', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], ModeleController.getAllModeles);
        this.router.get('/admin/modeles/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], ModeleController.getModeleById);
        this.router.put('/admin/modeles/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], ModeleController.updateModele);
        this.router.delete('/admin/modeles/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], ModeleController.deleteModele);

        // Routes disponibles pour les employés
        this.router.get('/employee/modeles', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], ModeleController.getAllModeles);
        this.router.get('/employee/modeles/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], ModeleController.getModeleById);
        this.router.put('/employee/modeles/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], ModeleController.updateModele);
        this.router.delete('/employee/modeles/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], ModeleController.deleteModele);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ModeleRoutes().getRouter();
