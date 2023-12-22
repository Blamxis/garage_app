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
        // Routes disponible uniquement pour admin
        this.router.get('/avis/admin', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], AvisController.getAllAvis);
        this.router.get('/avis/admin/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], AvisController.getAvisById);
        this.router.put('/avis/admin/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], AvisController.updateAvis);
        this.router.delete('/avis/admin/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], AvisController.deleteAvis);

        // Routes disponible pour employee
        this.router.get('/avis/employee', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], AvisController.getAllAvis);
        this.router.get('/avis/employee/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], AvisController.getAvisById);
        this.router.put('/avis/employee/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], AvisController.updateAvis);
        this.router.delete('/avis/employee/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], AvisController.deleteAvis);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AvisRoutes().getRouter();

