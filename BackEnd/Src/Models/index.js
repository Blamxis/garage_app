const db = require('../Utils/db.config');
const sequelize = db.getSequelizeInstance();
const User = require('./User')(sequelize);
const Role = require('./Role')(sequelize);
const Service = require('./Service')(sequelize);


// Définition des associations
User.belongsTo(Role, { foreignKey: 'Id_role' });
Role.hasMany(User, { foreignKey: 'Id_role' });

User.hasMany(Service, { foreignKey: 'Id_user' });
Service.belongsTo(User, { foreignKey: 'Id_user' });

module.exports = {
    User,
    Role,
    Service
};
