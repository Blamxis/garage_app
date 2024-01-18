const express = require('express');
const ImageController = require('../Controllers/ImageController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class ImageRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        
        this.router.post('/images/upload', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ImageController.create);

        //Admin
        this.router.get('/admin/images', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], ImageController.getAll);
        this.router.get('/admin/images/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], ImageController.getOne);
        this.router.put('/admin/images/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], ImageController.update);
        this.router.delete('/admin/images/:id', [AuthMiddleware.authenticate, RoleMiddleware.isAdmin], ImageController.delete);

        //Employé
        this.router.get('/employee/images/', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], ImageController.getAll);
        this.router.get('/employee/images/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], ImageController.getOne);
        this.router.put('/employee/images/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], ImageController.update);
        this.router.delete('/employee/images/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployee], ImageController.delete);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ImageRoutes().getRouter();
