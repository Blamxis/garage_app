const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Utils/db.config');

class Role extends Model {}

Role.init ({
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    modelName:'role'
});

module.exports = Role;