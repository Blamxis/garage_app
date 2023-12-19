const { Model, DataTypes } = require('sequelize');

class User extends Model {}

module.exports = (sequelize) => {
    User.init({
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
            type: DataTypes.INTEGER
            // La référence à 'Roles' sera gérée dans 'index.js'
        }
    }, {
        sequelize,
        modelName: 'User'
    });

    return User;
};
