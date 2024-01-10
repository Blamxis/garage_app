const { Model, DataTypes } = require('sequelize');

class Voiture extends Model {}

module.exports = (sequelize) => {
    Voiture.init ({
        Id_voiture : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Kilometrage : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Annee : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Prix : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        Id_modeles : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
    }, {
        sequelize,
        modelName: 'Voiture',
        tableName: 'voitures',
        timestamps : false
    });

    return Voiture;
}