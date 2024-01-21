const express = require('express');
const JoursController = require('../Controllers/JoursController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class JoursRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/admin/jours', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], JoursController.createJour);
        this.router.get('/jours', JoursController.getAllJours);
        this.router.get('/admin/jours/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], JoursController.getJourById);
        this.router.put('/admin/jours/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], JoursController.updateJour);
        this.router.delete('/admin/jours/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], JoursController.deleteJour);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new JoursRoutes().getRouter();