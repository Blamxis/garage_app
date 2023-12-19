const db = require('../Utils/db.config');
const sequelize = db.getSequelizeInstance();
const User = require('./User')(sequelize);
const Role = require('./Role')(sequelize);


// Définition des associations
User.belongsTo(Role, { foreignKey: 'Id_role' });
Role.hasMany(User, { foreignKey: 'Id_role' });

module.exports = {
    User,
    Role
};
