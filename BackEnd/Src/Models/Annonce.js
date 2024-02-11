const { Model, DataTypes } = require('sequelize');

class Annonce extends Model {}

module.exports = (sequelize) => {
    Annonce.init ({
        Id_annonces : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nom : {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Date_publication: {
            type: DataTypes.DATE,
            allowNull: false
        },
        IsVisible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        Id_voiture: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Voiture',
              key: 'Id_voiture'
            }
        },
        Id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'User',
              key: 'Id_user'
            }
        }
    }, {
        sequelize,
        modelName: 'Annonce',
        tableName: 'annonces',
        timestamps: false
    });

    return Annonce;
}