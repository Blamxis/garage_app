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
        // Route pour créer une nouvelle marque (disponible pour admin et employé)
        this.router.post('/marques', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], MarqueController.createMarque);

        // Routes disponibles uniquement pour l'admin
        this.router.get('/admin/marques', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], MarqueController.getAllMarques);
        this.router.get('/admin/marques/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], MarqueController.getMarqueById);
        this.router.put('/admin/marques/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], MarqueController.updateMarque);
        this.router.delete('/admin/marques/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], MarqueController.deleteMarque);

        // Routes disponibles pour les employés
        this.router.get('/employee/marques', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], MarqueController.getAllMarques);
        this.router.get('/employee/marques/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], MarqueController.getMarqueById);
        this.router.put('/employee/marques/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], MarqueController.updateMarque);
        this.router.delete('/employee/marques/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], MarqueController.deleteMarque);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new MarqueRoutes().getRouter();
