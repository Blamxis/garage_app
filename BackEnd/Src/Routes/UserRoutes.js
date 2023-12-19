const express = require('express');
const UserController = require('../Controllers/UserController');

class UserRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/users', UserController.createUser);
        this.router.get('/users', UserController.getAllUsers);
        this.router.get('/users/:id', UserController.getUserById);
        this.router.put('/users/:id', UserController.updateUser);
        this.router.delete('/users/:id', UserController.deleteUser);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new UserRoutes().getRouter();