const { Model, DataTypes } = require('sequelize');

class Roles extends Model {}

module.exports = (sequelize) => {
    Roles.init({
        Nom: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Roles'
    });

    return Roles;
};
