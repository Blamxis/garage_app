const { Model, DataTypes } = require('sequelize');

class Horaire extends Model {}

module.exports = (sequelize) => {
    Horaire.init({
        Id_horaire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Horaire_ouverture: {
            type: DataTypes.TIME,
            allowNull: false
        },
        Horaire_fermeture : {
            type: DataTypes.TIME,
            allowNull: false
        },
        Id_jours: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Horaire',
        tableName: 'horaires',
        timestamps: false
    });

    return Horaire;
};