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
        this.router.post('/admin/services', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], ServiceController.createService);
        this.router.get('/admin/services', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], ServiceController.getAllServices);
        this.router.get('/admin/services/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], ServiceController.getServiceById);
        this.router.put('/admin/services/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], ServiceController.updateService);
        this.router.delete('/admin/services/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], ServiceController.deleteService);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ServiceRoutes().getRouter();
