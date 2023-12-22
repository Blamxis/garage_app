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
        this.router.post('/admin/users', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], UserController.createUser);
        this.router.get('/admin/users', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], UserController.getAllUsers);
        this.router.get('/admin/users/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], UserController.getUserById);
        this.router.put('/admin/users/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], UserController.updateUser);
        this.router.delete('/admin/users/:id', [ AuthMiddleware.authenticate, RoleMiddleware.isAdmin ], UserController.deleteUser);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new UserRoutes().getRouter();