const { Model, DataTypes } = require('sequelize');

class Service extends Model {}

module.exports = (sequelize) => {
    Service.init ({
        Id_serv : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom : {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Type : {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Id_user : {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'Service',
        tableName: 'services',
        timestamps: false
    });

    return Service;
};