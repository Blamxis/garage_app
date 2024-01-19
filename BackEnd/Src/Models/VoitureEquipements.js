const { Model, DataTypes } = require('sequelize');

class PossederOptions extends Model {}

module.exports = (sequelize) => {
    PossederOptions.init ({
        Id_voiture : {
            type: DataTypes.INTEGER,
            references : {
                model: 'Voiture',
                key: 'Id_voiture'
            }
        },
        Id_options : {
            type: DataTypes.INTEGER,
            model: 'EquipementOptions',
            key: 'Id_options'
        }
    }, {
        sequelize,
        modelName: 'VoitureEquipements',
        tableName: 'voiture_equipements',
        timestamps: false
    });

    return PossederOptions;
}