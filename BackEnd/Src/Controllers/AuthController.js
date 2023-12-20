const Authentificator = require('../Utils/Authentificator');
const { User } = require('../Models/index');
const bcrypt = require('bcrypt');

class AuthController {
    
    // Pour la connexion des utilisateurs (admin et employé)

    static async login(req, res) {
        try {
            const { Email, Mdp} = req.body;

            // Trouver l'utilisateur par son email
            const user = await User.findOne ({
                where: { Email }
            });

            // Vérification si l'user existe et si le Mdp est correct
            if (user && await bcrypt.compare(Mdp, user.Mdp)) {
                // On génére un token
                const auth = new Authentificator();
                const token = auth.generateToken(user);
                res.header('authorization', token).send({ token });
            } else {
                return res.status(401).send('Email et/ou le mot de passe sont incorrect.');
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send('Erreur serveur');
        }
    }

    // Pour l'inscription des utilisateurs (si jamais dans le futur le site en a besoin)

    static async register(req, res) {
        try {
            const { Nom, Prenom, Email, Mdp, Id_role } = req.body;

            const existingUser = await User.findOne({
                where: { Email: Email }
            });
            if (existingUser) {
                return res.status(400).send('Cet Email est déja utilisé');
            }
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUND) || 10;
            // Hachage du Mdp
            const hashedPassword = await bcrypt.hash(Mdp, saltRounds);

            // création d'un nouvel utilisateur
            const user = await User.create({ Nom, Prenom, Email, Mdp: hashedPassword, Id_role});

            // On génére un token
            const auth = new Authentificator();
            const token = auth.generateToken(user);
            res.status(201).header('authorization', token).send({ token });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).send('Cet email est déja utilisé.');
            }
            res.status(500).send('Erreur Serveur');
        }
    }
}

module.exports = AuthController;