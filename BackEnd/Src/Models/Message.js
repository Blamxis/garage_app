const { Model, DataTypes } = require('sequelize');

class Message extends Model {}

module.exports = (sequelize) => {
    Message.init ({
        Id_messages : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        Objet : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        Type : {
            type : DataTypes.ENUM('services', 'contact', 'voitures'), // Pour trier les formulaires dans le dashboard avec input chaché en front
            allowNull : false
        },
        Nom : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        Prenom : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        Email : {
            type: DataTypes.STRING(100),
            allowNull : false,
            validate : {
                isEmail : true
            }
        },
        Telephone : {
            type : DataTypes.STRING(15),
            allowNull : false
        },
        Description : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        Id_user : {
            type : DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Message',
        tableName: 'messages',
        timestamps : false
    });

    return Message;
}