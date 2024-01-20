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
        this.router.post('/avis', AvisController.createAvis);

        // Route pour récupérer les avis approuvés pour le front
        this.router.get('/avis/approved', AvisController.getAllApprovedAvis);

        // Routes disponible uniquement pour admin
        this.router.get('/admin/avis', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], AvisController.getAllAvis);
        this.router.get('/admin/avis/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], AvisController.getAvisById);
        this.router.put('/admin/avis/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], AvisController.updateAvis);
        this.router.delete('/admin/avis/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], AvisController.deleteAvis);

        // Routes disponible pour employee
        this.router.get('/employee/avis/', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], AvisController.getAllAvis);
        this.router.get('/employee/avis/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], AvisController.getAvisById);
        this.router.put('/employee/avis/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], AvisController.updateAvis);
        this.router.delete('/employee/avis/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], AvisController.deleteAvis);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AvisRoutes().getRouter();

