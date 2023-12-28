const { Model, DataTypes } = require('sequelize');

class Avis extends Model {}

module.exports = (sequelize) => {
    Avis.init ({
        Id_avis : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom : {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Prenom : {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        Note: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Status: {
            type: DataTypes.ENUM('en attente', 'approuvé', 'rejeté'),
            allowNull: false,
            defaultValue: 'en attente'
        },
        Id_user: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Avis',
        tableName: 'avis',
        timestamps: false
    });

    return Avis;
};