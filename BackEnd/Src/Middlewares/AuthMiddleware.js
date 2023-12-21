const Authentificator = require('../Utils/Authentificator');

class AuthMiddleware {
    constructor() {
        this.auth = new Authentificator();
        this.authenticate = this.authenticate.bind(this);
    }

    authenticate(req, res, next) {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).send('Accès refusé. Token non fourni.');
        }

        try {
            console.log("Appel de verifyToken");
            const verified = this.auth.verifyToken(token);
            console.log("Token vérifié:", verified);
            req.user = verified;
            next();
        } catch(error) {
            res.status(400).send('Token Invalide')
        }
    }
}

module.exports = new AuthMiddleware();