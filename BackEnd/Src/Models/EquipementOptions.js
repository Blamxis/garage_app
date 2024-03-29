const { Model, DataTypes } = require('sequelize');

class EquipementOptions extends Model {}

module.exports = (sequelize) => {
    EquipementOptions.init ({
        Id_options : {
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
        modelName: 'EquipementOptions',
        tableName: 'equipements_options',
        timestamps: false
    });

    return EquipementOptions;
}