const { Model, DataTypes } = require('sequelize');

class Images extends Model {}

module.exports = (sequelize) => {
    Images.init ({
        Id_Images : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom : {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Url : {
            type: DataTypes.STRING,
            allowNull: false
        },
        Id_voiture : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Images',
        tableName: 'images',
        timestamps: false
    });

    return Images;
};