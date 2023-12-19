// Import des modules nécessaires
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import de la connexion à la database
const database = require('./Src/Utils/db.config');

// Import des modules de routage
const UserRoutes = require('./Src/Routes/UserRoutes');

// Classe Server qui encapsule toute la configuration et la logique du serveur Express
class Server {
    constructor() {
        // Initialisation de l'application Express
        this.app = express();
        this.port = process.env.PORT || 8888;
        this.configMiddlewares();
        this.routes();
        this.start();
    }

    // Configuration des Middlewares
    configMiddlewares() {
        
        this.app.use(cors()); // Activation de CORS
        this.app.use(helmet()); // Sécurisation des en-têtes HTTP
        this.app.use(express.json()); // Pour analyser les requêtes JSON
        this.app.use(express.urlencoded({ extended: true})); // Pour analyser les requêtes URL encodées
    }

    routes() {
        this.app.use('/api/users', UserRoutes);
    }

    start() {
        database.connect()
            .then(() => {
                console.log('Database connection OK');
                this.app.listen(this.port, () => {
                    console.log(`This server is running on port ${this.port}. Have fun !`);
                });
            })
            .catch((error) => {
                console.log('Database Error', error);
            });
    }
}

// Création et démarrage du serveur
new Server();
