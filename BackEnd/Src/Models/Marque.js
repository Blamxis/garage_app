const { Model, DataTypes } = require('sequelize');

class Marque extends Model {}

module.exports = (sequelize) => {
    Marque.init ({
        Id_marques : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom : {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Marque',
        tableName: 'marque',
        timestamps : false
    });

    return Marque;
}