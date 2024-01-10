// Import des modules nécessaires
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import de la connexion à la database
const database = require('./Src/Utils/db.config');

// Import des modules de routage
const UserRoutes = require('./Src/Routes/UserRoutes');
const AuthRoutes = require('./Src/Routes/AuthRoutes');
const ServiceRoutes = require('./Src/Routes/ServiceRoutes');
const AvisRoutes = require('./Src/Routes/AvisRoutes');
const JoursRoutes = require('./Src/Routes/JoursRoutes');
const HoraireRoutes = require('./Src/Routes/HoraireRoutes');
const MessageRoutes = require('./Src/Routes/MessageRoutes');
const MarqueRoutes = require('./Src/Routes/MarqueRoutes');
const ModeleRoutes = require('./Src/Routes/ModeleRoutes');

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
        this.app.use('/api/user', UserRoutes);
        this.app.use('/api/auth', AuthRoutes);
        this.app.use('/api/', ServiceRoutes);
        this.app.use('/api/', AvisRoutes);
        this.app.use('/api/', JoursRoutes);
        this.app.use('/api/', HoraireRoutes);
        this.app.use('/api/', MessageRoutes);
        this.app.use('/api/', MarqueRoutes);
        this.app.use('/api/', ModeleRoutes);
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
