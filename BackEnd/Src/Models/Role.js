const { Model, DataTypes } = require('sequelize');

class Role extends Model {}

module.exports = (sequelize) => {
    Role.init({
        Id_role: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        timestamps: false,
    });

    return Role;
};
