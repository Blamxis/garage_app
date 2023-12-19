const Sequelize = require('sequelize');

class Database {
    constructor() {
        this.sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
            host: process.env.DB_HOST,
            dialect: 'mysql'
        });
    }

    async connect() {
        try {
            await this.sequelize.authenticate();
        } catch (error) {
            throw new Error('Impossible de se connecter à la base de donnée', error);
        }
    }

    getSequelizeInstance() {
        return this.sequelize;
    }
}

// Export de l'instance unique
const db = new Database();
module.exports = db;