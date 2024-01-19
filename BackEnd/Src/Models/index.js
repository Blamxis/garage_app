const db = require('../Utils/db.config');
const sequelize = db.getSequelizeInstance();
const User = require('./User')(sequelize);
const Role = require('./Role')(sequelize);
const Service = require('./Service')(sequelize);
const Avis = require('./Avis')(sequelize);
const Jours = require('./Jours')(sequelize);
const Horaire = require('./Horaire')(sequelize);
const Message = require('./Message')(sequelize);
const Marque = require('./Marque')(sequelize);
const Modele = require('./Modele')(sequelize);
const Voiture = require('./Voiture')(sequelize);
const Images = require('./Images')(sequelize);
const EquipementOptions = require('./EquipementOptions')(sequelize);
const VoitureEquipements = require('./VoitureEquipements')(sequelize);

// Définition des associations
User.belongsTo(Role, { foreignKey: 'Id_role' });
Role.hasMany(User, { foreignKey: 'Id_role' });

User.hasMany(Service, { foreignKey: 'Id_user' });
Service.belongsTo(User, { foreignKey: 'Id_user' });

User.hasMany(Avis, { foreignKey: 'Id_user' });
Avis.belongsTo(User, { foreignKey: 'Id_user' });

User.hasMany(Jours, { foreignKey: 'Id_user' });
Jours.belongsTo(User, { foreignKey: 'Id_user' });

Jours.hasMany(Horaire, { foreignKey: 'Id_jours' });
Horaire.belongsTo(Jours, { foreignKey: 'Id_jours' });

User.hasMany(Message, { foreignKey: 'Id_user' });
Message.belongsTo(User, { foreignKey: 'Id_user' });

Marque.hasMany(Modele, { foreignKey: 'Id_marques' });
Modele.belongsTo(Marque, { foreignKey: 'Id_marques' });

Voiture.belongsTo(Modele, { foreignKey: 'Id_modeles' });
Modele.hasMany(Voiture, { foreignKey: 'Id_modeles' });

Images.belongsTo(Voiture, { foreignKey : 'Id_voiture' });
Voiture.hasMany(Images, { foreignKey: 'Id_voiture'} );

Voiture.belongsToMany(EquipementOptions, { through: VoitureEquipements, foreignKey: 'Id_voiture' });
EquipementOptions.belongsToMany(Voiture, { through: VoitureEquipements, foreignKey: 'Id_options' });

VoitureEquipements.belongsTo(Voiture, { foreignKey: 'Id_voiture' });
Voiture.hasMany(VoitureEquipements, { foreignKey: 'Id_voiture' });

VoitureEquipements.belongsTo(EquipementOptions, { foreignKey: 'Id_options' });
EquipementOptions.hasMany(VoitureEquipements, { foreignKey: 'Id_options' });

module.exports = {
    User,
    Role,
    Service,
    Avis,
    Jours,
    Horaire,
    Message,
    Marque,
    Modele,
    Voiture,
    Images,
    EquipementOptions,
    VoitureEquipements
};
