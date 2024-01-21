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
        Horaire_ouverture_aprem: {
            type: DataTypes.TIME,
            allowNull: true
        },
        Horaire_fermeture_aprem: {
            type: DataTypes.TIME,
            allowNull: true
        },
        Id_jours: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Jours',
                key: 'Id_jours',
            },
        }
    }, {
        sequelize,
        modelName: 'Horaire',
        tableName: 'horaires',
        timestamps: false
    });

    return Horaire;
};