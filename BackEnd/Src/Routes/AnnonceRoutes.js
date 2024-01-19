const express = require('express');
const AnnonceController = require('../Controllers/AnnonceController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class AnnonceRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {

        this.router.post('/annonces', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], AnnonceController.createAnnonce);
        this.router.put('/annonces/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], AnnonceController.updateAnnonce);
        this.router.delete('/annonces/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], AnnonceController.deleteAnnonce);

        // Route pour la lecture de toutes les annonces (accessible par tout le monde)
        this.router.get('/annonces', AnnonceController.getAllAnnonces);

        // Route pour la lecture d'une annonce spécifique (accessible par tout le monde)
        this.router.get('/annonces/:id', AnnonceController.getAnnonceById);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AnnonceRoutes().getRouter();
