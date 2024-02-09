const express = require('express');
const VoitureController = require('../Controllers/VoitureController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class VoitureRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        
        this.router.get('/voitures', [AuthMiddleware.authenticate], VoitureController.getAllVoitures);
        this.router.get('/voitures/:id', [AuthMiddleware.authenticate], VoitureController.getVoitureById);
        this.router.post('/voitures', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], VoitureController.createVoiture);
        this.router.put('/voitures/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], VoitureController.updateVoiture);
        this.router.delete('/voitures/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], VoitureController.deleteVoiture);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new VoitureRoutes().getRouter();

