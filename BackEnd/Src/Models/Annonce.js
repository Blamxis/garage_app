const { Model, DataTypes } = require('sequelize');

class Annonces extends Model {}

module.exports = (sequelize) => {
    Annonces.init ({
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

    return Annonces;
}