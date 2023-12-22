const { Model, DataTypes } = require('sequelize');

class Jours extends Model {}

module.exports = (sequelize) => {
    Jours.init({
        Id_jours: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom: {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        Id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Jours',
        tableName: 'jours',
        timestamps: false
    });

    return Jours;
};