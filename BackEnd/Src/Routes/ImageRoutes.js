const express = require('express');
const imageUploader = require('../Middlewares/ImageUploader');
const ImageController = require('../Controllers/ImageController');
const AuthMiddleware = require('../Middlewares/AuthMiddleware');
const RoleMiddleware = require('../Middlewares/RoleMiddleware');

class ImageRoutes {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        // Route pour uploader des images, accessible par les employés et les admins
        this.router.post('/images/upload', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin, imageUploader.array('image', 5)], ImageController.create);

        // Routes pour gérer les images, accessibles par les employés et les admins
        this.router.get('/images', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ImageController.getAll);
        this.router.get('/images/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ImageController.getOne);
        this.router.put('/images/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ImageController.update);
        this.router.delete('/images/:id', [AuthMiddleware.authenticate, RoleMiddleware.isEmployeeOrAdmin], ImageController.delete);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new ImageRoutes().getRouter();
