const Sequelize = require('sequelize');

class Database {
    constructor() {
        this.sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
            host: process.env.DB_HOST,
            dialect: 'mysql'
        });
    }

    connect() {
        return this.sequelize.authenticate()
    }
}

// Export de l'instance unique

module.exports = Database;