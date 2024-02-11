const express = require('express');
const MessageController = require('../Controllers/MessageController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class MessageRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        // La route pour créer un message reste ouverte sans authentification spécifique
        // en supposant que tout utilisateur authentifié peut envoyer un message
        this.router.post('/messages', AuthMiddleware.authenticate, MessageController.createMessage);

        // Routes pour gérer les messages, disponibles à la fois pour l'admin et l'employé
        // Utilisation d'une méthode unique isEmployeeOrAdmin (à définir si elle n'existe pas déjà) pour simplifier
        this.router.get('/messages', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], MessageController.getAllMessages);
        this.router.get('/messages/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], MessageController.getMessageById);
        this.router.put('/messages/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], MessageController.updateMessage);
        this.router.delete('/messages/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], MessageController.deleteMessage);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new MessageRoutes().getRouter();

