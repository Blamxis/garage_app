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
        this.router.post('/messages', MessageController.createMessage);
        // Routes disponible uniquement pour admin
        this.router.get('/admin/messages', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], MessageController.getAllMessages);
        this.router.get('/admin/messages/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], MessageController.getMessageById);
        this.router.put('/admin/messages/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], MessageController.updateMessage);
        this.router.delete('/admin/messages/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], MessageController.deleteMessage);

        // Routes disponible pour employee
        this.router.get('/employee/messages', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], MessageController.getAllMessages);
        this.router.get('/employee/messages/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], MessageController.getMessageById);
        this.router.put('/employee/messages/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], MessageController.updateMessage);
        this.router.delete('/employee/messages/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isEmployee ], MessageController.deleteMessage);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new MessageRoutes().getRouter();
