const express = require('express');
const AuthController = require('../Controllers/AuthController');

class AuthRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {

        this.router.post('/login', AuthController.login);
        this.router.post('/register', AuthController.register);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AuthRoutes().getRouter();