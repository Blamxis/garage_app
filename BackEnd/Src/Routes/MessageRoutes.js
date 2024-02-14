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

