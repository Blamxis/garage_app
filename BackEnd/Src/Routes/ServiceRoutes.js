const express = require('express');
const ServiceController = require('../Controllers/ServiceController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class ServiceRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/services', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], ServiceController.createService);
        this.router.get('/services', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], ServiceController.getAllServices);
        this.router.get('/services/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], ServiceController.getServiceById);
        this.router.put('/services/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], ServiceController.updateService);
        this.router.delete('/services/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], ServiceController.deleteService);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ServiceRoutes().getRouter();
