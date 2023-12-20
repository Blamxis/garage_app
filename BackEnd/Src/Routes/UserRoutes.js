const express = require('express');
const UserController = require('../Controllers/UserController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class UserRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        // Seul l'admin peut faire un CRUD des users
        this.router.post('/users', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], UserController.createUser);
        this.router.get('/users', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], UserController.getAllUsers);
        this.router.get('/users/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], UserController.getUserById);
        this.router.put('/users/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], UserController.updateUser);
        this.router.delete('/users/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], UserController.deleteUser);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new UserRoutes().getRouter();