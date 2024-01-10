const { Model, DataTypes } = require('sequelize');

class Modele extends Model {}

module.exports = (sequelize) => {
    Modele.init ({
        Id_modeles : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom : {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Id_marques : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Modele',
        tableName: 'modeles',
        timestamps : false
    });

    return Modele;
}