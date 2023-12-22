const express = require('express');
const HoraireController = require('../Controllers/HoraireController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class HoraireRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/admin/horaires', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], HoraireController.createHoraire);
        this.router.get('/admin/horaires', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], HoraireController.getAllHoraires);
        this.router.get('/admin/horaires/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], HoraireController.getHoraireById);
        this.router.put('/admin/horaires/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], HoraireController.updateHoraire);
        this.router.delete('/admin/horaires/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], HoraireController.deleteHoraire);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new HoraireRoutes().getRouter();
