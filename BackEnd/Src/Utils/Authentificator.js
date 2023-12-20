const JWT = require('jsonwebtoken');

class Authentificator {
    constructor() {
        this.secret = process.env.JWT_SECRET;
        this.duration = process.env.JWT_DURING || '1h';
    }

    generateToken(user) {
        const payload = {
            userId: user.Id_user,
            email: user.Email,
            role: user.Id_role
        };

        const options = {
            expiresIn: this.duration
        };

        return JWT.sign(payload, this.secret, options);
    }

    verifyToken(token) {
        try {
            return JWT.verify(token, this.secret);
        } catch(error) {
            return null;
        }
    }
}

module.exports = Authentificator;