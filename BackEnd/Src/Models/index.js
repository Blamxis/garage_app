const db = require('../Utils/db.config');
const sequelize = db.getSequelizeInstance();
const User = require('./User')(sequelize);
const Roles = require('./Roles')(sequelize);


// Définition des associations
User.belongsTo(Roles, { foreignKey: 'Id_role' });
Roles.hasMany(User, { foreignKey: 'Id_role' });

module.exports = {
    User,
    Roles
};
