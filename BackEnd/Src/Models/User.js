const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Utils/db.config');

class Utilisateur extends Model {}

Utilisateur.init({
    // ID est automatiquement add par Sequelize pour les primary key auto-incrémenté
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Prenom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    Mdp: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Id_role: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    }
}, {
    sequelize, 
    modelName: 'user' 
});

// Associations

Utilisateur.belongsTo(Role, {foreignKey: 'Id_role'});
Role.hasMany(Utilisateur, {foreignKey: 'Id_role'});

module.exports = User;