const Authentificator = require('../Utils/Authentificator');

class AuthMiddleware {
    constructor() {
        this.auth = new Authentificator();
    }

    authenticate(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send('Accès refusé. Token non fourni.');
        }

        try {
            const verified = this.Authentificator.verifyToken(token);
            req.user = verified;
            next();
        } catch(error) {
            res.status(400).send('Token Invalide')
        }
    }
}

module.exports = new AuthMiddleware();