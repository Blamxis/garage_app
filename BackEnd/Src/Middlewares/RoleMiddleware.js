const { Role } = require('../Models/index');

class RoleMiddleware {
    static async isAdmin(req, res, next) {
        try {
            const userRole = await Role.findByPk(req.user.role);
            if (userRole && userRole.Nom === 'Administrateur') {
                next();
            } else {
                res.status(403).send('Accès refusé. Requis: Rôle Administrateur');
            }
        } catch (error) {
            res.status(500).send('Erreur Serveur');
        }
    }

    static async isEmployee(req, res, next) {
        try {
            const userRole = await Role.findByPk(req.user.role);

            if (userRole && userRole.Nom === 'Employé') {
                next();
            } else {
                res.status(403).send('Accès refusé. Requis: Rôle Employé');
            }
        } catch (error) {
            res.status(500).send('Erreur Serveur');
        }
    }
}

module.exports = RoleMiddleware;